import Link from 'next/link'
import { Search, Users, ListChecks, LayoutDashboard, ArrowRight } from 'lucide-react'

const tools = [
  {
    icon: Search,
    title: 'Keyword Research Engine',
    description: 'Run live keyword discovery across open data sources with intent, difficulty, and trend scoring.',
    href: '/',
    cta: 'Start Research',
    color: 'text-blue-700 bg-blue-100',
  },
  {
    icon: Users,
    title: 'Competitor Gap Analysis',
    description: 'Compare your domain with a competitor to identify content and ranking opportunities.',
    href: '/tools/competitor-gap',
    cta: 'Analyze Competitors',
    color: 'text-purple-700 bg-purple-100',
  },
  {
    icon: ListChecks,
    title: 'Keyword Lists',
    description: 'Save and organize keyword sets so your campaigns stay structured and reusable.',
    href: '/my-lists',
    cta: 'Open Lists',
    color: 'text-emerald-700 bg-emerald-100',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard',
    description: 'Track usage snapshots, saved assets, and quick actions from one operational screen.',
    href: '/dashboard',
    cta: 'Open Dashboard',
    color: 'text-orange-700 bg-orange-100',
  },
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <section className="border-b border-slate-200 bg-white py-14 dark:border-slate-800 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">Tool Suite</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Focused set of production-ready workflows. All links below map to working pages only.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className={`mb-4 inline-flex rounded-lg p-3 ${tool.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{tool.title}</h2>
                  <p className="mt-3 text-slate-600 dark:text-slate-300">{tool.description}</p>
                  <div className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600">
                    {tool.cta}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
