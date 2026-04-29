import { motion } from "motion/react";
import { Network, ArrowRight, Database } from "lucide-react";

export function IntegrationSection() {
  return (
    <section className="relative py-24 px-6 bg-slate-950/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Connected Ecosystem
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Part of a comprehensive impact intelligence network
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-2xl blur-3xl"></div>

            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-12">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-1 text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 flex items-center justify-center">
                    <span className="text-3xl">👩</span>
                  </div>
                  <h3 className="text-xl mb-2 text-white">She360</h3>
                  <p className="text-sm text-slate-400">Women Empowerment Platform</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col items-center gap-4"
                >
                  <ArrowRight className="w-6 h-6 text-cyan-400 hidden md:block rotate-0" />
                  <ArrowRight className="w-6 h-6 text-cyan-400 md:hidden rotate-90" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex-1 text-center"
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-teal-500/30 border-2 border-cyan-500/50 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                    <Network className="w-12 h-12 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl mb-2 text-white">Donor360 AI</h3>
                  <p className="text-sm text-cyan-400">Impact Intelligence Hub</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-col items-center gap-4"
                >
                  <ArrowRight className="w-6 h-6 text-cyan-400 hidden md:block rotate-0" />
                  <ArrowRight className="w-6 h-6 text-cyan-400 md:hidden rotate-90" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex-1 text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/30 flex items-center justify-center">
                    <span className="text-3xl">🌍</span>
                  </div>
                  <h3 className="text-xl mb-2 text-white">Resilience360</h3>
                  <p className="text-sm text-slate-400">Climate Resilience Platform</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-12 pt-8 border-t border-white/10"
              >
                <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
                  <Database className="w-5 h-5 text-cyan-400" />
                  <span>Data</span>
                  <ArrowRight className="w-4 h-4" />
                  <Network className="w-5 h-5 text-cyan-400" />
                  <span>AI Processing</span>
                  <ArrowRight className="w-4 h-4" />
                  <span className="text-teal-400">Impact Recommendations</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
