export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-slate-900">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Cookie Policy</h1>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Last updated: March 3, 2026</p>

          <div className="mt-8 space-y-6 text-slate-700 dark:text-slate-300">
            <section>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Essential Cookies</h2>
              <p className="mt-2">The app may use essential cookies for theme and session behavior where required by hosting setup.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Analytics</h2>
              <p className="mt-2">No analytics cookies are required by default in this codebase.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Managing Cookies</h2>
              <p className="mt-2">You can clear or block cookies through your browser settings at any time.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
