import Link from 'next/link'

const faqs = [
  {
    question: 'How do I run keyword research?',
    answer: 'Go to the Research page, enter a seed keyword, choose platform/country/language, and submit.',
  },
  {
    question: 'Where does data come from?',
    answer: 'The platform combines open autocomplete sources (Google, YouTube, Bing, Amazon, DuckDuckGo) in real time.',
  },
  {
    question: 'Can I export my results?',
    answer: 'Yes. Use the Export button on the search results page to download CSV.',
  },
  {
    question: 'How do saved lists work?',
    answer: 'Use Save on results, then manage all lists from the My Lists page.',
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-slate-900">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Help Center</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Quick answers for setup, keyword workflows, and data behavior.</p>

        <div className="mt-8 space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-xl border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{faq.question}</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/30">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            Need direct help? Visit <Link href="/contact" className="font-semibold underline">Contact</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
