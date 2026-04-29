import { Link } from "react-router";
import { motion } from "motion/react";
import { LayoutDashboard, Sparkles } from "lucide-react";

export function PlatformAccessPage() {
  return (
    <div className="max-w-lg mx-auto px-6 py-24 text-center">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 mb-6">
          <Sparkles className="w-7 h-7 text-cyan-400" />
        </div>
        <h1 className="text-3xl font-semibold text-white mb-4">Platform access enabled</h1>
        <p className="text-slate-400 leading-relaxed mb-10">
          For demo purposes, all features are currently accessible without login. Use the AI matching tool on the home
          page, explore the public dashboard, and run simulated gifts directly from recommendation cards.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/40 transition-shadow"
        >
          <LayoutDashboard className="w-5 h-5" />
          Go to dashboard
        </Link>
        <p className="mt-8 text-sm text-slate-500">
          <Link to="/" className="text-cyan-400 hover:underline">
            Back to home
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
