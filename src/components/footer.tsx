import Link from 'next/link'
import { Search } from 'lucide-react'

const productLinks = [
  { href: '/', label: 'Keyword Research' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/my-lists', label: 'My Lists' },
  { href: '/tools', label: 'Tools' },
]

const companyLinks = [
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
]

const resourceLinks = [
  { href: '/help', label: 'Help Center' },
  { href: '/api-docs', label: 'API Docs' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/cookies', label: 'Cookie Policy' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-slate-950 text-slate-300 dark:border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <Search className="h-7 w-7 text-blue-400" />
              <span className="text-lg font-bold text-white">KeywordTool</span>
              <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">Pro</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Real-time keyword discovery across major open web data sources.
            </p>
          </div>

          <FooterSection title="Product" links={productLinks} />
          <FooterSection title="Company" links={companyLinks} />
          <FooterSection title="Resources" links={resourceLinks} />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-sm text-slate-400 md:flex-row">
          <p>(c) {year} KeywordTool Pro. All rights reserved.</p>
          <p>Built for SEO teams, creators, and growth marketers.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterSection({ title, links }: { title: string; links: Array<{ href: string; label: string }> }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-blue-300">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
