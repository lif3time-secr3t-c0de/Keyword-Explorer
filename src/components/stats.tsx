export function Stats() {
  const stats = [
    { number: '10M+', label: 'Keywords Generated', description: 'Millions of keyword suggestions' },
    { number: '500K+', label: 'Happy Users', description: 'Content creators and marketers' },
    { number: '100+', label: 'Countries', description: 'Global keyword research' },
    { number: '15+', label: 'Platforms', description: 'Search engines and marketplaces' },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Content Creators Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join millions of marketers, content creators, and SEO professionals who use our tool daily
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}