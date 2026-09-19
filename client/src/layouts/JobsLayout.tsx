import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import JobsFooter from "@/components/JobsFooter";
import { cn } from "@/utils/cn";

const JOBS_NAV = [
  { to: "/jobs", label: "Overview", end: true },
  { to: "/jobs/talent", label: "Talent Model", end: false },
  { to: "/jobs/employers", label: "For Employers", end: false },
  { to: "/jobs/opportunities", label: "Services & Pricing", end: false },
];

export default function JobsLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="jobs-experience flex min-h-screen flex-col bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors w-full max-w-full overflow-x-clip">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xs w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-3 px-3.5 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          <Link
            to="/jobs"
            className="flex min-w-0 items-center gap-2 sm:gap-3 group"
            onClick={() => setOpen(false)}
          >
            <img
              src="/logo.jpg"
              alt="Generation Jobs logo"
              className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 rounded-xl border border-brand-200 dark:border-slate-700 object-cover shadow-xs group-hover:scale-105 transition-transform"
            />
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.16em] sm:tracking-[0.25em] text-brand-600 dark:text-brand-400 leading-tight truncate">
                Generation Jobs
              </p>
              <p className="hidden sm:block text-[11px] sm:text-xs font-semibold text-slate-900 dark:text-slate-100 mt-0.5 truncate">
                Talent Placement Arm
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Generation Jobs main"
            className="hidden md:flex items-center gap-1.5 lg:gap-2"
          >
            {JOBS_NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "whitespace-nowrap rounded-lg px-3 py-1.5 text-xs lg:text-sm font-bold tracking-tight transition-all",
                    isActive
                      ? "bg-brand-600 dark:bg-brand-500 text-white shadow-xs"
                      : "text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Controls & CTA */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            <LanguageSwitcher className="hidden sm:inline-flex" />
            <ThemeToggle />

            <Link
              to="/contact?subject=Talent+Request"
              className="sir-btn-primary px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider hidden lg:inline-flex"
            >
              <span>Request Talent</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>

            <Link
              to="/"
              className="sir-btn-secondary px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider hidden sm:inline-flex"
            >
              <span>Main Site</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="jobs-mobile-nav"
              className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg text-slate-800 dark:text-slate-100 hover:bg-brand-50 dark:hover:bg-slate-800 md:hidden"
              onClick={() => setOpen((prev) => !prev)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden
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

        {/* Mobile Navigation Drawer */}
        {open && (
          <nav
            id="jobs-mobile-nav"
            aria-label="Generation Jobs Mobile Navigation"
            className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl md:hidden"
          >
            <div className="space-y-3 p-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Language
                </span>
                <LanguageSwitcher />
              </div>

              <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg bg-slate-100 dark:bg-slate-800 px-3.5 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200"
                >
                  <span className="flex items-center gap-1.5">
                    <span>←</span>
                    <span>Back to Generation Aid Main Site</span>
                  </span>
                </Link>
              </div>

              <div className="space-y-1">
                {JOBS_NAV.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-bold transition-all",
                        isActive
                          ? "bg-brand-600 text-white shadow-xs"
                          : "text-slate-800 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800",
                      )
                    }
                  >
                    <span>{item.label}</span>
                    <span className="text-xs opacity-70">→</span>
                  </NavLink>
                ))}
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <Link
                  to="/contact?subject=Talent+Request"
                  onClick={() => setOpen(false)}
                  className="sir-btn-primary w-full py-3 text-xs uppercase tracking-wider justify-center"
                >
                  <span>Request Talent</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>

      <main id="main-content" className="flex-1 w-full max-w-full overflow-x-clip">
        <Outlet />
      </main>

      <JobsFooter />
    </div>
  );
}

