import { motion } from "motion/react";
import { ArrowRight, Calendar, Handshake } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"></div>

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-300"></div>

          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-white/10 p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-cyan-500/20 to-transparent rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent"
              >
                Start Making Impact Today
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto"
              >
                Join leading philanthropists and organizations using AI to maximize their social impact
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              >
                <button className="group px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Start Smart Giving
                </button>
                <button className="px-8 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Request Demo
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center gap-2 text-slate-400"
              >
                <Handshake className="w-5 h-5 text-cyan-400" />
                <span className="text-sm">Trusted by global foundations and impact investors</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
