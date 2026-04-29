import { motion } from "motion/react";
import { Shield, Database, Brain, CheckCircle } from "lucide-react";

const trustFeatures = [
  {
    icon: Brain,
    title: "AI Explainability",
    description: "Every recommendation comes with transparent reasoning and data sources",
  },
  {
    icon: Database,
    title: "Data Sources",
    description: "Real-time data from UN, World Bank, NGOs, and verified impact reports",
  },
  {
    icon: Shield,
    title: "Responsible AI",
    description: "Ethical algorithms designed to maximize equity and long-term outcomes",
  },
  {
    icon: CheckCircle,
    title: "Verified Impact",
    description: "All programs undergo rigorous vetting and continuous monitoring",
  },
];

export function TrustSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Trust & Transparency
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Built on ethical AI principles with complete transparency in our decision-making process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-cyan-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg mb-2 text-white">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
