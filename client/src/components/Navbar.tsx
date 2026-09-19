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
    { to: "/partners", key: "partners" },
  ],
  programs: [
    { to: "/programs", key: "all" },
    { to: "/programs/learning-through-play", key: "learningThroughPlay" },
    { to: "/programs/women-in-ai", key: "womenInAi" },
    { to: "/programs/storytelling", key: "storytelling" },
    { to: "/programs/creative-arts", key: "creativeArts" },
    { to: "/programs/climate-action", key: "climateAction" },
    { to: "/programs/social-emotional-learning", key: "socialEmotionalLearning" },
    { to: "/programs/advocacy", key: "advocacy" },
    { to: "/programs/english-language-literacy", key: "englishLanguageLiteracy" },
    { to: "/programs/womens-digital-skills", key: "womensDigitalSkills" },
    { to: "/programs/computer-literacy-skills", key: "computerLiteracySkills" },
  ],
  impact: [
    { to: "/blog", key: "blog" },
    { to: "/stories", key: "stories" },
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
    const timer = setTimeout(() => {
      setOpenMenu(null);
      setMobileOpenMenu(null);
      setOpen(false);
    }, 0);
    return () => clearTimeout(timer);
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
      "relative text-sm font-bold tracking-tight transition-colors py-1",
      isActive
        ? "text-brand-600 dark:text-brand-400 after:absolute after:bottom-0 after:left-0 after:h-[2.5px] after:w-full after:bg-brand-600 dark:after:bg-brand-400"
        : "text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 after:absolute after:bottom-0 after:left-0 after:h-[2.5px] after:w-full after:scale-x-0 after:bg-brand-600 dark:after:bg-brand-400 hover:after:scale-x-100 after:transition-transform after:duration-300",
    );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xs transition-colors">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t("common.skipToContent")}
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2.5 transition-transform hover:opacity-90"
            onClick={() => setOpen(false)}
          >
            <GenerationAidLogo />
          </Link>

          <div className="hidden items-center gap-1.5 rounded-full border border-brand-200/80 dark:border-slate-800 bg-brand-50/80 dark:bg-slate-800/80 p-1 shadow-2xs md:flex">
            <Link
              to="/jobs"
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider transition-all",
                location.pathname.startsWith("/jobs")
                  ? "bg-brand-600 dark:bg-brand-500 text-white shadow-xs"
                  : "text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-brand-600 dark:hover:text-brand-400",
              )}
            >
              Generation Jobs
            </Link>
          </div>
        </div>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV_ROUTES.map((item) => {
            const menu = MENUS[item.key];
            if (menu) {
              const isOpen = openMenu === item.key;
              const isActive = location.pathname === item.to;
              return (
                <div
                  key={item.to}
                  className="relative py-1"
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
                      "inline-flex items-center gap-1 text-sm font-bold tracking-tight transition-colors",
                      isActive
                        ? "text-brand-600 dark:text-brand-400"
                        : "text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400",
                    )}
                  >
                    {t(`nav.${item.key}`)}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden
                      className={cn(
                        "transition-transform duration-200 text-brand-600 dark:text-brand-400",
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
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 min-w-[220px]"
                      onMouseEnter={cancelClose}
                      onMouseLeave={() => scheduleClose(item.key)}
                    >
                      <div className="overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl border-t-4 border-t-brand-600 dark:border-t-brand-500 p-2 space-y-1">
                        {menu.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            role="menuitem"
                            className="flex items-center justify-between rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors hover:bg-brand-50/80 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 group/item"
                          >
                            <span>{t(`nav.${menuI18nKey(item.key)}.${link.key}`)}</span>
                            <span className="text-brand-600 dark:text-brand-400 opacity-0 -translate-x-1 transition-all group-hover/item:opacity-100 group-hover/item:translate-x-0">
                              →
                            </span>
                          </Link>
                        ))}
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
            className="sir-btn-primary px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider"
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
            <span>{t("common.donate")}</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
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
            className="-mr-1 inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-800 dark:text-slate-100 hover:bg-brand-50 dark:hover:bg-slate-800"
            onClick={() => setOpen((o) => !o)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
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
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 lg:hidden"
        >
          <div className="space-y-1 px-4 py-4">
            <div className="mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Link
                to="/jobs"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg bg-brand-50 dark:bg-slate-800 p-3 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider"
              >
                <span>Explore Generation Jobs</span>
                <span>→</span>
              </Link>
            </div>
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
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-bold text-slate-800 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800"
                    >
                      {t(`nav.${item.key}`)}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden
                        className={cn(
                          "transition-transform text-brand-600 dark:text-brand-400",
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
                      <div className="mt-1 space-y-1 border-l-2 border-brand-600 dark:border-brand-500 pl-3 ml-2">
                        <Link
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm font-bold text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-800"
                        >
                          {t(`nav.${item.key}`)} Overview
                        </Link>
                        {menu.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400"
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
                      "block rounded-lg px-3 py-2.5 text-sm font-bold",
                      isActive
                        ? "bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-brand-400"
                        : "text-slate-800 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800",
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
              className="gatsby-btn-primary w-full mt-3 py-3 text-xs uppercase tracking-wider"
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
              <span>{t("common.donate")}</span>
              <span>→</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

