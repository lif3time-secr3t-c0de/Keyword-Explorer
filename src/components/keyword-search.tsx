'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Platform } from '@/types'
import { COUNTRIES, LANGUAGES, PLATFORMS } from '@/lib/constants'

interface KeywordSearchProps {
  onSearch?: (query: string, platform: Platform) => void
}

export function KeywordSearch({ onSearch }: KeywordSearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [platform, setPlatform] = useState<Platform>('GOOGLE')
  const [language, setLanguage] = useState('en')
  const [country, setCountry] = useState('US')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      const searchParams = new URLSearchParams({
        q: query.trim(),
        platform,
        lang: language,
        country
      })
      router.push(`/search?${searchParams}`)

      if (onSearch) {
        onSearch(query.trim(), platform)
      }
    }
  }

  return (
    <div className="glass rounded-3xl p-6 md:p-10 shadow-2xl max-w-5xl mx-auto border border-white/20 dark:border-white/10 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Platform Selection */}
        <div>
          <label className="block text-sm font-semibold mb-4 text-white/90 uppercase tracking-wider">
            Target Platform
          </label>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {PLATFORMS.map((p) => {
              const Icon = p.icon
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(p.id)}
                  className={`
                    flex flex-col items-center justify-center p-3 md:p-4 rounded-2xl transition-all duration-300
                    ${platform === p.id
                      ? 'bg-white text-blue-600 shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105 ring-2 ring-white/50'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/5'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 md:h-6 md:w-6 mb-2 ${platform === p.id ? 'animate-pulse' : ''}`} />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-tighter md:tracking-normal">{p.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative group">
          <label className="block text-sm font-semibold mb-3 text-white/90 uppercase tracking-wider">
            Your Keyword or Niche
          </label>
          <div className="relative overflow-hidden rounded-2xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'best gaming laptops 2026', 'how to bake sourdough'..."
              className="w-full px-6 py-5 md:py-6 text-lg md:text-xl rounded-2xl border-0 focus:ring-4 focus:ring-blue-400/50 focus:outline-none bg-white/95 text-slate-900 placeholder-slate-400 transition-all font-medium"
              required
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <div className="h-10 w-10 md:h-12 md:w-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Search className="h-5 w-5 md:h-6 md:w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Language and Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-white/70 uppercase tracking-widest ml-1">
              Search Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border-0 focus:ring-4 focus:ring-blue-400/50 focus:outline-none bg-white/10 text-white font-medium cursor-pointer hover:bg-white/20 transition-all appearance-none"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'white\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em' }}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-slate-900">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-white/70 uppercase tracking-widest ml-1">
              Target Location
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border-0 focus:ring-4 focus:ring-blue-400/50 focus:outline-none bg-white/10 text-white font-medium cursor-pointer hover:bg-white/20 transition-all appearance-none"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'white\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em' }}
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code} className="bg-slate-900">
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={!query.trim()}
          className="w-full bg-blue-500 hover:bg-blue-400 text-white font-black py-5 md:py-6 px-8 rounded-2xl transition-all duration-300 text-lg md:text-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(59,130,246,0.5)] hover:shadow-[0_15px_40px_rgba(59,130,246,0.6)] transform hover:-translate-y-1 active:translate-y-0 uppercase tracking-widest"
        >
          Unleash Keywords
        </button>
      </form>

      {/* Quick Stats */}
      <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest">
        <span className="flex items-center">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
          Real-time Engine
        </span>
        <span className="flex items-center">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
          Multi-Platform Data
        </span>
        <span className="flex items-center">
          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2 shadow-[0_0_8px_rgba(192,132,252,0.8)]"></span>
          Export Ready
        </span>
      </div>
    </div>
  )
}
