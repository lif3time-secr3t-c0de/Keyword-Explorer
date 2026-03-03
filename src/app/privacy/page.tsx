export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-slate-900">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Last updated: March 3, 2026</p>

          <div className="mt-8 space-y-6 text-slate-700 dark:text-slate-300">
            <section>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Data We Process</h2>
              <p className="mt-2">We process keyword search inputs, selected filters (platform/language/country), and saved lists for product functionality.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">How We Use Data</h2>
              <p className="mt-2">Data is used to fetch keyword suggestions, compute metrics, and provide history/list management.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Storage and Retention</h2>
              <p className="mt-2">Local development uses SQLite. You can delete local database data at any time by resetting your database file.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
