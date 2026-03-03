export type Platform = 'GOOGLE' | 'YOUTUBE' | 'BING' | 'AMAZON' | 'EBAY' | 'PLAY_STORE' | 'APP_STORE' | 'INSTAGRAM' | 'TWITTER' | 'PINTEREST'

export type Plan = 'FREE' | 'PRO' | 'ENTERPRISE'

export interface KeywordData {
  id: string
  keyword: string
  searchVolume?: number
  competition?: number
  cpc?: number
  difficulty?: number
  platform: Platform
  language: string
  country: string
  createdAt: Date
}

export interface KeywordSearchParams {
  seed: string
  platform: Platform
  language: string
  country: string
  includeQuestions?: boolean
  includePrepositions?: boolean
  includeComparisons?: boolean
}

export interface KeywordSuggestion {
  keyword: string
  searchVolume?: number
  competition?: 'LOW' | 'MEDIUM' | 'HIGH'
  cpc?: number
  difficulty?: number
  type: 'STANDARD' | 'QUESTION' | 'PREPOSITION' | 'COMPARISON'
  trend?: number[] // Last 12 months volume
  intent?: 'INFORMATIONAL' | 'COMMERCIAL' | 'TRANSACTIONAL' | 'NAVIGATIONAL'
  source?: string
}

export interface SearchResult {
  query: string
  suggestions: KeywordSuggestion[]
  totalResults: number
  platform: Platform
  language: string
  country: string
}

export interface UserStats {
  searchesUsed: number
  monthlyLimit: number
  plan: Plan
  keywordListsCount: number
  totalKeywords: number
}