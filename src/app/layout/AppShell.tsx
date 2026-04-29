import { Link, NavLink, Outlet } from "react-router";
import { Network, Menu, X } from "lucide-react";
import { useState } from "react";
import { Toaster } from "sonner";
import { useAuth } from "@/context/AuthContext";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${isActive ? "text-cyan-400" : "text-slate-300 hover:text-white"}`;

export function AppShell() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
              <Network className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold tracking-tight">Donor360 AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <NavLink to="/research" className={linkClass}>
              Research
            </NavLink>
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/resilience360" className={linkClass}>
              Resilience360
            </NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-xs text-slate-400 max-w-[140px] truncate">{user.email}</span>
                <button
                  type="button"
                  onClick={logout}
                  className="px-4 py-2 rounded-lg border border-white/15 text-sm hover:bg-white/5"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm text-slate-300 hover:text-white"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg text-sm bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg border border-white/10"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-3 bg-slate-950">
            <NavLink to="/" className={linkClass} end onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/research" className={linkClass} onClick={() => setOpen(false)}>
              Research
            </NavLink>
            <NavLink to="/dashboard" className={linkClass} onClick={() => setOpen(false)}>
              Dashboard
            </NavLink>
            <NavLink to="/resilience360" className={linkClass} onClick={() => setOpen(false)}>
              Resilience360
            </NavLink>
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              {user ? (
                <>
                  <span className="text-xs text-slate-400">{user.email}</span>
                  <button type="button" onClick={() => { logout(); setOpen(false); }} className="text-left text-sm">
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm" onClick={() => setOpen(false)}>
                    Log in
                  </Link>
                  <Link to="/signup" className="text-sm text-cyan-400" onClick={() => setOpen(false)}>
                    Sign up
                  </Link>
                </>
              )}
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
