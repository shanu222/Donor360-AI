import { motion } from "motion/react";
import { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Users,
  Heart,
  Star,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import type { RecommendationItem } from "@/lib/api";
import { postDonate } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type Props = {
  isVisible: boolean;
  loading: boolean;
  error: string | null;
  recommendations: RecommendationItem[];
};

export function AIResults({ isVisible, loading, error, recommendations }: Props) {
  const [donateOpen, setDonateOpen] = useState(false);
  const [active, setActive] = useState<RecommendationItem | null>(null);
  const [amount, setAmount] = useState("100");
  const [donateLoading, setDonateLoading] = useState(false);
  const [donateSummary, setDonateSummary] = useState<string | null>(null);

  if (!isVisible) return null;

  function openDonate(rec: RecommendationItem) {
    setActive(rec);
    setAmount(String(Math.max(25, Math.min(rec.minBudget, 500))));
    setDonateSummary(null);
    setDonateOpen(true);
  }

  async function confirmDonate() {
    if (!active) return;
    const amt = Number(amount);
    if (Number.isNaN(amt) || amt <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    setDonateLoading(true);
    setDonateSummary(null);
    try {
      const res = await postDonate(active.projectId, amt);
      setDonateSummary(res.impactSummary);
      toast.success("Allocation modelled — see impact summary");
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.65 } });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "We could not run the impact model. Try again shortly.");
    } finally {
      setDonateLoading(false);
    }
  }

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
            <span className="text-sm text-cyan-300">Live API results</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Your Personalized Recommendations
          </h2>
          <p className="text-slate-400 text-lg">
            Ranked by the Donor360 engine (impact, priority axis, budget fit) with explainable reasoning
          </p>
        </motion.div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-cyan-300">
            <Loader2 className="w-10 h-10 animate-spin" />
            <p className="text-sm text-slate-400">Querying MongoDB catalog and scoring pipeline…</p>
          </div>
        )}

        {!loading && error && (
          <div className="max-w-xl mx-auto text-center rounded-2xl border border-amber-500/30 bg-amber-500/10 px-6 py-8 text-amber-50">
            <p className="font-medium mb-2">We couldn&apos;t reach the recommendation service</p>
            <p className="text-sm text-amber-100/90 mb-4">{error}</p>
            <p className="text-xs text-slate-400">
              Start the API from the project root: <code className="text-cyan-300">npm run dev:server</code> (MongoDB
              required).
            </p>
          </div>
        )}

        {!loading && !error && recommendations.length === 0 && (
          <p className="text-center text-slate-400">No programs matched — try widening location or causes.</p>
        )}

        {!loading && !error && recommendations.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <motion.div
                key={rec.projectId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
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

                <div
                  className={`absolute -inset-0.5 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300 ${
                    rec.isBestMatch
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                      : "bg-gradient-to-r from-cyan-500 to-teal-500"
                  }`}
                ></div>

                <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 h-full flex flex-col">
                  <div className="mb-2">
                    <p className="text-xs uppercase tracking-wide text-cyan-300/90 mb-1">
                      {rec.dataSource} · {rec.category}
                    </p>
                    <h3 className="text-xl mb-2 text-white">{rec.title}</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{rec.description}</p>

                  <div className="mb-4 rounded-xl bg-slate-950/50 border border-white/10 px-3 py-2 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Composite score</span>
                    <span className="text-2xl font-semibold text-cyan-400">{rec.score}</span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-400">Impact Score</span>
                      <span className="text-xl text-cyan-400">{rec.impactScore}/100</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${rec.impactScore}%` }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.06 }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"
                      ></motion.div>
                    </div>
                  </div>

                  <div className="mb-4 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm text-cyan-300">Expected impact (model)</span>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">{rec.expectedImpact}</p>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Why recommended</p>
                        <p className="text-sm text-slate-300 leading-relaxed">{rec.reason}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                      {rec.location}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                      Min ${rec.minBudget.toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-white/10">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Users className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-400">Urgency</span>
                      </div>
                      <p className="text-sm text-white">{rec.urgencyScore}/100</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Heart className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-400">Scale</span>
                      </div>
                      <p className="text-sm text-white">{rec.scaleScore}/100</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openDonate(rec)}
                    className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                  >
                    Donate Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={donateOpen} onOpenChange={setDonateOpen}>
        <DialogContent className="bg-slate-950 border border-white/10 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Simulate a gift</DialogTitle>
            <DialogDescription className="text-slate-400">
              This calls <code className="text-cyan-300">POST /api/donate</code> to compute modelled reach. Not a live
              payment processor.
            </DialogDescription>
          </DialogHeader>
          {active && (
            <div className="space-y-3 text-sm">
              <p className="text-slate-200 font-medium">{active.title}</p>
              <label className="block text-xs text-slate-400">Amount (USD)</label>
              <input
                type="number"
                min={1}
                className="w-full rounded-lg bg-slate-900 border border-white/10 px-3 py-2 outline-none focus:border-cyan-500/50"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {donateSummary && (
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-100 flex gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed">{donateSummary}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <button
              type="button"
              onClick={() => setDonateOpen(false)}
              className="px-4 py-2 rounded-lg border border-white/15 text-sm hover:bg-white/5"
            >
              Close
            </button>
            <button
              type="button"
              disabled={donateLoading}
              onClick={confirmDonate}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 text-sm font-medium disabled:opacity-60 flex items-center gap-2"
            >
              {donateLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Run model
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
