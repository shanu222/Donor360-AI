import { Link } from "react-router";
import { motion } from "motion/react";
import { Globe, Construction } from "lucide-react";

export function Resilience360Page() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500/30 to-teal-500/30 border border-green-500/40 flex items-center justify-center">
          <Globe className="w-8 h-8 text-teal-300" />
        </div>
        <h1 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
          Resilience360
        </h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Placeholder hub for the climate &amp; infrastructure companion platform. Donor360 AI already ingests{" "}
          <span className="text-teal-300">Resilience360</span>-tagged programs in its catalog; when Resilience360 goes
          live, this route will deep-link operational dashboards and telemetry.
        </p>
        <div className="inline-flex items-center gap-2 text-amber-300/90 text-sm mb-10">
          <Construction className="w-4 h-4" />
          Public beta URL will be published here.
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl border border-white/15 hover:bg-white/5 text-sm font-medium"
          >
            Back to Donor360
          </Link>
          <a
            href="https://ai-platform-for-women-empowerment.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-sm font-medium text-white"
          >
            Explore She360 (live)
          </a>
        </div>
      </motion.div>
    </div>
  );
}
