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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setInfo(null);
    setPassword("");
    setShowPassword(false);
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
      const e = err as {
        response?: { status?: number; data?: { error?: string } };
        message?: string;
        code?: string;
      };
      const fallback = mode === "signin" ? "Sign in failed" : "Sign up failed";
      // Network failure (server not running, DNS, CORS) — axios sets no `response`.
      if (!e.response) {
        setError(
          "Cannot reach the server. Check your connection and that the API is running."
        );
      } else if (e.response.status === 503) {
        // Server is up but Mongo is down. Show whatever message the server sent.
        setError(
          e.response.data?.error ??
            "Service temporarily unavailable. Please try again in a moment."
        );
      } else {
        setError(e.response.data?.error ?? e.message ?? fallback);
      }
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
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={isSignin ? undefined : 8}
                autoComplete={isSignin ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // `pr-20` reserves room for the Show/Hide toggle.
                // `[&::-ms-reveal]:hidden` suppresses Edge/IE's built-in
                // password-reveal eye so it doesn't overlap our custom button.
                className="w-full rounded-md border border-line bg-bg px-3 py-2 pr-20 text-sm text-ink outline-none focus:border-primary-500 [&::-ms-reveal]:hidden"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={
                  showPassword
                    ? t("login.hidePassword", "Hide password")
                    : t("login.showPassword", "Show password")
                }
                aria-pressed={showPassword}
                title={
                  showPassword
                    ? t("login.hidePassword", "Hide password")
                    : t("login.showPassword", "Show password")
                }
                className="absolute inset-y-0 right-0 my-1 mr-1 inline-flex items-center gap-1 rounded-md border border-line bg-surface px-2 text-xs font-semibold text-ink/80 transition hover:border-primary-300 hover:text-primary-600"
              >
                {showPassword ? (
                  /* Eye-off icon — shown while password is visible */
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a19.6 19.6 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a19.55 19.55 0 0 1-3.07 4.13" />
                    <path d="M1 1l22 22" />
                    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                  </svg>
                ) : (
                  /* Eye icon — shown while password is hidden */
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
                <span>
                  {showPassword
                    ? t("login.hidePassword", "Hide")
                    : t("login.showPassword", "Show")}
                </span>
              </button>
            </div>
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
