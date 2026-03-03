import pLimit from "p-limit";

import type { KeywordSuggestion, Platform } from "@/types";

const KEYWORD_TIMEOUT_MS = Number.parseInt(process.env.KEYWORD_API_TIMEOUT_MS ?? "4500", 10);
const KEYWORD_CONCURRENCY = Number.parseInt(process.env.KEYWORD_FETCH_CONCURRENCY ?? "8", 10);
const KEYWORD_QUERY_LIMIT = Number.parseInt(process.env.KEYWORD_QUERY_LIMIT ?? "28", 10);

const QUERY_MODIFIERS = [
  "best",
  "for beginners",
  "reviews",
  "2026",
  "pricing",
  "alternatives",
  "vs",
  "near me",
  "examples",
  "strategy",
] as const;

const AMAZON_DOMAIN_MAP: Record<string, string> = {
  US: "com",
  GB: "co.uk",
  DE: "de",
  FR: "fr",
  JP: "co.jp",
  CA: "ca",
  AU: "com.au",
  IN: "in",
  IT: "it",
  ES: "es",
};

const COUNTRY_MULTIPLIER: Record<string, number> = {
  US: 1.0,
  GB: 0.82,
  CA: 0.77,
  AU: 0.73,
  IN: 0.9,
  DE: 0.74,
  FR: 0.68,
  BR: 0.63,
  JP: 0.79,
};

type SuggestionSource = "google" | "youtube" | "bing" | "amazon" | "duckduckgo";

type SuggestionCollector = {
  keyword: string;
  minRank: number;
  sources: Set<SuggestionSource>;
};

type SuggestionFetcher = (
  query: string,
  language: string,
  country: string,
) => Promise<string[]>;

interface KeywordEngineInput {
  seed: string;
  platform: Platform;
  language: string;
  country: string;
  limit: number;
}

interface KeywordEngineOutput {
  query: string;
  suggestions: KeywordSuggestion[];
  totalResults: number;
  platform: Platform;
  language: string;
  country: string;
  timestamp: string;
}

interface MemoryCacheEntry {
  expiresAt: number;
  payload: KeywordEngineOutput;
}

const memoryCache = new Map<string, MemoryCacheEntry>();
const DEFAULT_CACHE_TTL_SECONDS = Number.parseInt(process.env.KEYWORD_CACHE_TTL_SECONDS ?? "900", 10);

const SOURCE_BY_PLATFORM: Record<Platform, SuggestionSource[]> = {
  GOOGLE: ["google", "bing", "duckduckgo"],
  YOUTUBE: ["youtube", "google", "duckduckgo"],
  BING: ["bing", "google", "duckduckgo"],
  AMAZON: ["amazon", "google", "bing"],
  EBAY: ["amazon", "google", "bing"],
  PLAY_STORE: ["google", "bing", "duckduckgo"],
  APP_STORE: ["google", "bing", "duckduckgo"],
  INSTAGRAM: ["google", "bing", "duckduckgo"],
  TWITTER: ["google", "bing", "duckduckgo"],
  PINTEREST: ["google", "bing", "duckduckgo"],
};

function sanitizeKeyword(value: string): string {
  return value
    .replace(/[\u0000-\u001F]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeKeyword(value: string): string {
  return sanitizeKeyword(value).toLowerCase();
}

function createHash(input: string): number {
  let hash = 5381;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 33) ^ input.charCodeAt(index);
  }
  return Math.abs(hash >>> 0);
}

function seededRandom(input: string): number {
  const hash = createHash(input);
  return (Math.sin(hash) + 1) / 2;
}

function getCountryMultiplier(country: string): number {
  return COUNTRY_MULTIPLIER[country.toUpperCase()] ?? 0.55;
}

function detectType(keyword: string): KeywordSuggestion["type"] {
  const value = keyword.toLowerCase();

  if (/^(who|what|where|when|why|how|is|can|does|should)\b/.test(value)) {
    return "QUESTION";
  }

  if (/\b(for|with|without|near|in|to|from)\b/.test(value)) {
    return "PREPOSITION";
  }

  if (/\b(vs|versus|compare|alternative|alternatives)\b/.test(value)) {
    return "COMPARISON";
  }

  return "STANDARD";
}

function detectIntent(keyword: string): KeywordSuggestion["intent"] {
  const value = keyword.toLowerCase();

  if (/\b(buy|price|coupon|deal|shop|cost|subscribe|trial)\b/.test(value)) {
    return "TRANSACTIONAL";
  }

  if (/\b(best|review|top|comparison|compare|alternatives)\b/.test(value)) {
    return "COMMERCIAL";
  }

  if (/\b(login|official|website|download|docs?)\b/.test(value)) {
    return "NAVIGATIONAL";
  }

  return "INFORMATIONAL";
}

