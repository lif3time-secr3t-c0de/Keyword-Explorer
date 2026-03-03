import { Search, TrendingUp, Download, BarChart3, Globe, Zap } from 'lucide-react'
import Link from 'next/link'

export function Features() {
  const features = [
    {
      icon: Search,
      title: 'Unlimited Keyword Suggestions',
      description: 'Generate thousands of keyword suggestions from a single seed keyword across multiple platforms.',
      color: 'text-blue-600 bg-blue-100',
    },
    {
      icon: TrendingUp,
      title: 'Search Volume & Competition',
      description: 'Get accurate search volume data and competition analysis to find profitable keywords.',
      color: 'text-green-600 bg-green-100',
    },
    {
      icon: BarChart3,
      title: 'Keyword Difficulty Score',
      description: 'Understand how hard it will be to rank for specific keywords with our difficulty scoring.',
      color: 'text-purple-600 bg-purple-100',
    },
    {
      icon: Globe,
      title: 'Multi-Platform Support',
      description: 'Research keywords for Google, YouTube, Amazon, Bing, and many other platforms.',
      color: 'text-orange-600 bg-orange-100',
    },
    {
      icon: Download,
      title: 'Export Your Data',
      description: 'Download your keyword research results in CSV, Excel, or PDF format for easy sharing.',
      color: 'text-red-600 bg-red-100',
    },
    {
      icon: Zap,
      title: 'Long-tail Keywords',
      description: 'Discover long-tail keywords with lower competition and higher conversion potential.',
      color: 'text-yellow-600 bg-yellow-100',
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Keyword Research
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive keyword research platform provides all the tools and data you need to dominate search rankings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Find Your Next Winning Keywords?
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Start your keyword research journey today with our free tool
            </p>
            <Link href="/" className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors text-lg">
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
