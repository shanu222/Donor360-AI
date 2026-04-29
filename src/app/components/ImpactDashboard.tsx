import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, Users, DollarSign, Heart } from "lucide-react";
import type { RecommendationItem } from "@/lib/api";

type Props = {
  isVisible: boolean;
  recommendations: RecommendationItem[];
  budget?: number;
};

export function ImpactDashboard({ isVisible, recommendations, budget }: Props) {
  if (!isVisible) return null;

  const impactData = recommendations.map((r, i) => ({
    name: r.title.length > 16 ? `${r.title.slice(0, 16)}…` : r.title,
    value: r.impactScore,
    color: ["#06b6d4", "#14b8a6", "#22d3ee", "#0ea5e9", "#2dd4bf"][i % 5],
  }));

  const top = recommendations[0];
  const avgImpact =
    recommendations.reduce((s, r) => s + r.impactScore, 0) / Math.max(1, recommendations.length);

  const metrics = [
    {
      label: "Programs in set",
      value: String(recommendations.length),
      icon: Users,
      color: "from-cyan-500 to-blue-500",
    },
    {
      label: "Top composite score",
      value: top ? `${top.score}` : "—",
      icon: TrendingUp,
      color: "from-teal-500 to-cyan-500",
    },
    {
      label: "Stated budget",
      value: budget != null ? `$${budget.toLocaleString()}` : "—",
      icon: DollarSign,
      color: "from-green-500 to-teal-500",
    },
    {
      label: "Avg impact score",
      value: `${Math.round(avgImpact)}/100`,
      icon: Heart,
      color: "from-pink-500 to-rose-500",
    },
  ];

  const modelledReach = top
    ? Math.round((top.score / 100) * (budget && budget > 0 ? budget / 10 : 120))
    : 0;

  return (
    <section className="relative py-24 px-6 bg-slate-950/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Impact Visualization
          </h2>
          <p className="text-slate-400 text-lg">
            Pulled from the latest recommendation response — not static marketing figures
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="relative group"
            >
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${metric.color} rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300`}
              ></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className="w-8 h-8 text-cyan-400" />
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${metric.color} opacity-20`}></div>
                </div>
                <p className="text-3xl mb-2 text-white">{metric.value}</p>
                <p className="text-sm text-slate-400">{metric.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h3 className="text-2xl mb-6 text-white">Impact scores (current set)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 100]} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {impactData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <h3 className="text-2xl mb-6 text-white">Illustrative reach index</h3>

              <div className="space-y-6">
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Modelled touchpoints</span>
                    <span className="text-2xl text-cyan-400">{modelledReach}</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(100, modelledReach)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Data confidence</span>
                    <span className="text-2xl text-teal-400">{top ? top.impactScore : 0}%</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${top ? top.impactScore : 0}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-teal-500 to-green-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Urgency signal</span>
                    <span className="text-2xl text-purple-400">{top ? top.urgencyScore : 0}%</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${top ? top.urgencyScore : 0}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <p className="text-sm text-slate-300 text-center">
                  <span className="text-cyan-400">Inputs:</span> donor filters + catalog
                  <span className="mx-4">→</span>
                  <span className="text-teal-400">Output:</span> ranked projects + explainers
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
