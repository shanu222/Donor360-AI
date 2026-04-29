import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import { getDashboard } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Loader2, TrendingUp, Heart, Sparkles } from "lucide-react";

export function DashboardPage() {
  const { user, token } = useAuth();
  const [data, setData] = useState<Awaited<ReturnType<typeof getDashboard>> | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getDashboard()
      .then(setData)
      .catch((e) => setErr(e instanceof Error ? e.message : "Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, [token]);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
        <p className="text-slate-400 mb-8">Sign in to view donations, saved activity, and modelled impact.</p>
        <Link
          to="/login"
          className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium"
        >
          Log in
        </Link>
      </div>
    );
  }

  const chartData =
    data?.donationHistory?.map((d, i) => ({
      name: d.projectId?.title ? String(d.projectId.title).slice(0, 14) : `Gift ${i + 1}`,
      value: d.estimatedLivesImpacted || 0,
      color: "#06b6d4",
    })) ?? [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-2">
          Impact Dashboard
        </h1>
        <p className="text-slate-400">
          Signed in as <span className="text-slate-200">{user.email}</span>
        </p>
      </motion.div>

      {loading && (
        <div className="flex items-center gap-2 text-cyan-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading your activity…
        </div>
      )}
      {err && <p className="text-red-400 text-sm mb-6">{err}</p>}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              label: "Total donations (simulated)",
              value: `$${data.totals.totalDonationsUsd.toLocaleString()}`,
              icon: TrendingUp,
            },
            {
              label: "Modelled beneficiary touchpoints",
              value: data.totals.totalModelledBeneficiaryTouchpoints.toLocaleString(),
              icon: Heart,
            },
            {
              label: "Recommendation runs (logged)",
              value: String(data.recommendationActivity?.length ?? 0),
              icon: Sparkles,
            },
          ].map((m) => (
            <div
              key={m.label}
              className="relative rounded-2xl border border-white/10 bg-slate-900/70 p-6 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none" />
              <m.icon className="w-8 h-8 text-cyan-400 mb-4" />
              <p className="text-2xl font-semibold text-white mb-1">{m.value}</p>
              <p className="text-sm text-slate-400">{m.label}</p>
            </div>
          ))}
        </div>
      )}

      {data && chartData.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 mb-12">
          <h2 className="text-xl font-semibold mb-4">Recent gifts — modelled reach</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold mb-4">Donation history</h2>
            <ul className="space-y-3 text-sm text-slate-300 max-h-80 overflow-y-auto pr-2">
              {(data.donationHistory ?? []).length === 0 && (
                <li className="text-slate-500">No simulated donations yet — donate from a recommendation card.</li>
              )}
              {(data.donationHistory ?? []).map((d) => (
                <li key={d._id} className="border-b border-white/5 pb-3">
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-200">
                      {d.projectId && typeof d.projectId === "object" && "title" in d.projectId
                        ? String((d.projectId as { title?: string }).title)
                        : "Project"}
                    </span>
                    <span className="text-cyan-400">${d.amountUsd}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Modelled touchpoints: {(d.estimatedLivesImpacted ?? 0).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold mb-4">Past AI queries</h2>
            <ul className="space-y-3 text-sm text-slate-300 max-h-80 overflow-y-auto pr-2">
              {(data.recommendationActivity ?? []).length === 0 && (
                <li className="text-slate-500">Run a recommendation from the home page while signed in.</li>
              )}
              {(data.recommendationActivity ?? []).map((log) => {
                const l = log as {
                  _id: string;
                  createdAt: string;
                  filters?: { priority?: string; budget?: number; cause?: string[] };
                };
                return (
                  <li key={l._id} className="border-b border-white/5 pb-3">
                    <p className="text-slate-200">
                      Priority: {l.filters?.priority ?? "—"} · Budget ${l.filters?.budget ?? "—"}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Causes: {(l.filters?.cause ?? []).join(", ") || "—"} ·{" "}
                      {new Date(l.createdAt).toLocaleString()}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
