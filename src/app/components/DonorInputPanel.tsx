import { motion } from "motion/react";
import { useState } from "react";
import { Sparkles, MapPin, TrendingUp, Loader2, AlertCircle } from "lucide-react";
import type { DonorPreferences } from "@/lib/api";

const causes = [
  { id: "women", label: "Women Empowerment", icon: "👩" },
  { id: "healthcare", label: "Healthcare", icon: "🏥" },
  { id: "climate", label: "Climate", icon: "🌍" },
  { id: "education", label: "Education", icon: "📚" },
];

const priorities = ["Maximum Reach", "Urgent Needs", "Long-Term Impact"];

type Props = {
  onGenerateRecommendations: (prefs: DonorPreferences) => void | Promise<void>;
  loading?: boolean;
  error?: string | null;
};

export function DonorInputPanel({ onGenerateRecommendations, loading, error }: Props) {
  const [selectedCauses, setSelectedCauses] = useState<string[]>(["women"]);
  const [budget, setBudget] = useState(1000);
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("Maximum Reach");

  const toggleCause = (causeId: string) => {
    setSelectedCauses((prev) =>
      prev.includes(causeId) ? prev.filter((id) => id !== causeId) : [...prev, causeId]
    );
  };

  async function handleSubmit() {
    if (selectedCauses.length === 0) return;
    const prefs: DonorPreferences = {
      cause: selectedCauses,
      budget,
      location,
      priority,
    };
    await onGenerateRecommendations(prefs);
  }

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Find Your Impact Match
          </h2>
          <p className="text-slate-400 text-lg">
            Live scoring against the Donor360 catalog — filters, weights, and provenance returned by the API
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-10">
            <div className="space-y-8">
              <div>
                <label className="block text-sm text-slate-300 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Select Causes
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {causes.map((cause) => (
                    <button
                      key={cause.id}
                      type="button"
                      onClick={() => toggleCause(cause.id)}
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        selectedCauses.includes(cause.id)
                          ? "bg-cyan-500/20 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <div className="text-2xl mb-2">{cause.icon}</div>
                      <div className="text-sm text-white">{cause.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-4 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    Budget
                  </span>
                  <span className="text-cyan-400 font-semibold">${budget.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="10000"
                  step="10"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-cyan-500 [&::-webkit-slider-thumb]:to-teal-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-cyan-500/50"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>$10</span>
                  <span>$10,000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  Location (Optional)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Karachi, Lahore, rural Punjab"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-4">Impact Priority</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {priorities.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`p-3 rounded-xl border text-sm transition-all duration-300 ${
                        priority === p
                          ? "bg-cyan-500/20 border-cyan-500/50 text-white"
                          : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="button"
                disabled={loading || selectedCauses.length === 0}
                onClick={handleSubmit}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                )}
                {loading ? "Running engine…" : "Generate AI Recommendations"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
