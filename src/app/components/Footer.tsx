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
              AI-powered impact intelligence for strategic philanthropy
            </p>
          </div>

          <div>
            <h4 className="text-sm text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Impact Stories</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Data Sources</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Research</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm text-white mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-slate-400 mb-4">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Partner With Us</a></li>
            </ul>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500/30 transition-all">
                <Twitter className="w-4 h-4 text-slate-400" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500/30 transition-all">
                <Linkedin className="w-4 h-4 text-slate-400" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500/30 transition-all">
                <Github className="w-4 h-4 text-slate-400" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500/30 transition-all">
                <Mail className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © 2026 Donor360 AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
