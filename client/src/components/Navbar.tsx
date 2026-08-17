import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";
import { SITE } from "@/data/site";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { GenerationAidLogo } from "@/components/Logo";

const NAV_ROUTES: ReadonlyArray<{ to: string; key: string; end?: boolean }> = [
  { to: "/", key: "home", end: true },
  { to: "/about", key: "about" },
  { to: "/programs", key: "programs" },
  { to: "/impact", key: "impact" },
  { to: "/volunteer", key: "getInvolved" },
];

type MenuLink = { to: string; key: string };

const MENUS: Record<string, ReadonlyArray<MenuLink>> = {
  about: [
    { to: "/about#story", key: "story" },
    { to: "/about#mission-vision", key: "missionVision" },
    { to: "/about#team", key: "team" },
    { to: "/about#board", key: "board" },
    { to: "/partners", key: "partners" },
  ],
  programs: [
    { to: "/programs", key: "all" },
    { to: "/programs/computer-literacy", key: "computerLiteracy" },
    { to: "/programs/tailoring", key: "tailoring" },
    { to: "/programs/english", key: "english" },
  ],
  impact: [
    { to: "/blog", key: "blog" },
    { to: "/stories", key: "stories" },
    { to: "/news", key: "news" },
    { to: "/reports", key: "reports" },
  ],
  getInvolved: [
    { to: "/volunteer", key: "volunteer" },
    { to: "/jobs/employers", key: "hireRefugee" },
    { to: "/contact", key: "contact" },
  ],
};

const menuI18nKey = (menuKey: string) => `${menuKey}Menu`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpenMenu, setMobileOpenMenu] = useState<string | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const location = useLocation();
  const { t } = useTranslation();

  const cancelClose = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = (key: string) => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMenu((cur) => (cur === key ? null : cur));
    }, 150);
  };

  useEffect(() => {
    return () => {
      cancelClose();
    };
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpenMenu(null);
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const linkClass = (isActive: boolean) =>
    cn(
      "text-sm font-medium transition-colors hover:text-brand-600 dark:hover:text-brand-400",
      isActive
        ? "text-brand-600 dark:text-brand-400 font-semibold"
        : "text-neutral-heading/90 dark:text-slate-200",
    );

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-border dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t("common.skipToContent")}
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <GenerationAidLogo />
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-neutral-border dark:border-slate-800 bg-brand-50/80 dark:bg-slate-800/80 px-2 py-1 shadow-sm md:flex">
          <Link
            to="/jobs"
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest transition-colors",
              location.pathname.startsWith("/jobs")
                ? "bg-brand-600 dark:bg-brand-500 text-white shadow-sm"
                : "text-neutral-heading/80 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-brand-600 dark:hover:text-brand-400",
            )}
          >
            Generation Jobs
          </Link>
        </div>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {NAV_ROUTES.map((item) => {
            const menu = MENUS[item.key];
            if (menu) {
              const isOpen = openMenu === item.key;
              const isActive = location.pathname === item.to;
              return (
                <div
                  key={item.to}
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenMenu(item.key);
                  }}
                  onMouseLeave={() => scheduleClose(item.key)}
                  onFocus={() => {
                    cancelClose();
                    setOpenMenu(item.key);
                  }}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setOpenMenu((cur) => (cur === item.key ? null : cur));
                    }
                  }}
                >
                  <Link
                    to={item.to}
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    className={cn(
                      "inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-brand-600 dark:hover:text-brand-400",
                      isActive ? "text-brand-600 dark:text-brand-400 font-semibold" : "text-neutral-heading/90 dark:text-slate-200",
                    )}
                  >
                    {t(`nav.${item.key}`)}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                      className={cn(
                        "transition-transform",
                        isOpen && "rotate-180",
                      )}
                    >
                      <path
                        d="M6 8l4 4 4-4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>

                  {isOpen && (
                    <div
                      role="menu"
                      aria-label={t(`nav.${item.key}`)}
                      className="absolute inset-x-0 top-full z-50"
                      onMouseEnter={cancelClose}
                      onMouseLeave={() => scheduleClose(item.key)}
                    >
                      <div className="border-b border-neutral-border dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg">
                        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-1 whitespace-nowrap px-4 py-3 sm:px-6 lg:px-8">
                          {menu.map((link) => (
                            <Link
                              key={link.to}
                              to={link.to}
                              role="menuitem"
                              className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-heading/90 dark:text-slate-200 transition-colors hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400"
                            >
                              {t(`nav.${menuI18nKey(item.key)}.${link.key}`)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => linkClass(isActive)}
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href={SITE.donateUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 dark:bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 dark:hover:bg-brand-400 active:bg-brand-800"
          >
            <svg
              aria-hidden
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21s-7-4.534-9.5-9.07C.94 8.94 2.4 5.5 5.6 5.5c1.74 0 3.41 1 4.4 2.5 1-1.5 2.66-2.5 4.4-2.5 3.2 0 4.66 3.44 3.1 6.43C19 16.466 12 21 12 21z" />
            </svg>
            {t("common.donate")}
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            aria-label={t("nav.toggleMenu")}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-1 inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-heading dark:text-slate-100 hover:bg-brand-50 dark:hover:bg-slate-800"
            onClick={() => setOpen((o) => !o)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
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
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-neutral-border dark:border-slate-800 bg-white dark:bg-slate-900 lg:hidden"
        >
          <div className="space-y-1 px-4 py-3">
            {NAV_ROUTES.map((item) => {
              const menu = MENUS[item.key];
              if (menu) {
                const expanded = mobileOpenMenu === item.key;
                return (
                  <div key={item.to}>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() =>
                        setMobileOpenMenu((cur) =>
                          cur === item.key ? null : item.key,
                        )
                      }
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-neutral-heading dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800"
                    >
                      {t(`nav.${item.key}`)}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden
                        className={cn(
                          "transition-transform",
                          expanded && "rotate-180",
                        )}
                      >
                        <path
                          d="M6 8l4 4 4-4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {expanded && (
                      <div className="mt-1 space-y-1 border-l-2 border-brand-100 dark:border-slate-700 pl-3">
                        <Link
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm font-semibold text-neutral-heading dark:text-slate-100 hover:bg-brand-50 dark:hover:bg-slate-800"
                        >
                          {t(`nav.${item.key}`)}
                        </Link>
                        {menu.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-2 text-sm text-neutral-body dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400"
                          >
                            {t(`nav.${menuI18nKey(item.key)}.${link.key}`)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "block rounded-lg px-3 py-2 text-sm font-medium",
                      isActive
                        ? "bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-brand-400 font-semibold"
                        : "text-neutral-heading dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800",
                    )
                  }
                >
                  {t(`nav.${item.key}`)}
                </NavLink>
              );
            })}
            <a
              href={SITE.donateUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-600 dark:bg-brand-500 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-brand-700 dark:hover:bg-brand-400"
            >
              <svg
                aria-hidden
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21s-7-4.534-9.5-9.07C.94 8.94 2.4 5.5 5.6 5.5c1.74 0 3.41 1 4.4 2.5 1-1.5 2.66-2.5 4.4-2.5 3.2 0 4.66 3.44 3.1 6.43C19 16.466 12 21 12 21z" />
              </svg>
              {t("common.donate")}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
