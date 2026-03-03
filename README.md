# Keyword Research Platform

Production-ready Next.js keyword research app with realtime open-source data ingestion, list management, and competitor gap analysis.

## What is Included

- Realtime keyword suggestions from open web sources:
  - Google Autocomplete
  - YouTube Autocomplete
  - Bing Autosuggest
  - Amazon completion
  - DuckDuckGo suggestions
- Deterministic keyword scoring (volume, difficulty, CPC, competition, intent, 12-month trend)
- Search result export (CSV)
- Saved keyword lists (Prisma + SQLite)
- Guest search history tracking
- Competitor gap analysis built on live keyword signals
- Responsive UI with working navigation and legal/support pages

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- Prisma + SQLite
- TanStack Query
- Zod

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
cp .env.example .env
```

3. Ensure database schema is applied (if needed):

```bash
npx prisma db push
```

4. Run development server:

```bash
npm run dev
```

App runs at `http://localhost:3000`.

## Environment Variables

See `.env.example`.

- `DATABASE_URL`: Prisma database URL
- `KEYWORD_API_TIMEOUT_MS`: Timeout for upstream suggestion requests
- `KEYWORD_FETCH_CONCURRENCY`: Parallel upstream request limit
- `KEYWORD_QUERY_LIMIT`: Number of expanded query variants per search
- `KEYWORD_CACHE_TTL_SECONDS`: In-memory/persistent cache TTL
- `KEYWORD_PERSIST_CACHE`: `true` to enable Prisma-backed cache table usage

## API Endpoints

- `GET /api/keywords`
- `POST /api/keywords`
- `GET /api/lists`
- `POST /api/lists`
- `DELETE /api/lists?id=<listId>`
- `GET /api/user/history`

Keyword endpoint params:

- `seed` (or `q`) required
- `platform` required
- `language` (or `lang`) optional, default `en`
- `country` optional, default `US`
- `limit` optional, 10-250

## Build

```bash
npm run lint
npm run build
```
