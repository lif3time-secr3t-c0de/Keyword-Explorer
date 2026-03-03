import { Users, Target, Zap, Award, Globe, Heart } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const stats = [
    { number: '10M+', label: 'Keywords Generated' },
    { number: '500K+', label: 'Happy Users' },
    { number: '100+', label: 'Countries Supported' },
    { number: '15+', label: 'Platforms Integrated' },
  ]

  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'We provide accurate, data-driven keyword insights to help you make informed decisions.',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Zap,
      title: 'Speed',
      description: 'Get instant keyword suggestions and analysis without waiting for slow processing.',
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Research keywords in multiple languages and countries to expand your reach.',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Every feature is designed with our users in mind, making keyword research simple.',
      color: 'text-red-600 bg-red-100'
    }
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-founder',
      image: '/api/placeholder/150/150',
      bio: 'Former SEO director with 10+ years experience in digital marketing and keyword research.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO & Co-founder',
      image: '/api/placeholder/150/150',
      bio: 'Software engineer with expertise in data science and search algorithm optimization.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      image: '/api/placeholder/150/150',
      bio: 'Product strategist focused on user experience and keyword research tool innovation.'
    },
    {
      name: 'David Kim',
      role: 'Lead Data Scientist',
      image: '/api/placeholder/150/150',
      bio: 'PhD in Machine Learning, specializing in search data analysis and predictive modeling.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About KeywordTool Pro
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              We&apos;re on a mission to democratize keyword research and help businesses 
              of all sizes discover the right keywords to grow their online presence.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Built by SEO Professionals, for SEO Professionals
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  KeywordTool Pro was born out of frustration with existing keyword research tools. 
                  As SEO professionals and content creators ourselves, we knew there had to be a better way 
                  to find profitable keywords quickly and accurately.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We started with a simple goal: create the most comprehensive, user-friendly keyword 
                  research platform that doesn&apos;t break the bank. Today, we&apos;re proud to serve hundreds 
                  of thousands of users worldwide.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our team combines deep expertise in SEO, data science, and software engineering to 
                  deliver tools that actually work for real businesses.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">
                      1
                    </div>
                    <span className="text-gray-700">Identified the problem with existing tools</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">
                      2
                    </div>
                    <span className="text-gray-700">Built our first MVP in 2023</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">
                      3
                    </div>
                    <span className="text-gray-700">Launched to 1,000+ beta users</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">
                      4
                    </div>
                    <span className="text-gray-700">Now serving 500K+ users globally</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape how we build our products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="text-center">
                  <div className={`inline-flex p-4 rounded-full ${value.color} mb-4`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind KeywordTool Pro
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex p-4 bg-white/10 rounded-full mb-6">
              <Award className="h-12 w-12" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-xl leading-relaxed mb-8 opacity-90">
              To empower businesses and content creators with the most comprehensive, 
              accurate, and user-friendly keyword research tools available. We believe 
              that great SEO should be accessible to everyone, not just enterprise companies 
              with massive budgets.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">Accessibility</div>
                <p className="opacity-90">Making powerful SEO tools available to businesses of all sizes</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">Innovation</div>
                <p className="opacity-90">Continuously improving our algorithms and data sources</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">Community</div>
                <p className="opacity-90">Building a supportive community of SEO professionals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Want to Learn More?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Whether you have questions, feedback, or just want to say hello.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
              Contact Us
            </Link>
            <Link href="/" className="border-2 border-blue-600 text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
              Try Our Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
