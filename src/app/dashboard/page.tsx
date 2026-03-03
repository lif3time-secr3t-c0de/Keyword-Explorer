'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  FileText,
  List,
  Search,
  TrendingUp,
  Zap,
} from 'lucide-react'

import type { SearchResult } from '@/types'

type SearchHistoryItem = {
  id: string
  query: string
  platform: string
  language: string
  country: string
  resultsCount: number
  createdAt: string
}

type KeywordListItem = {
  id: string
  name: string
  createdAt: string
  keywords: Array<{ id: string; keyword: string }>
}

export default function DashboardPage() {
  const historyQuery = useQuery({
    queryKey: ['dashboard-history'],
    queryFn: async () => {
      const response = await axios.get<SearchHistoryItem[]>('/api/user/history')
      return response.data
    },
  })

  const listQuery = useQuery({
    queryKey: ['dashboard-lists'],
    queryFn: async () => {
      const response = await axios.get<KeywordListItem[]>('/api/lists')
      return response.data
    },
  })

  const trendingQuery = useQuery({
    queryKey: ['dashboard-trending'],
    queryFn: async () => {
      const response = await axios.get<SearchResult>('/api/keywords', {
        params: {
          seed: 'seo tools',
          platform: 'GOOGLE',
          language: 'en',
          country: 'US',
          limit: 8,
        },
      })
      return response.data
    },
    staleTime: 1000 * 60 * 5,
  })

  const stats = useMemo(() => {
    const history = historyQuery.data ?? []
    const lists = listQuery.data ?? []
    const keywordCount = lists.reduce((sum, list) => sum + list.keywords.length, 0)

    return {
      totalSearches: history.length,
      savedKeywords: keywordCount,
      listsCreated: lists.length,
      opportunities: trendingQuery.data?.suggestions.length ?? 0,
    }
  }, [historyQuery.data, listQuery.data, trendingQuery.data])

  const latestSearch = historyQuery.data?.[0]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Live snapshot of research activity, saved assets, and keyword opportunities.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-4">
          <StatCard icon={<Search className="h-6 w-6 text-blue-600" />} label="Total Searches" value={String(stats.totalSearches)} />
          <StatCard icon={<List className="h-6 w-6 text-purple-600" />} label="Saved Keywords" value={String(stats.savedKeywords)} />
          <StatCard icon={<Activity className="h-6 w-6 text-green-600" />} label="Lists Created" value={String(stats.listsCreated)} />
          <StatCard icon={<Zap className="h-6 w-6 text-amber-600" />} label="Opportunities" value={String(stats.opportunities)} />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Quick Actions</h2>
            <div className="space-y-4">
              <QuickAction
                href="/"
                icon={<Search className="h-5 w-5 text-blue-600 dark:text-blue-200" />}
                title="New Search"
                subtitle="Start keyword discovery"
                boxClass="bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30"
              />
              <QuickAction
                href="/tools/competitor-gap"
                icon={<BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-200" />}
                title="Competitor Gap"
                subtitle="Find content opportunities"
                boxClass="bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30"
              />
              <QuickAction
                href="/my-lists"
                icon={<FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-200" />}
                title="Manage Lists"
                subtitle="Open saved keyword sets"
                boxClass="bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/30"
              />
            </div>

            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Latest activity</p>
              {latestSearch ? (
                <p className="mt-2 text-sm font-medium text-slate-800 dark:text-slate-200">
                  &quot;{latestSearch.query}&quot; on {latestSearch.platform} {formatDistanceToNow(new Date(latestSearch.createdAt), { addSuffix: true })}
                </p>
              ) : (
                <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">No search history yet.</p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="flex items-center text-xl font-bold text-gray-900 dark:text-white">
                <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                Realtime Opportunities
              </h2>
              <span className="text-sm text-gray-500">Open source signals</span>
            </div>

            {trendingQuery.isLoading ? (
              <div className="py-10 text-center text-sm text-slate-500">Loading opportunities...</div>
            ) : trendingQuery.isError ? (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
                Could not load realtime opportunities. Try refreshing.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px]">
                  <thead>
                    <tr className="border-b text-left text-sm text-gray-500 dark:border-slate-700 dark:text-gray-400">
                      <th className="pb-3 font-medium">Keyword</th>
                      <th className="pb-3 font-medium">Volume</th>
                      <th className="pb-3 font-medium">Difficulty</th>
                      <th className="pb-3 font-medium">Intent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                    {(trendingQuery.data?.suggestions ?? []).slice(0, 8).map((item) => (
                      <tr key={item.keyword}>
                        <td className="py-4 font-medium text-gray-900 dark:text-gray-200">{item.keyword}</td>
                        <td className="py-4 text-gray-600 dark:text-gray-400">{(item.searchVolume ?? 0).toLocaleString()}</td>
                        <td className="py-4 text-gray-600 dark:text-gray-400">{item.difficulty ?? 0}/100</td>
                        <td className="py-4 text-gray-600 dark:text-gray-400">{item.intent ?? 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 flex items-center justify-between">
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-slate-700">{icon}</div>
      </div>
      <h3 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  )
}

function QuickAction({
  href,
  icon,
  title,
  subtitle,
  boxClass,
}: {
  href: string
  icon: React.ReactNode
  title: string
  subtitle: string
  boxClass: string
}) {
  return (
    <Link href={href} className="group block">
      <div className={`flex items-center justify-between rounded-lg p-4 transition-colors ${boxClass}`}>
        <div className="flex items-center">
          <div className="mr-4 rounded-lg bg-white/70 p-2 dark:bg-slate-700">{icon}</div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
          </div>
        </div>
        <ArrowUpRight className="h-4 w-4 text-gray-400 transition-colors group-hover:text-gray-700 dark:group-hover:text-gray-200" />
      </div>
    </Link>
  )
}
