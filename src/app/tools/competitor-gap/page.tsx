'use client'

import { useMemo, useState } from 'react'
import axios from 'axios'
import { ArrowRight, Users } from 'lucide-react'

import type { SearchResult } from '@/types'

type GapRow = {
  term: string
  vol: number
  kd: number
  overlap: 'BOTH' | 'DOMAIN1' | 'DOMAIN2'
}

function normalizeDomain(value: string): string {
  const trimmed = value.trim().toLowerCase()
  return trimmed
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*/, '')
}

export default function CompetitorGapPage() {
  const [domain1, setDomain1] = useState('')
  const [domain2, setDomain2] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<GapRow[] | null>(null)

  const summary = useMemo(() => {
    if (!results) return null

    const shared = results.filter((item) => item.overlap === 'BOTH').length
    const yours = results.filter((item) => item.overlap === 'DOMAIN1').length
    const competitor = results.filter((item) => item.overlap === 'DOMAIN2').length

    return { shared, yours, competitor }
  }, [results])

  const handleAnalyze = async (event: React.FormEvent) => {
    event.preventDefault()

    const cleanDomain1 = normalizeDomain(domain1)
    const cleanDomain2 = normalizeDomain(domain2)

    if (!cleanDomain1 || !cleanDomain2) {
      setError('Please enter valid domain names.')
      return
    }

    setError(null)
    setIsAnalyzing(true)

    try {
      const [primary, competitor] = await Promise.all([
        axios.get<SearchResult>('/api/keywords', {
          params: {
            seed: cleanDomain1,
            platform: 'GOOGLE',
            language: 'en',
            country: 'US',
            limit: 120,
          },
        }),
        axios.get<SearchResult>('/api/keywords', {
          params: {
            seed: cleanDomain2,
            platform: 'GOOGLE',
            language: 'en',
            country: 'US',
            limit: 120,
          },
        }),
      ])

      const firstMap = new Map(primary.data.suggestions.map((item) => [item.keyword.toLowerCase(), item]))
      const secondMap = new Map(competitor.data.suggestions.map((item) => [item.keyword.toLowerCase(), item]))

      const allTerms = new Set([...firstMap.keys(), ...secondMap.keys()])

      const merged = Array.from(allTerms)
        .map((term) => {
          const first = firstMap.get(term)
          const second = secondMap.get(term)

          const overlap: GapRow['overlap'] =
            first && second ? 'BOTH' : first ? 'DOMAIN1' : 'DOMAIN2'

          const reference = second ?? first

          return {
            term: reference?.keyword ?? term,
            vol: reference?.searchVolume ?? 0,
            kd: reference?.difficulty ?? 0,
            overlap,
          }
        })
        .sort((left, right) => right.vol - left.vol)
        .slice(0, 150)

      setResults(merged)
    } catch {
      setError('Could not run analysis. Please retry in a moment.')
      setResults(null)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 transition-colors dark:bg-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
              <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">Competitor Gap Analysis</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Compare two domains using live keyword suggestion signals.
            </p>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <form onSubmit={handleAnalyze} className="grid grid-cols-1 items-end gap-4 md:grid-cols-7">
              <div className="md:col-span-3">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Your Domain</label>
                <input
                  type="text"
                  placeholder="example.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  required
                  value={domain1}
                  onChange={(event) => setDomain1(event.target.value)}
                />
              </div>

              <div className="flex justify-center pb-3 md:col-span-1">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-500 dark:bg-slate-700 dark:text-slate-300">VS</span>
              </div>

              <div className="md:col-span-3">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Competitor Domain</label>
                <input
                  type="text"
                  placeholder="competitor.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  required
                  value={domain2}
                  onChange={(event) => setDomain2(event.target.value)}
                />
              </div>

              <div className="md:col-span-7 mt-2 flex justify-center">
                <button
                  type="submit"
                  disabled={isAnalyzing || !domain1 || !domain2}
                  className="flex items-center rounded-xl bg-purple-600 px-8 py-3 font-semibold text-white shadow-lg shadow-purple-200 transition-all hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-none"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Find Gaps'}
                  {!isAnalyzing && <ArrowRight className="ml-2 h-5 w-5" />}
                </button>
              </div>
            </form>

            {error && (
              <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">{error}</p>
            )}
          </div>

          {results && (
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-6 dark:border-slate-700">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Analysis Results</h2>
                <span className="text-sm text-gray-500">Found {results.length} keyword opportunities</span>
              </div>

              {summary && (
                <div className="grid grid-cols-1 gap-3 border-b border-gray-100 bg-slate-50 px-6 py-4 text-sm dark:border-slate-700 dark:bg-slate-900 sm:grid-cols-3">
                  <p className="text-slate-600 dark:text-slate-300">Shared: <span className="font-semibold">{summary.shared}</span></p>
                  <p className="text-slate-600 dark:text-slate-300">You rank only: <span className="font-semibold">{summary.yours}</span></p>
                  <p className="text-slate-600 dark:text-slate-300">Competitor only: <span className="font-semibold">{summary.competitor}</span></p>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px]">
                  <thead className="bg-gray-50 text-left dark:bg-slate-900/50">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300">Keyword</th>
                      <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300">Volume</th>
                      <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300">KD</th>
                      <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300">Ownership</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                    {results.map((item) => (
                      <tr key={`${item.overlap}-${item.term}`} className="transition-colors hover:bg-gray-50 dark:hover:bg-slate-700/30">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.term}</td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.vol.toLocaleString()}</td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.kd}</td>
                        <td className="px-6 py-4">
                          {item.overlap === 'BOTH' && (
                            <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-slate-700 dark:text-slate-300">Shared</span>
                          )}
                          {item.overlap === 'DOMAIN1' && (
                            <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">You</span>
                          )}
                          {item.overlap === 'DOMAIN2' && (
                            <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">Competitor</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
