import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-slate-900">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Contact</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            For support, partnership requests, or feedback, email us and include your project URL or query details.
          </p>

          <div className="mt-8 space-y-4 rounded-xl bg-slate-50 p-6 dark:bg-slate-900">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Support Email</p>
            <a href="mailto:support@keywordtool.pro" className="text-lg font-semibold text-blue-600 hover:text-blue-700">
              support@keywordtool.pro
            </a>
            <p className="text-sm text-slate-500 dark:text-slate-400">Typical response time: within 24 hours on business days.</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/help" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Visit Help Center
            </Link>
            <Link href="/" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700">
              Back to Research
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
