export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-slate-900">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Terms of Service</h1>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Last updated: March 3, 2026</p>

          <div className="mt-8 space-y-6 text-slate-700 dark:text-slate-300">
            <section>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Acceptable Use</h2>
              <p className="mt-2">Use the service lawfully and do not abuse API routes with automated high-volume traffic.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">No Guarantee</h2>
              <p className="mt-2">Search metrics are modeled estimates and should be validated with your own experiments.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Service Availability</h2>
              <p className="mt-2">Keyword sources are third-party endpoints and may change availability or response formats at any time.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
