import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login, signup } from "@/utils/auth";
import { cn } from "@/utils/cn";
import Section from "@/components/Section";

type Mode = "signin" | "signup";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as { from?: string } | null)?.from ?? "/admin/videos";

  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setPassword("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signin") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const e = err as { response?: { data?: { error?: string } }; message?: string };
      const fallback = mode === "signin" ? "Sign in failed" : "Sign up failed";
      setError(e.response?.data?.error ?? e.message ?? fallback);
    } finally {
      setLoading(false);
    }
  }

  const isSignin = mode === "signin";

  return (
    <Section className="!pt-20">
      <div className="mx-auto max-w-md rounded-2xl border border-line bg-surface p-8 shadow-sm">
        <h1 className="font-display text-2xl font-bold text-ink">Staff portal</h1>
        <p className="mt-2 text-sm text-muted">
          {isSignin
            ? "Welcome back. Sign in to manage content."
            : "Create a staff account. New accounts default to editor access."}
        </p>

        {/* Tabs */}
        <div className="mt-6 grid grid-cols-2 rounded-md border border-line bg-bg p-1 text-sm font-semibold">
          <button
            type="button"
            onClick={() => switchMode("signin")}
            className={cn(
              "rounded px-3 py-2 transition",
              isSignin
                ? "bg-primary-500 text-white shadow-sm"
                : "text-muted hover:text-ink"
            )}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => switchMode("signup")}
            className={cn(
              "rounded px-3 py-2 transition",
              !isSignin
                ? "bg-primary-500 text-white shadow-sm"
                : "text-muted hover:text-ink"
            )}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {!isSignin && (
            <label className="block">
              <span className="block text-sm font-semibold text-ink">Full name</span>
              <input
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
              />
            </label>
          )}

          <label className="block">
            <span className="block text-sm font-semibold text-ink">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-semibold text-ink">Password</span>
            <input
              type="password"
              required
              minLength={isSignin ? undefined : 8}
              autoComplete={isSignin ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
            {!isSignin && (
              <span className="mt-1 block text-xs text-muted">
                Minimum 8 characters.
              </span>
            )}
          </label>

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-60"
          >
            {loading
              ? isSignin
                ? "Signing in…"
                : "Creating account…"
              : isSignin
              ? "Sign in"
              : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          <Link to="/" className="hover:text-primary-600">
            ← Back to site
          </Link>
        </p>
      </div>
    </Section>
  );
}
