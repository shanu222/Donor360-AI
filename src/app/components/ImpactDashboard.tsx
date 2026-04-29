import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, Users, DollarSign, Heart } from "lucide-react";

const impactData = [
  { name: "Rural Health", value: 92, color: "#06b6d4" },
  { name: "Climate Training", value: 88, color: "#14b8a6" },
  { name: "Women's Fund", value: 85, color: "#22d3ee" },
  { name: "Education", value: 78, color: "#0ea5e9" },
];

const metrics = [
  { label: "People Reached", value: "5,500+", icon: Users, color: "from-cyan-500 to-blue-500" },
  { label: "Impact Score", value: "92/100", icon: TrendingUp, color: "from-teal-500 to-cyan-500" },
  { label: "Cost Efficiency", value: "$1 = 25", icon: DollarSign, color: "from-green-500 to-teal-500" },
  { label: "Programs", value: "12", icon: Heart, color: "from-pink-500 to-rose-500" },
];

export function ImpactDashboard({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

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
            Data-driven insights on your giving potential
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${metric.color} rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300`}></div>
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
              <h3 className="text-2xl mb-6 text-white">Impact per Dollar</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
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
              <h3 className="text-2xl mb-6 text-white">Your $100 Impact</h3>

              <div className="space-y-6">
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">People Reached</span>
                    <span className="text-2xl text-cyan-400">250</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Lives Improved</span>
                    <span className="text-2xl text-teal-400">85</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-teal-500 to-green-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Long-term Beneficiaries</span>
                    <span className="text-2xl text-purple-400">45</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "65%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <p className="text-sm text-slate-300 text-center">
                  <span className="text-cyan-400">Before:</span> Limited access
                  <span className="mx-4">→</span>
                  <span className="text-teal-400">After:</span> Sustainable impact
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
