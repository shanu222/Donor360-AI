import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import { getDashboard, type DashboardPayload } from "@/lib/api";
import { Loader2, TrendingUp, Heart, Sparkles, Leaf, Wallet, Users } from "lucide-react";

export function DashboardPage() {
  const [data, setData] = useState<DashboardPayload | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErr(null);
    getDashboard()
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((e) => {
        if (!cancelled) setErr(e instanceof Error ? e.message : "Could not load the dashboard right now.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const chartData =
    data?.donationHistory?.map((d, i) => ({
      name: d.projectId?.title ? String(d.projectId.title).slice(0, 14) : `Gift ${i + 1}`,
      value: d.estimatedLivesImpacted || 0,
      color: "#06b6d4",
    })) ?? [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-10" id="impact">
        <h1 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-2">
          Impact dashboard
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Live platform metrics and recent AI activity. When no donations are recorded yet, we show a clearly labelled
          illustrative baseline so demos stay compelling.
        </p>
        {data?.usingDemoBaseline && (
          <p className="mt-3 text-xs text-amber-200/90 rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 inline-block">
            Showing illustrative donation totals until the first simulated gifts are recorded in the database.
          </p>
        )}
      </motion.div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-cyan-400">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="text-sm text-slate-400">Loading impact data…</p>
        </div>
      )}

      {!loading && err && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-6 py-8 text-amber-50 max-w-xl">
          <p className="font-medium mb-2">Dashboard data unavailable</p>
          <p className="text-sm text-amber-100/90 mb-4">{err}</p>
          <p className="text-xs text-slate-400">
            Start the API from the project root: <code className="text-cyan-300">npm run dev:server</code> (MongoDB
            required).
          </p>
        </div>
      )}

      {!loading && !err && data && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
            {[
              {
                label: "Lives impacted (modelled)",
                value: data.totals.livesImpacted.toLocaleString(),
                icon: Heart,
              },
              {
                label: "Climate resilience index",
                value: `${data.totals.climateResilienceIndex}/100`,
                icon: Leaf,
              },
              {
                label: "Funding distributed (sim.)",
                value: `$${data.totals.fundingDistributedUsd.toLocaleString()}`,
                icon: Wallet,
              },
              {
                label: "Simulated gifts",
                value: String(data.totals.donationCount),
                icon: TrendingUp,
              },
              {
                label: "Beneficiary touchpoints",
                value: data.totals.totalModelledBeneficiaryTouchpoints.toLocaleString(),
                icon: Users,
              },
              {
                label: "AI runs logged",
                value: String(data.recommendationActivity?.length ?? 0),
                icon: Sparkles,
              },
            ].map((m) => (
              <div
                key={m.label}
                className="relative rounded-2xl border border-white/10 bg-slate-900/70 p-5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none" />
                <m.icon className="w-7 h-7 text-cyan-400 mb-3" />
                <p className="text-xl font-semibold text-white mb-1 leading-tight">{m.value}</p>
                <p className="text-xs text-slate-400 leading-snug">{m.label}</p>
              </div>
            ))}
          </div>

          {chartData.length > 0 && (
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
              <h2 className="text-xl font-semibold mb-4">Donation activity</h2>
              <ul className="space-y-3 text-sm text-slate-300 max-h-80 overflow-y-auto pr-2">
                {(data.donationHistory ?? []).length === 0 && (
                  <li className="text-slate-500">No rows yet — run a simulated gift from a recommendation card.</li>
                )}
                {(data.donationHistory ?? []).map((d) => (
                  <li key={String(d._id)} className="border-b border-white/5 pb-3">
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
              <h2 className="text-xl font-semibold mb-4">AI recommendation history</h2>
              <ul className="space-y-3 text-sm text-slate-300 max-h-80 overflow-y-auto pr-2">
                {(data.recommendationActivity ?? []).length === 0 && (
                  <li className="text-slate-500">
                    No engine runs logged yet — generate recommendations from the home page.
                  </li>
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
        </>
      )}
    </div>
  );
}
