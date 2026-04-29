import { motion } from "motion/react";
import { Sparkles, TrendingUp, Users, Heart, Star } from "lucide-react";

const recommendations = [
  {
    id: 1,
    name: "Rural Women Health Initiative",
    problem: "Limited access to maternal healthcare in rural areas leading to high mortality rates",
    impactScore: 92,
    impactPerDollar: "$1 = 25 people reached",
    aiReasoning: "High impact density with proven track record. Addresses urgent needs with scalable solutions.",
    tags: ["Healthcare", "Women", "Rural Development"],
    isBestMatch: true,
    beneficiaries: 2500,
    urgency: "High",
  },
  {
    id: 2,
    name: "Climate-Resilient Agriculture Training",
    problem: "Small-scale farmers lacking knowledge to adapt to climate change impacts",
    impactScore: 88,
    impactPerDollar: "$1 = 18 people reached",
    aiReasoning: "Long-term sustainable impact with community multiplier effect and environmental benefits.",
    tags: ["Climate", "Women", "Education"],
    isBestMatch: false,
    beneficiaries: 1800,
    urgency: "Medium",
  },
  {
    id: 3,
    name: "Women's Economic Empowerment Fund",
    problem: "Lack of access to microfinance and business training for women entrepreneurs",
    impactScore: 85,
    impactPerDollar: "$1 = 12 people reached",
    aiReasoning: "Creates sustainable income streams with high retention and community growth potential.",
    tags: ["Women", "Economic", "Education"],
    isBestMatch: false,
    beneficiaries: 1200,
    urgency: "Medium",
  },
];

export function AIResults({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-sm text-cyan-300">AI Analysis Complete</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Your Personalized Recommendations
          </h2>
          <p className="text-slate-400 text-lg">
            Based on your preferences and our AI impact analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {rec.isBestMatch && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-4 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-semibold flex items-center gap-1 shadow-lg">
                    <Star className="w-3 h-3" />
                    Best Match
                  </div>
                </div>
              )}

              <div className={`absolute -inset-0.5 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300 ${
                rec.isBestMatch
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                  : "bg-gradient-to-r from-cyan-500 to-teal-500"
              }`}></div>

              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 h-full flex flex-col">
                <div className="mb-4">
                  <h3 className="text-xl mb-2 text-white">{rec.name}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{rec.problem}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Impact Score</span>
                    <span className="text-2xl text-cyan-400">{rec.impactScore}/100</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${rec.impactScore}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>

                <div className="mb-6 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-cyan-300">Impact per Dollar</span>
                  </div>
                  <p className="text-lg text-white">{rec.impactPerDollar}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400 mb-1">AI Reasoning</p>
                      <p className="text-sm text-slate-300">{rec.aiReasoning}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {rec.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-white/10">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Users className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-400">Beneficiaries</span>
                    </div>
                    <p className="text-sm text-white">{rec.beneficiaries.toLocaleString()}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Heart className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-400">Urgency</span>
                    </div>
                    <p className={`text-sm ${
                      rec.urgency === "High" ? "text-orange-400" : "text-yellow-400"
                    }`}>{rec.urgency}</p>
                  </div>
                </div>

                <button className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
