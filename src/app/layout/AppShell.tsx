import { Link, NavLink, Outlet } from "react-router";
import { Network, Menu, X } from "lucide-react";
import { useState } from "react";
import { Toaster } from "sonner";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${isActive ? "text-cyan-400" : "text-slate-300 hover:text-white"}`;

export function AppShell() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="bg-gradient-to-r from-cyan-950/90 via-slate-900 to-teal-950/90 border-b border-cyan-500/20 px-4 py-2 text-center text-sm text-cyan-100/95">
        <span className="font-medium">Demo mode:</span> open-access platform — no login required. All tools and the
        dashboard are available immediately.
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
              <Network className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold tracking-tight">Donor360 AI</span>
            <span className="hidden sm:inline-flex text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-200 border border-teal-500/30">
              Live demo
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <a href="/#finder" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              AI matching
            </a>
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
            <a href="/dashboard#impact" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Impact
            </a>
            <NavLink to="/research" className={linkClass}>
              Research
            </NavLink>
            <a href="/#ecosystem" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Ecosystem
            </a>
            <NavLink to="/resilience360" className={linkClass}>
              Resilience360
            </NavLink>
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <a
              href="/#finder"
              className="px-4 py-2 rounded-lg text-sm text-slate-200 border border-white/15 hover:bg-white/5 transition-colors"
            >
              Explore platform
            </a>
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg text-sm bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium"
            >
              Dashboard
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 rounded-lg border border-white/10"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-3 bg-slate-950">
            <NavLink to="/" className={linkClass} end onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <a href="/#finder" className="text-sm text-slate-300" onClick={() => setOpen(false)}>
              AI matching
            </a>
            <NavLink to="/dashboard" className={linkClass} onClick={() => setOpen(false)}>
              Dashboard
            </NavLink>
            <a href="/dashboard#impact" className="text-sm text-slate-300" onClick={() => setOpen(false)}>
              Impact
            </a>
            <NavLink to="/research" className={linkClass} onClick={() => setOpen(false)}>
              Research
            </NavLink>
            <a href="/#ecosystem" className="text-sm text-slate-300" onClick={() => setOpen(false)}>
              Ecosystem
            </a>
            <NavLink to="/resilience360" className={linkClass} onClick={() => setOpen(false)}>
              Resilience360
            </NavLink>
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <a href="/#finder" className="text-sm text-cyan-300" onClick={() => setOpen(false)}>
                Explore platform
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>
      <Toaster richColors theme="dark" position="top-center" />
    </div>
  );
}
