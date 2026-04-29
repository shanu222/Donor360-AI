import { motion } from "motion/react";
import {
  Shield,
  Database,
  Brain,
  CheckCircle,
  GitBranch,
  Scale,
  FileText,
} from "lucide-react";

const trustFeatures = [
  {
    icon: Brain,
    title: "AI explainability",
    description:
      "Each rank includes a deterministic score breakdown: 50% impact quality, 30% donor-selected priority axis, 20% budget compatibility. No black-box reranking.",
  },
  {
    icon: GitBranch,
    title: "Data pipeline",
    description:
      "Programs are normalized from She360, Resilience360, and curated internal blends. API responses echo source systems for audit trails.",
  },
  {
    icon: Database,
    title: "Source attribution",
    description:
      "Every card exposes dataSource, geography, and minimum envelopes so funders can trace claims back to catalog rows.",
  },
  {
    icon: Scale,
    title: "Ethical AI posture",
    description:
      "We surface uncertainty: simulated donations are explicitly modelled—not bank movements—and recommendations widen filters before failing silent.",
  },
  {
    icon: FileText,
    title: "Impact model transparency",
    description:
      "Donation simulations combine impact-per-$1k, impact score uplift, and household divisors; methodology is versioned alongside API releases.",
  },
  {
    icon: Shield,
    title: "Responsible deployment",
    description:
      "Auth separates public browsing from saved projects and logged donor activity. Production hardens secrets via managed identity + KMS.",
  },
  {
    icon: CheckCircle,
    title: "Verified catalog discipline",
    description:
      "Seed data mirrors field structure required for M&E attachments. Partners extend rows—not ad-hoc UI copy—keeping investor diligence lightweight.",
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
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Donor360 AI is engineered for institutional diligence: explainable scoring, explicit data lineage, and
            honest simulation semantics that hold up in rooms with technical reviewers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-cyan-500/30 transition-all duration-300 h-full flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg mb-2 text-white">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed flex-1">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
