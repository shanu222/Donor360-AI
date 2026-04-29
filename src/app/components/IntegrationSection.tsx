import { motion } from "motion/react";
import { Link } from "react-router";
import { Network, ArrowRight, ExternalLink } from "lucide-react";

const cards = [
  {
    name: "She360",
    description: "Women empowerment intelligence — live companion experience.",
    emoji: "👩",
    href: "https://ai-platform-for-women-empowerment.vercel.app",
    external: true,
    gradient: "from-pink-500/20 to-purple-500/20",
    border: "border-pink-500/30",
  },
  {
    name: "Donor360 AI",
    description: "Impact matching hub (this platform) with API-backed recommendations.",
    emoji: "🎯",
    href: "/",
    external: false,
    gradient: "from-cyan-500/30 to-teal-500/30",
    border: "border-cyan-500/50",
  },
  {
    name: "Resilience360",
    description: "Climate & infrastructure resilience — roadmap placeholder inside Donor360.",
    emoji: "🌍",
    href: "/resilience360",
    external: false,
    gradient: "from-green-500/20 to-teal-500/20",
    border: "border-green-500/30",
  },
];

const cardClassName =
  "group relative rounded-2xl border bg-slate-900/70 backdrop-blur-xl p-8 text-center hover:border-cyan-400/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 block";

export function IntegrationSection() {
  return (
    <section className="relative py-24 px-6 bg-slate-950/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Connected Ecosystem
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Federated impact intelligence: women&apos;s empowerment, climate resilience, and donor capital linked
            through shared scoring primitives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cards.map((card, index) => {
            const inner = (
              <>
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-3xl`}
                >
                  {card.emoji}
                </div>
                <h3 className="text-xl mb-2 text-white flex items-center justify-center gap-2">
                  {card.name}
                  {card.external ? (
                    <ExternalLink className="w-4 h-4 text-cyan-300" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-cyan-300" />
                  )}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{card.description}</p>
              </>
            );

            return (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                {card.external ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${cardClassName} ${card.border}`}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link to={card.href} className={`${cardClassName} ${card.border}`}>
                    {inner}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-14 max-w-3xl mx-auto rounded-2xl border border-white/10 bg-slate-900/60 p-6 flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-slate-400"
        >
          <Network className="w-6 h-6 text-cyan-400" />
          <span>She360 + Resilience360 feeds</span>
          <ArrowRight className="w-4 h-4 hidden md:block" />
          <span className="text-cyan-300">Donor360 scoring + explainers</span>
          <ArrowRight className="w-4 h-4 hidden md:block" />
          <span className="text-teal-300">Fundable portfolio view</span>
        </motion.div>
      </div>
    </section>
  );
}
