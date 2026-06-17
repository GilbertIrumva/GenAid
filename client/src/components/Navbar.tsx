import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";
import { SITE } from "@/data/site";
import { isAuthenticated } from "@/utils/auth";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

/**
 * Top-level routes shown in the primary nav. Labels are looked up at render
 * time from the active i18n bundle so a language change re-renders instantly.
 *
 * Entries whose `key` appears in MENUS below expand into a hover dropdown.
 * The dropdown sub-items are defined in MENUS and rendered both in the desktop
 * dropdown panel and the mobile disclosure section.
 */
const NAV_ROUTES: ReadonlyArray<{ to: string; key: string; end?: boolean }> = [
  { to: "/", key: "home", end: true },
  { to: "/about", key: "about" },
  { to: "/programs", key: "programs" },
  { to: "/impact", key: "impact" },
  { to: "/contact", key: "contact" },
];

type MenuLink = { to: string; key: string };

/**
 * Dropdown configuration. Each entry is keyed by the parent nav route's `key`
 * and lists its sub-links. i18n labels live under `nav.<menuKey>Menu.<key>`.
 */
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
};

/** i18n key fragment for a menu's sub-items: e.g. `aboutMenu`, `impactMenu`. */
const menuI18nKey = (menuKey: string) => `${menuKey}Menu`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // Tracks which desktop dropdown is currently open (only one at a time).
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // Tracks which mobile disclosure panel is expanded.
  const [mobileOpenMenu, setMobileOpenMenu] = useState<string | null>(null);
  // Pending close timer — gives the cursor a brief grace period to cross from
  // the trigger to the absolute-positioned panel (or back) without the menu
  // disappearing. Cleared whenever the cursor re-enters the trigger or panel.
  const closeTimerRef = useRef<number | null>(null);
  const location = useLocation();
  const { t } = useTranslation();
  const loggedIn = isAuthenticated();
  const portalHref = loggedIn ? "/admin" : "/login";
  const portalLabel = loggedIn ? t("nav.admin") : t("nav.staffPortal");

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
      closeTimerRef.current = null;
    }, 150);
  };

  // Clean up any pending timer on unmount.
  useEffect(() => () => cancelClose(), []);

  // Close the open dropdown on Escape. The menus are hover-driven so the
  // wrapper's `onMouseLeave` handles pointer-out — Escape covers keyboard.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  // Close dropdowns whenever the route changes (e.g. after picking a sub-link).
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpenMenu(null);
    setOpen(false);
  }, [location.pathname, location.hash]);

  // Lock body scroll while the mobile drawer is open so the page underneath
  // doesn't scroll when the user pans the menu. The flag is removed on close
  // and on unmount so we never leave the document in a frozen state.
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
      "text-sm font-medium transition-colors hover:text-primary-600",
      isActive ? "text-primary-600" : "text-ink/80"
    );

  return (
    <header className="sticky top-0 z-40 border-b border-line backdrop-blur">
      {/* Background layer — isolated and clipped here so the decorative
          images can't bleed past the header, while the header itself
          stays un-clipped so dropdown panels can overflow downward. */}
      <div aria-hidden className="absolute inset-0 -z-10 isolate overflow-hidden">
        {/* Background photo — keeps the header visually consistent with the
            footer. Held to a low opacity so nav links stay legible; even
            lower in dark mode to avoid over-brightening the chrome. */}
        <img
          src="/img/site/bg.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-25 dark:opacity-15"
        />
        {/* Wash overlay using the semantic `surface` token, which flips between
            white (light) and #0f1b2e (dark), so the header reads correctly in
            both modes without needing a separate dark variant. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/80 to-surface/95"
        />
        {/* Subtle brand-blue glow that adapts via primary-300 → still readable
            in both themes. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(ellipse_at_center,theme(colors.primary.300),transparent_65%)] dark:opacity-20"
        />
      </div>

      {/* Skip-to-content link for keyboard and screen-reader users. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t("common.skipToContent")}
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <img
            src="/logo.jpg"
            alt="Generation Aid"
            className="h-9 w-9 shrink-0 rounded-md object-contain sm:h-10 sm:w-10"
          />
          <span className="truncate font-display text-base font-semibold text-ink sm:text-lg lg:text-xl">
            Generation Aid
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {NAV_ROUTES.map((item) => {
            const menu = MENUS[item.key];
            if (menu) {
              const isOpen = openMenu === item.key;
              const isActive = location.pathname === item.to;
              return (
                <div
                  key={item.to}
                  // Trigger wrapper is intentionally not `relative` — the
                  // dropdown panel below uses absolute positioning anchored
                  // to the header so it can span the full viewport width.
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
                    // Only close when focus leaves the whole wrapper.
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
                      "inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary-600",
                      isActive ? "text-primary-600" : "text-ink/80"
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
                      className={cn("transition-transform", isOpen && "rotate-180")}
                    >
                      <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>

                  {isOpen && (
                    <div
                      role="menu"
                      aria-label={t(`nav.${item.key}`)}
                      // Absolute against the sticky <header> (sticky elements
                      // act as positioning parents for absolute children), so
                      // the panel spans the full header width = full viewport
                      // width. `z-50` keeps it above page content.
                      className="absolute inset-x-0 top-full z-50"
                      // Hovering the panel keeps it open (cancels the pending
                      // close timer scheduled by the trigger's mouseleave),
                      // and leaving the panel re-arms the close.
                      onMouseEnter={cancelClose}
                      onMouseLeave={() => scheduleClose(item.key)}
                    >
                      <div className="border-b border-line bg-surface shadow-lg ring-1 ring-black/5">
                        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-1 whitespace-nowrap px-4 py-3 sm:px-6 lg:px-8">
                          {menu.map((link) => (
                            <Link
                              key={link.to}
                              to={link.to}
                              role="menuitem"
                              className="rounded-md px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-bg hover:text-primary-600"
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
          <NavLink to={portalHref} className={({ isActive }) => linkClass(isActive)}>
            {portalLabel}
          </NavLink>
          <a
            href={SITE.donateUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-red-700"
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
            className="-mr-1 inline-flex h-11 w-11 items-center justify-center rounded-md text-ink hover:bg-bg"
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
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-surface lg:hidden"
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
                        setMobileOpenMenu((cur) => (cur === item.key ? null : item.key))
                      }
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-ink/80 hover:bg-bg"
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
                        className={cn("transition-transform", expanded && "rotate-180")}
                      >
                        <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {expanded && (
                      <div className="mt-1 space-y-1 border-l border-line pl-3">
                        <Link
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className="block rounded-md px-3 py-2 text-sm font-semibold text-ink hover:bg-bg"
                        >
                          {t(`nav.${item.key}`)}
                        </Link>
                        {menu.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setOpen(false)}
                            className="block rounded-md px-3 py-2 text-sm text-ink/80 hover:bg-bg hover:text-primary-600"
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
                      "block rounded-md px-3 py-2 text-sm font-medium",
                      isActive
                        ? "bg-primary-50 text-primary-600"
                        : "text-ink/80 hover:bg-bg"
                    )
                  }
                >
                  {t(`nav.${item.key}`)}
                </NavLink>
              );
            })}
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
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md bg-brand-red-600 px-4 py-2 text-center text-sm font-semibold text-white"
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
      {/* Brand stripe — the only place red appears in the chrome. Ties the
          logo's red into the global header without overpowering blue. */}
      <div aria-hidden className="h-[2px] w-full bg-brand-red-600" />
    </header>
  );
}
