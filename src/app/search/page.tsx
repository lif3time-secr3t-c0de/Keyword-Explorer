'use client'

import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useState, Suspense } from 'react'
import { Download, TrendingUp, BarChart3, Search as SearchIcon, Filter, Star } from 'lucide-react'
import { SearchResult, Platform } from '@/types'
import axios from 'axios'


function SearchResults() {
  const searchParams = useSearchParams()
  const seed = searchParams.get('q')
  const platform = searchParams.get('platform') as Platform || 'GOOGLE'
  const language = searchParams.get('lang') || 'en'
  const country = searchParams.get('country') || 'US'

  const [sortBy, setSortBy] = useState<'volume' | 'competition' | 'difficulty'>('volume')
  const [filterType, setFilterType] = useState<'ALL' | 'STANDARD' | 'QUESTION' | 'PREPOSITION'>('ALL')
  const [viewMode, setViewMode] = useState<'LIST' | 'CLUSTERS'>('LIST')

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
  const [listName, setListName] = useState('')
  const [isSaving, setIsSaving] = useState(false)


  const handleSaveList = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!listName.trim() || !results?.suggestions) return

    setIsSaving(true)
    try {
      await axios.post('/api/lists', {
        name: listName,
        keywords: results.suggestions
      })
      setIsSaveModalOpen(false)
      setListName('')
      // Could show toast success here
      alert('List saved successfully!')
    } catch {
      alert('Failed to save list')
    } finally {
      setIsSaving(false)
    }
  }

  const { data: results, isLoading, isError } = useQuery<SearchResult>({
    queryKey: ['keywords', seed, platform, language, country],
    queryFn: async () => {
      const response = await axios.get('/api/keywords', {
        params: { seed, platform, language, country }
      })
      return response.data
    },
    enabled: !!seed
  })

  if (!seed) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <SearchIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-tight">No query provided</h2>
          <p className="text-slate-500 font-medium tracking-tight">Please enter a keyword to begin your research.</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-transparent">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="relative inline-block">
              <div className="h-20 w-20 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
              <SearchIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-blue-600 animate-pulse" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white mt-6 uppercase tracking-tight">
              Analyzing the Search Landscape
            </h2>
            <p className="text-slate-500 font-medium mt-2">
              Harvesting high-performing keywords for &quot;{seed}&quot;
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="bg-red-500/10 p-6 rounded-3xl mb-6 inline-block">
            <SearchIcon className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2 uppercase tracking-tight">Engine Failure</h2>
          <p className="text-slate-500 font-medium">We encountered a turbulence while processing your request. Please try your search again.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-8 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 uppercase tracking-widest text-sm"
          >
            Retry Search
          </button>
        </div>
      </div>
    )
  }

  const filteredSuggestions = results?.suggestions?.filter(suggestion =>
    filterType === 'ALL' || suggestion.type === filterType
  ) || []

  const sortedSuggestions = [...filteredSuggestions].sort((a, b) => {
    switch (sortBy) {
      case 'volume':
        return (b.searchVolume || 0) - (a.searchVolume || 0)
      case 'competition':
        const compOrder = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3 }
        return compOrder[a.competition || 'LOW'] - compOrder[b.competition || 'LOW']
      case 'difficulty':
        return (a.difficulty || 0) - (b.difficulty || 0)
      default:
        return 0
    }
  })

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'LOW': return 'text-green-600 bg-green-100'
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100'
      case 'HIGH': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 30) return 'text-green-600'
    if (difficulty <= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-transparent transition-colors">
      <div className="container mx-auto px-4 py-8">
        {/* Header Card */}
        <div className="glass rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-white/20 dark:border-white/5 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                Insights for <span className="text-blue-600 dark:text-blue-400">&quot;{seed}&quot;</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 font-medium mt-1">
                Discovered {results?.totalResults || 0} optimization opportunities on {platform}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
              {/* View Toggle */}
              <div className="flex bg-gray-100 dark:bg-slate-800 rounded-lg p-1 mr-2">
                <button
                  onClick={() => setViewMode('LIST')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'LIST' ? 'bg-white dark:bg-slate-600 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode('CLUSTERS')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'CLUSTERS' ? 'bg-white dark:bg-slate-600 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  Clusters
                </button>
              </div>

              <button
                onClick={() => {
                  if (!results?.suggestions || results.suggestions.length === 0) {
                    alert("No data to export");
                    return;
                  }
                  const csvContent = "data:text/csv;charset=utf-8,"
                    + "Keyword,Volume,Difficulty,CPC,Intent,Competition\n"
                    + results.suggestions.map(s => `"${s.keyword}",${s.searchVolume},${s.difficulty},${s.cpc},${s.intent},${s.competition}`).join("\n");
                  const encodedUri = encodeURI(csvContent);
                  const link = document.createElement("a");
                  link.setAttribute("href", encodedUri);
                  link.setAttribute("download", `keywords_${seed}_${platform}.csv`);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                title="Download CSV"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button
                onClick={() => setIsSaveModalOpen(true)}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Star className="h-4 w-4 mr-2" />
                Save
              </button>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
              <Filter className="h-4 w-4 text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'volume' | 'competition' | 'difficulty')}
                className="bg-transparent text-sm font-semibold focus:outline-none text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                <option value="volume">Sort: Search Volume</option>
                <option value="competition">Sort: Competition</option>
                <option value="difficulty">Sort: Difficulty</option>
              </select>
            </div>
            <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Show:</span>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'ALL' | 'STANDARD' | 'QUESTION' | 'PREPOSITION')}
                className="bg-transparent text-sm font-semibold focus:outline-none text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                <option value="ALL">All Intent Types</option>
                <option value="STANDARD">Standard Queries</option>
                <option value="QUESTION">Questions</option>
                <option value="PREPOSITION">Prepositions</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Container */}
        <div className="bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all">

          {viewMode === 'LIST' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Keyword</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Trend (12m)</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Search Volume</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Intent</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Competition</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">CPC</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Difficulty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700 bg-white dark:bg-slate-900">
                  {sortedSuggestions.map((suggestion, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900 dark:text-gray-100">{suggestion.keyword}</div>
                      </td>
                      <td className="py-4 px-6">
                        {/* Sparkline */}
                        <div className="flex items-end h-8 gap-[2px] w-24">
                          {suggestion.trend?.map((val, i) => (
                            <div
                              key={i}
                              className="bg-blue-200 dark:bg-blue-900 w-1.5 rounded-t-sm"
                              style={{ height: `${(val / (Math.max(...(suggestion.trend || [])) || 1)) * 100}%` }}
                              title={`${val} searches`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {suggestion.searchVolume ? formatNumber(suggestion.searchVolume) : 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {suggestion.intent && (
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${suggestion.intent === 'TRANSACTIONAL' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                            suggestion.intent === 'COMMERCIAL' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                              suggestion.intent === 'NAVIGATIONAL' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' :
                                'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                            }`}>
                            {suggestion.intent.charAt(0) + suggestion.intent.slice(1).toLowerCase()}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getCompetitionColor(suggestion.competition || 'LOW')}`}>
                          {suggestion.competition || 'LOW'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-700 dark:text-gray-300">
                          ${suggestion.cpc?.toFixed(2) || '0.00'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <BarChart3 className="h-4 w-4 text-gray-400 mr-2" />
                          <span className={`font-medium ${getDifficultyColor(suggestion.difficulty || 0)}`}>
                            {suggestion.difficulty || 0}/100
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // Cluster View
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50 dark:bg-slate-900/50">
              {/* 
                  Simple Clustering Logic Simulation (Client Side) 
                  Groups by common words
                */}
              {(() => {
                const clusters: Record<string, typeof sortedSuggestions> = {};
                sortedSuggestions.forEach(s => {
                  // Find a grouping word (ignoring stop words)
                  const words = s.keyword.split(' ').filter(w => w.length > 3 && !seed?.includes(w));
                  const group = words[0] || 'Misc'; // Take first meaningful word
                  if (!clusters[group]) clusters[group] = [];
                  clusters[group].push(s);
                });

                return Object.entries(clusters).sort((a, b) => b[1].length - a[1].length).slice(0, 9).map(([name, items]) => (
                  <div key={name} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 shadow-sm">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 capitalize border-b border-gray-100 dark:border-slate-700 pb-2">
                      {name} ({items.length})
                    </h3>
                    <ul className="space-y-2">
                      {items.slice(0, 5).map((item, idx) => (
                        <li key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-300 truncate pr-2">{item.keyword}</span>
                          <span className="font-mono text-gray-400">{formatNumber(item.searchVolume || 0)}</span>
                        </li>
                      ))}
                      {items.length > 5 && (
                        <li className="text-xs text-blue-500 pt-1 font-medium cursor-pointer">
                          + {items.length - 5} more keywords
                        </li>
                      )}
                    </ul>
                  </div>
                ));
              })()}

              {sortedSuggestions.length === 0 && (
                <div className="col-span-full text-center text-gray-500">
                  No clusters found.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Empty State */}
        {sortedSuggestions.length === 0 && (
          <div className="text-center py-16">
            <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No keywords found</h3>
            <p className="text-gray-500">Try adjusting your filters or search with a different keyword.</p>
          </div>
        )}
      </div>

      {/* Save List Modal */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 w-full max-w-md border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6">Archive Insights</h3>
            <form onSubmit={handleSaveList}>
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">Strategy Name</label>
                <input
                  type="text"
                  required
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-blue-500/50 focus:outline-none text-slate-900 dark:text-white font-medium transition-all"
                  placeholder="e.g., 'Q3 Product Launch'"
                />
              </div>
              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 uppercase tracking-widest"
                >
                  {isSaving ? 'Archiving...' : 'Save Strategy'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsSaveModalOpen(false)}
                  className="w-full px-6 py-4 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl font-bold transition-all text-sm"
                >
                  Nevermind
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function SearchLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-600">Loading search...</h2>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<SearchLoading />}>
        <SearchResults />
      </Suspense>
    </div>
  )
}