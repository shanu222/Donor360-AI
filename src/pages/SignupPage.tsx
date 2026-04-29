import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { isFirebaseClientConfigured } from "@/lib/firebase";

export function SignupPage() {
  const { register, loginWithGoogle, loading } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: import("react").FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      await register(name, email, password);
      nav("/dashboard");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Could not sign up");
    }
  }

  async function onGoogle() {
    setErr(null);
    try {
      await loginWithGoogle();
      nav("/dashboard");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Google sign-in failed");
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-semibold mb-2">Create your account</h1>
        <p className="text-slate-400 text-sm mb-8">
          Already registered?{" "}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Log in
          </Link>
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Full name</label>
            <input
              className="w-full rounded-xl bg-slate-900 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-500/50"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Email</label>
            <input
              className="w-full rounded-xl bg-slate-900 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-500/50"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Password</label>
            <input
              className="w-full rounded-xl bg-slate-900 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-500/50"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>
          {err && <p className="text-sm text-red-400">{err}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 font-medium flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Sign up
          </button>
        </form>

        {isFirebaseClientConfigured() && (
          <>
            <div className="flex items-center gap-3 my-8 text-xs text-slate-500">
              <div className="h-px flex-1 bg-white/10" />
              or continue with
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <button
              type="button"
              onClick={onGoogle}
              disabled={loading}
              className="w-full py-3 rounded-xl border border-white/15 hover:bg-white/5 text-sm font-medium disabled:opacity-60"
            >
              Google (Firebase)
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
