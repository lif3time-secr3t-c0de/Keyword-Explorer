import { createHash } from "node:crypto";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import {
  buildKeywordResults,
  getKeywordEngineCacheKey,
  readMemoryKeywordCache,
  writeMemoryKeywordCache,
} from "@/lib/keyword-engine";
import { prisma } from "@/lib/prisma";
import type { Platform } from "@/types";

const PLATFORM_VALUES = [
  "GOOGLE",
  "YOUTUBE",
  "BING",
  "AMAZON",
  "EBAY",
  "PLAY_STORE",
  "APP_STORE",
  "INSTAGRAM",
  "TWITTER",
  "PINTEREST",
] as const satisfies readonly Platform[];

const inputSchema = z.object({
  seed: z.string().trim().min(2).max(120),
  platform: z.enum(PLATFORM_VALUES),
  language: z.string().trim().min(2).max(12).default("en"),
  country: z.string().trim().length(2).default("US"),
  limit: z.coerce.number().int().min(10).max(250).default(120),
});

const CACHE_TTL_SECONDS = Number.parseInt(process.env.KEYWORD_CACHE_TTL_SECONDS ?? "900", 10);
const PERSISTENT_CACHE_ENABLED = process.env.KEYWORD_PERSIST_CACHE === "true";
const DEFAULT_USER_EMAIL = "guest@keywordtool.pro";

function normalizeInput(rawInput: Record<string, unknown>) {
  const parsed = inputSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      error: parsed.error.flatten(),
      data: null,
    };
  }

  return {
    error: null,
    data: {
      ...parsed.data,
      seed: parsed.data.seed.trim(),
      language: parsed.data.language.trim().toLowerCase(),
      country: parsed.data.country.trim().toUpperCase(),
    },
  };
}

function getHashedCacheKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

async function readPersistentCache(hash: string) {
  if (!PERSISTENT_CACHE_ENABLED) {
    return null;
  }

  try {
    const cached = await prisma.cachedSearchResult.findUnique({ where: { hash } });
    if (!cached) {
      return null;
    }

    const isExpired = Date.now() - cached.updatedAt.getTime() > CACHE_TTL_SECONDS * 1000;
    if (isExpired) {
      return null;
    }

    return JSON.parse(cached.results) as Awaited<ReturnType<typeof buildKeywordResults>>;
  } catch {
    return null;
  }
}

async function writePersistentCache(hash: string, payload: Awaited<ReturnType<typeof buildKeywordResults>>) {
  if (!PERSISTENT_CACHE_ENABLED) {
    return;
  }

  try {
    await prisma.cachedSearchResult.upsert({
      where: { hash },
      update: {
        query: payload.query,
        platform: payload.platform,
        language: payload.language,
        country: payload.country,
        results: JSON.stringify(payload),
      },
      create: {
        hash,
        query: payload.query,
        platform: payload.platform,
        language: payload.language,
        country: payload.country,
        results: JSON.stringify(payload),
      },
    });
  } catch {
    // Persistent cache is optional. Skip errors for environments without migrations.
  }
}

async function trackGuestSearch(payload: Awaited<ReturnType<typeof buildKeywordResults>>) {
  try {
    let user = await prisma.user.findUnique({
      where: { email: DEFAULT_USER_EMAIL },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: DEFAULT_USER_EMAIL,
          name: "Guest User",
        },
      });
    }

    await prisma.searchHistory.create({
      data: {
        query: payload.query,
        platform: payload.platform,
        language: payload.language,
        country: payload.country,
        resultsCount: payload.totalResults,
        userId: user.id,
      },
    });
  } catch {
    // History is best-effort for local/dev environments.
  }
}

async function resolveKeywordPayload(input: {
  seed: string;
  platform: Platform;
  language: string;
  country: string;
  limit: number;
}) {
  const cacheKey = getKeywordEngineCacheKey(input);
  const cachedMemoryPayload = readMemoryKeywordCache(cacheKey);

  if (cachedMemoryPayload) {
    return {
      payload: cachedMemoryPayload,
      cache: "memory",
    };
  }

  const hashedCacheKey = getHashedCacheKey(cacheKey);
  const cachedPersistentPayload = await readPersistentCache(hashedCacheKey);

  if (cachedPersistentPayload) {
    writeMemoryKeywordCache(cacheKey, cachedPersistentPayload, CACHE_TTL_SECONDS);
    return {
      payload: cachedPersistentPayload,
      cache: "persistent",
    };
  }

  const payload = await buildKeywordResults(input);
  writeMemoryKeywordCache(cacheKey, payload, CACHE_TTL_SECONDS);

  await Promise.all([writePersistentCache(hashedCacheKey, payload), trackGuestSearch(payload)]);

  return {
    payload,
    cache: "miss",
  };
}

function responseWithCache(payload: Awaited<ReturnType<typeof buildKeywordResults>>, cache: string) {
  return NextResponse.json(payload, {
    headers: {
      "x-keyword-cache": cache,
      "cache-control": "no-store",
    },
  });
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const normalized = normalizeInput({
    seed: params.get("seed") ?? params.get("q"),
    platform: params.get("platform"),
    language: params.get("language") ?? params.get("lang") ?? "en",
    country: params.get("country") ?? "US",
    limit: params.get("limit") ?? 120,
  });

  if (!normalized.data) {
    return NextResponse.json(
      {
        error: "Invalid request parameters",
        details: normalized.error,
      },
      { status: 400 },
    );
  }

  try {
    const { payload, cache } = await resolveKeywordPayload(normalized.data);
    return responseWithCache(payload, cache);
  } catch (error) {
    console.error("[KEYWORDS_GET]", error);
    return NextResponse.json({ error: "Failed to fetch keyword data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown> = {};

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const normalized = normalizeInput({
    seed: body.seed ?? body.q,
    platform: body.platform,
    language: body.language ?? body.lang ?? "en",
    country: body.country ?? "US",
    limit: body.limit ?? 120,
  });

  if (!normalized.data) {
    return NextResponse.json(
      {
        error: "Invalid request payload",
        details: normalized.error,
      },
      { status: 400 },
    );
  }

  try {
    const { payload, cache } = await resolveKeywordPayload(normalized.data);
    return responseWithCache(payload, cache);
  } catch (error) {
    console.error("[KEYWORDS_POST]", error);
    return NextResponse.json({ error: "Failed to fetch keyword data" }, { status: 500 });
  }
}
