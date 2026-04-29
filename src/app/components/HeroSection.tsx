import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-500"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-cyan-300">AI-Powered Impact Intelligence</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-white via-cyan-200 to-teal-300 bg-clip-text text-transparent"
        >
          AI-Powered Giving Intelligence
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto"
        >
          Connect donors with high-impact interventions using real-time data and AI
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="group px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2">
            Start Smart Giving
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium text-lg hover:bg-white/10 transition-all duration-300">
            Explore Impact
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-2xl blur-2xl"></div>
          <div className="relative aspect-video max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-teal-500/10"></div>
            <div className="relative grid grid-cols-3 gap-4 p-8 w-full">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                  className="h-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"
                ></motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
