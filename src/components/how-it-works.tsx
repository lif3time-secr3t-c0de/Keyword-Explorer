import { Search, Target, BarChart3, Download } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      step: '1',
      title: 'Enter Your Seed Keyword',
      description: 'Type in any keyword or phrase related to your business, product, or content topic.',
      color: 'text-blue-600 bg-blue-100',
    },
    {
      icon: Target,
      step: '2',
      title: 'Choose Your Platform',
      description: 'Select the platform you want to target - Google, YouTube, Amazon, or any other supported platform.',
      color: 'text-green-600 bg-green-100',
    },
    {
      icon: BarChart3,
      step: '3',
      title: 'Analyze the Results',
      description: 'Review search volume, competition level, and keyword difficulty to identify the best opportunities.',
      color: 'text-purple-600 bg-purple-100',
    },
    {
      icon: Download,
      step: '4',
      title: 'Export & Optimize',
      description: 'Download your keyword list and start optimizing your content for better search rankings.',
      color: 'text-orange-600 bg-orange-100',
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find profitable keywords in just 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className={`inline-flex p-4 rounded-2xl ${step.color} mb-4`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-gray-900 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Instant Results
            </h4>
            <p className="text-gray-600">
              Get keyword suggestions in seconds, not hours
            </p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Accurate Data
            </h4>
            <p className="text-gray-600">
              Real-time search volume and competition metrics
            </p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Multiple Formats
            </h4>
            <p className="text-gray-600">
              Questions, prepositions, and long-tail variations
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

