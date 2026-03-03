import { KeywordSearch } from "@/components/keyword-search";
import { Features } from "@/components/features";
import { Stats } from "@/components/stats";
import { HowItWorks } from "@/components/how-it-works";

export default function HomePage() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section with Keyword Search */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16 md:pt-24 pb-20 border-b border-slate-200 dark:border-slate-800 transition-colors">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-400/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-400/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter text-slate-900 dark:text-white uppercase">
              Dominating the <br />
              <span className="text-gradient">Search Engine</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight">
              Unlock millions of hidden keywords for Google, YouTube, and Amazon.
              Our engine delivers high-intent data to fuel your content strategy.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              <span className="flex items-center">10M+ Database</span>
              <span className="flex items-center">Multi-Platform</span>
              <span className="flex items-center">Instant Clusters</span>
              <span className="flex items-center">Export Ready</span>
            </div>
          </div>

          <div className="relative z-10">
            <div className="absolute -inset-4 bg-blue-500/10 dark:bg-blue-400/5 blur-3xl -z-10 rounded-[4rem]"></div>
            <KeywordSearch />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Stats />

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />
    </div>
  );
}

