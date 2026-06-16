import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";
import { SITE } from "@/data/site";
import { isAuthenticated } from "@/utils/auth";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

/**
 * Top-level routes shown in the primary nav. Labels are looked up at render
 * time from the active i18n bundle so a language change re-renders instantly.
 */
const NAV_ROUTES: ReadonlyArray<{ to: string; key: string; end?: boolean }> = [
  { to: "/", key: "home", end: true },
  { to: "/about", key: "about" },
  { to: "/programs", key: "programs" },
  { to: "/impact", key: "impact" },
  { to: "/stories", key: "stories" },
  { to: "/blog", key: "blog" },
  { to: "/partners", key: "partners" },
  { to: "/contact", key: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const loggedIn = isAuthenticated();
  const portalHref = loggedIn ? "/admin" : "/login";
  const portalLabel = loggedIn ? t("nav.admin") : t("nav.staffPortal");

  const linkClass = (isActive: boolean) =>
    cn(
      "text-sm font-medium transition-colors hover:text-primary-600",
      isActive ? "text-primary-600" : "text-ink/80"
    );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      {/* Skip-to-content link for keyboard and screen-reader users. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t("common.skipToContent")}
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img
            src="/logo.jpg"
            alt="Generation Aid"
            className="h-10 w-10 rounded-md object-contain"
          />
          <span className="font-display text-xl font-semibold text-ink">Generation Aid</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {NAV_ROUTES.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => linkClass(isActive)}
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <NavLink to={portalHref} className={({ isActive }) => linkClass(isActive)}>
            {portalLabel}
          </NavLink>
          <a
            href={SITE.donateUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-ink shadow-sm transition hover:bg-accent-600 hover:text-white"
          >
            {t("common.donate")}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            aria-label={t("nav.toggleMenu")}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="rounded-md p-2 text-ink"
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-line bg-surface lg:hidden"
        >
          <div className="space-y-1 px-4 py-3">
            {NAV_ROUTES.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block rounded-md px-3 py-2 text-sm font-medium",
                    isActive
                      ? "bg-primary-50 text-primary-600"
                      : "text-ink/80 hover:bg-bg"
                  )
                }
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
            <NavLink
              to={portalHref}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "block rounded-md px-3 py-2 text-sm font-medium",
                  isActive
                    ? "bg-primary-50 text-primary-600"
                    : "text-ink/80 hover:bg-bg"
                )
              }
            >
              {portalLabel}
            </NavLink>
            <a
              href={SITE.donateUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 block w-full rounded-md bg-accent-500 px-4 py-2 text-center text-sm font-semibold text-ink"
            >
              {t("common.donate")}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
