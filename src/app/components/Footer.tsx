import { Link } from "react-router";
import { Network, Mail, Linkedin, Twitter, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                <Network className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl text-white">Donor360 AI</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              AI-powered donor intelligence with a real catalog, scoring engine, and accountable simulation layer.
            </p>
          </div>

          <div>
            <h4 className="text-sm text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#finder" className="hover:text-cyan-400 transition-colors">
                  Recommendation finder
                </a>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/research" className="hover:text-cyan-400 transition-colors">
                  Research &amp; methodology
                </Link>
              </li>
              <li>
                <span className="text-slate-500">REST catalog: GET /api/projects</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm text-white mb-4">Ecosystem</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a
                  href="https://ai-platform-for-women-empowerment.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  She360 (live)
                </a>
              </li>
              <li>
                <Link to="/resilience360" className="hover:text-cyan-400 transition-colors">
                  Resilience360 hub
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-cyan-400 transition-colors">
                  Platform access note
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm text-white mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-slate-400 mb-4">
              <li>
                <a href="mailto:hello@donor360.ai" className="hover:text-cyan-400 transition-colors">
                  hello@donor360.ai
                </a>
              </li>
              <li>
                <Link to="/research" className="hover:text-cyan-400 transition-colors">
                  Due diligence pack
                </Link>
              </li>
            </ul>
            <div className="flex gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center opacity-40">
                <Twitter className="w-4 h-4 text-slate-400" />
              </span>
              <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center opacity-40">
                <Linkedin className="w-4 h-4 text-slate-400" />
              </span>
              <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center opacity-40">
                <Github className="w-4 h-4 text-slate-400" />
              </span>
              <a
                href="mailto:hello@donor360.ai"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500/30 transition-all"
              >
                <Mail className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">© 2026 Donor360 AI. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-400">
            <span className="opacity-60">Privacy (template)</span>
            <span className="opacity-60">Terms (template)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
