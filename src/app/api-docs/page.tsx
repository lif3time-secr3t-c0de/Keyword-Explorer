const endpointRows = [
  {
    method: 'GET',
    path: '/api/keywords',
    description: 'Fetches keyword suggestions and metrics from live open sources.',
  },
  {
    method: 'POST',
    path: '/api/keywords',
    description: 'Same as GET, but accepts JSON payload.',
  },
  {
    method: 'GET',
    path: '/api/lists',
    description: 'Returns saved keyword lists for the local guest account.',
  },
  {
    method: 'POST',
    path: '/api/lists',
    description: 'Creates a saved keyword list.',
  },
]

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-slate-900">
      <div className="container mx-auto max-w-5xl px-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">API Docs</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Core endpoints and parameters for integrating keyword workflows.
        </p>

        <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 dark:bg-slate-700">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-100">Method</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-100">Path</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-100">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {endpointRows.map((row) => (
                <tr key={`${row.method}-${row.path}`}>
                  <td className="px-4 py-3 font-mono text-blue-700 dark:text-blue-300">{row.method}</td>
                  <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-200">{row.path}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Keyword Endpoint Parameters</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li><span className="font-mono">seed</span>: keyword seed string (required)</li>
            <li><span className="font-mono">platform</span>: one of GOOGLE, YOUTUBE, BING, AMAZON, EBAY, PLAY_STORE, APP_STORE, INSTAGRAM, TWITTER, PINTEREST</li>
            <li><span className="font-mono">language</span>: locale code (default: en)</li>
            <li><span className="font-mono">country</span>: ISO country code (default: US)</li>
            <li><span className="font-mono">limit</span>: number of suggestions, 10-250 (default: 120)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