function estimateMetrics(keyword: string, rank: number, country: string) {
  const normalizedRank = Math.max(rank, 0) + 1;
  const countryFactor = getCountryMultiplier(country);
  const wordCount = keyword.split(" ").filter(Boolean).length;
  const randomFactor = 0.7 + seededRandom(`${keyword}:${country}`) * 0.6;

  const baseVolume = 140_000 / Math.pow(normalizedRank, 1.2);
  const longTailPenalty = wordCount > 2 ? 1 / Math.pow(wordCount - 1, 0.35) : 1;
  const searchVolume = Math.max(10, Math.round(baseVolume * countryFactor * longTailPenalty * randomFactor));

  const intent = detectIntent(keyword);
  const intentCpcFactor =
    intent === "TRANSACTIONAL"
      ? 1.45
      : intent === "COMMERCIAL"
        ? 1.22
        : intent === "NAVIGATIONAL"
          ? 0.86
          : 0.78;

  const cpcRaw = ((Math.log10(searchVolume + 10) * 1.2) + seededRandom(`cpc:${keyword}`) * 1.8) * intentCpcFactor;
  const cpc = Number((Math.max(0.08, cpcRaw) * countryFactor).toFixed(2));

  const difficultyRaw = Math.min(
    100,
    8 + Math.log10(searchVolume + 20) * 21 + (intent === "TRANSACTIONAL" ? 9 : 0) + seededRandom(`kd:${keyword}`) * 8,
  );
  const difficulty = Math.round(difficultyRaw);

  const competition: KeywordSuggestion["competition"] =
    cpc >= 2.2 || difficulty >= 72 ? "HIGH" : cpc >= 0.9 || difficulty >= 44 ? "MEDIUM" : "LOW";

  const monthTrend = Array.from({ length: 12 }, (_, monthIndex) => {
    const seasonal = Math.sin((monthIndex / 12) * Math.PI * 2 + seededRandom(`season:${keyword}`) * 1.6) * 0.22;
    const drift = (monthIndex - 6) * 0.015;
    const noise = (seededRandom(`noise:${keyword}:${monthIndex}`) - 0.5) * 0.12;
    const value = searchVolume * (1 + seasonal + drift + noise);
    return Math.max(5, Math.round(value));
  });

  return {
    searchVolume,
    cpc,
    difficulty,
    competition,
    intent,
    trend: monthTrend,
  };
}

function buildExpansionQueries(seed: string): string[] {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("").slice(0, 10);
  const expanded = [
    seed,
    ...QUERY_MODIFIERS.map((modifier) => `${seed} ${modifier}`),
    ...letters.map((letter) => `${seed} ${letter}`),
  ];

  return [...new Set(expanded.map(sanitizeKeyword).filter(Boolean))].slice(0, KEYWORD_QUERY_LIMIT);
}

async function fetchJsonWithTimeout<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), KEYWORD_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
      headers: {
        "User-Agent": "KeywordToolPro/1.0",
        Accept: "application/json,text/plain,*/*",
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

const fetchGoogleSuggestions: SuggestionFetcher = async (query, language, country) => {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}&hl=${encodeURIComponent(language)}&gl=${encodeURIComponent(country)}`;

  try {
    const data = await fetchJsonWithTimeout<unknown[]>(url);
    return Array.isArray(data[1]) ? (data[1] as string[]) : [];
  } catch {
    return [];
  }
};

const fetchYouTubeSuggestions: SuggestionFetcher = async (query, language, country) => {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(query)}&hl=${encodeURIComponent(language)}&gl=${encodeURIComponent(country)}`;

  try {
    const data = await fetchJsonWithTimeout<unknown[]>(url);
    return Array.isArray(data[1]) ? (data[1] as string[]) : [];
  } catch {
    return [];
  }
};

const fetchBingSuggestions: SuggestionFetcher = async (query, language, country) => {
  const market = `${language.toLowerCase()}-${country.toUpperCase()}`;
  const url = `https://api.bing.com/osjson.aspx?query=${encodeURIComponent(query)}&market=${encodeURIComponent(market)}`;

  try {
    const data = await fetchJsonWithTimeout<unknown[]>(url);
    return Array.isArray(data[1]) ? (data[1] as string[]) : [];
  } catch {
    return [];
  }
};

const fetchAmazonSuggestions: SuggestionFetcher = async (query, _language, country) => {
  const domain = AMAZON_DOMAIN_MAP[country.toUpperCase()] ?? "com";
  const url = `https://completion.amazon.${domain}/search/complete?method=completion&search-alias=aps&mkt=1&q=${encodeURIComponent(query)}`;

  try {
    const data = await fetchJsonWithTimeout<unknown[]>(url);
    return Array.isArray(data[1]) ? (data[1] as string[]) : [];
  } catch {
    return [];
  }
};

