import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login, signup } from "@/utils/auth";
import { cn } from "@/utils/cn";
import Section from "@/components/Section";

type Mode = "signin" | "signup";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const redirectTo = (location.state as { from?: string } | null)?.from ?? "/admin";

  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setInfo(null);
    setPassword("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (mode === "signin") {
        await login(email, password);
        navigate(redirectTo, { replace: true });
      } else {
        const { message } = await signup(name, email, password);
        // New accounts are pending; tell the user and flip to sign-in.
        setInfo(
          message ||
            "Account created. An admin must approve it before you can sign in."
        );
        setMode("signin");
        setPassword("");
      }
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
        <h1 className="font-display text-2xl font-bold text-ink">{t("login.staffPortal")}</h1>
        <p className="mt-2 text-sm text-muted">
          {isSignin ? t("login.signinWelcome") : t("login.signupWelcome")}
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
            {t("login.signIn")}
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
            {t("login.signUp")}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {!isSignin && (
            <label className="block">
              <span className="block text-sm font-semibold text-ink">{t("login.fullName")}</span>
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
            <span className="block text-sm font-semibold text-ink">{t("login.emailLabel")}</span>
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
            <span className="block text-sm font-semibold text-ink">{t("login.passwordLabel")}</span>
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
                {t("login.minPassword")}
              </span>
            )}
          </label>

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}
          {info && (
            <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
              {info}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-60"
          >
            {loading
              ? isSignin
                ? t("login.signingIn")
                : t("login.creatingAccount")
              : isSignin
              ? t("login.signIn")
              : t("login.createAccount")}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          <Link to="/" className="hover:text-primary-600">
            {t("login.backToSite")}
          </Link>
        </p>
      </div>
    </Section>
  );
}
