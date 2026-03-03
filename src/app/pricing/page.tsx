import { Check, X, Star, Crown, Zap } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      description: 'Perfect for getting started',
      price: '$0',
      period: 'forever',
      icon: Star,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      buttonStyle: 'bg-gray-600 hover:bg-gray-700 text-white',
      features: [
        { text: '10 searches per month', included: true },
        { text: 'Basic keyword suggestions', included: true },
        { text: 'Google platform only', included: true },
        { text: 'Search volume data', included: false },
        { text: 'Competition analysis', included: false },
        { text: 'Export to CSV', included: false },
        { text: 'API access', included: false },
        { text: 'Priority support', included: false },
      ]
    },
    {
      name: 'Pro',
      description: 'Best for content creators & marketers',
      price: '$29',
      period: 'per month',
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      buttonStyle: 'bg-blue-600 hover:bg-blue-700 text-white',
      popular: true,
      features: [
        { text: '1,000 searches per month', included: true },
        { text: 'All keyword suggestions', included: true },
        { text: 'All platforms available', included: true },
        { text: 'Search volume data', included: true },
        { text: 'Competition analysis', included: true },
        { text: 'Export to CSV/Excel', included: true },
        { text: 'Keyword difficulty scores', included: true },
        { text: 'Email support', included: true },
      ]
    },
    {
      name: 'Enterprise',
      description: 'For agencies & large teams',
      price: '$99',
      period: 'per month',
      icon: Crown,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      buttonStyle: 'bg-purple-600 hover:bg-purple-700 text-white',
      features: [
        { text: 'Unlimited searches', included: true },
        { text: 'All keyword suggestions', included: true },
        { text: 'All platforms available', included: true },
        { text: 'Search volume data', included: true },
        { text: 'Competition analysis', included: true },
        { text: 'Export to CSV/Excel/PDF', included: true },
        { text: 'Full API access', included: true },
        { text: 'Priority support', included: true },
      ]
    }
  ]

  const faqs = [
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access to your paid features until the end of your billing period.'
    },
    {
      question: 'Is there a free trial for paid plans?',
      answer: 'Yes, we offer a 7-day free trial for both Pro and Enterprise plans. No credit card required to start your trial.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. All payments are processed securely through Stripe.'
    },
    {
      question: 'Do you offer discounts for annual billing?',
      answer: 'Yes! Save 20% when you choose annual billing. Contact our sales team for custom enterprise pricing options.'
    },
    {
      question: 'What happens if I exceed my search limit?',
      answer: 'You\'ll be notified when you approach your limit. Free users can upgrade to continue, while paid users can purchase additional searches or upgrade to a higher plan.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Choose the perfect plan for your keyword research needs. Start free and upgrade as you grow.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon
              return (
                <div 
                  key={index} 
                  className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                    plan.popular 
                      ? 'border-blue-500 relative scale-105' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className={`inline-flex p-3 rounded-lg ${plan.bgColor} mb-4`}>
                      <Icon className={`h-8 w-8 ${plan.color}`} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-2">/{plan.period}</span>
                    </div>
                    
                    <Link href={plan.name === 'Enterprise' ? '/contact' : '/'} className={`block w-full py-3 px-6 rounded-lg font-semibold transition-colors text-center ${plan.buttonStyle} mb-8`}>
                      {plan.name === 'Free' ? 'Get Started' : 'Start Free Trial'}
                    </Link>
                    
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                          )}
                          <span className={`${feature.included ? 'text-gray-900' : 'text-gray-500'}`}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our pricing? Here are the most common ones.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Next Winning Keywords?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of marketers and content creators who trust our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              Start Free Trial
            </Link>
            <Link href="/contact" className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