const fetchDuckDuckGoSuggestions: SuggestionFetcher = async (query) => {
  const url = `https://duckduckgo.com/ac/?q=${encodeURIComponent(query)}&type=list`;

  try {
    const data = await fetchJsonWithTimeout<Array<{ phrase?: string }>>(url);
    return data.map((item) => item.phrase).filter((phrase): phrase is string => Boolean(phrase));
  } catch {
    return [];
  }
};

const SOURCE_FETCHERS: Record<SuggestionSource, SuggestionFetcher> = {
  google: fetchGoogleSuggestions,
  youtube: fetchYouTubeSuggestions,
  bing: fetchBingSuggestions,
  amazon: fetchAmazonSuggestions,
  duckduckgo: fetchDuckDuckGoSuggestions,
};

function cacheKey({ seed, platform, language, country, limit }: KeywordEngineInput): string {
  return [normalizeKeyword(seed), platform, language.toLowerCase(), country.toUpperCase(), String(limit)].join("|");
}

export function readMemoryKeywordCache(key: string): KeywordEngineOutput | null {
  const cached = memoryCache.get(key);
  if (!cached) {
    return null;
  }

  if (Date.now() >= cached.expiresAt) {
    memoryCache.delete(key);
    return null;
  }

  return cached.payload;
}

export function writeMemoryKeywordCache(key: string, payload: KeywordEngineOutput, ttlSeconds = DEFAULT_CACHE_TTL_SECONDS): void {
  memoryCache.set(key, {
    payload,
    expiresAt: Date.now() + Math.max(30, ttlSeconds) * 1000,
  });
}

function buildKeywordSuggestion(
  collector: SuggestionCollector,
  rank: number,
  country: string,
): KeywordSuggestion {
  const metrics = estimateMetrics(collector.keyword, rank, country);

  return {
    keyword: collector.keyword,
    type: detectType(collector.keyword),
    searchVolume: metrics.searchVolume,
    competition: metrics.competition,
    cpc: metrics.cpc,
    difficulty: metrics.difficulty,
    intent: metrics.intent,
    trend: metrics.trend,
    source: Array.from(collector.sources).join(","),
  };
}

export async function buildKeywordResults(input: KeywordEngineInput): Promise<KeywordEngineOutput> {
  const cleanSeed = sanitizeKeyword(input.seed);
  const normalizedSeed = normalizeKeyword(cleanSeed);
  const sources = SOURCE_BY_PLATFORM[input.platform] ?? SOURCE_BY_PLATFORM.GOOGLE;
  const queries = buildExpansionQueries(cleanSeed);
  const limit = pLimit(Math.max(2, KEYWORD_CONCURRENCY));

  const keywordMap = new Map<string, SuggestionCollector>();

  keywordMap.set(normalizedSeed, {
    keyword: cleanSeed,
    minRank: 0,
    sources: new Set([sources[0]]),
  });

  const tasks = queries.flatMap((query) =>
    sources.map((source) =>
      limit(async () => {
        const suggestions = await SOURCE_FETCHERS[source](query, input.language, input.country);
        return { query, source, suggestions };
      }),
    ),
  );

  const fetchedBatches = await Promise.all(tasks);

  fetchedBatches.forEach(({ source, suggestions }) => {
    suggestions.forEach((rawKeyword, suggestionRank) => {
      const keyword = sanitizeKeyword(rawKeyword);
      if (!keyword || keyword.length < 2) {
        return;
      }

      const normalized = normalizeKeyword(keyword);
      const previous = keywordMap.get(normalized);

      if (!previous) {
        keywordMap.set(normalized, {
          keyword,
          minRank: suggestionRank + 1,
          sources: new Set([source]),
        });
        return;
      }

      previous.minRank = Math.min(previous.minRank, suggestionRank + 1);
      previous.sources.add(source);
    });
  });

  const deduped = Array.from(keywordMap.values())
    .sort((left, right) => left.minRank - right.minRank)
    .slice(0, Math.max(input.limit * 2, input.limit));

  const suggestions = deduped
    .map((collector, index) => buildKeywordSuggestion(collector, index, input.country))
    .sort((left, right) => (right.searchVolume ?? 0) - (left.searchVolume ?? 0))
    .slice(0, input.limit);

  return {
    query: cleanSeed,
    suggestions,
    totalResults: suggestions.length,
    platform: input.platform,
    language: input.language,
    country: input.country,
    timestamp: new Date().toISOString(),
  };
}

export function getKeywordEngineCacheKey(input: KeywordEngineInput): string {
  return cacheKey(input);
}
