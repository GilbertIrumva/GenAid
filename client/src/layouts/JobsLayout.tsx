import { useEffect } from "react";
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
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname, location.hash]);

  return (
    <div className="jobs-experience flex min-h-screen flex-col bg-white dark:bg-slate-900 text-neutral-body dark:text-slate-300 transition-colors">
      <header className="sticky top-0 z-40 border-b border-neutral-border dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/jobs" className="flex shrink-0 items-center gap-2.5">
            <img
              src="/logo.jpg"
              alt="Generation Jobs logo"
              className="h-10 w-10 shrink-0 rounded-xl border border-neutral-border dark:border-slate-700 object-cover shadow-xs"
            />
            <div className="hidden sm:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-600 dark:text-brand-400 leading-none">
                Generation Jobs
              </p>
              <p className="text-xs font-semibold text-neutral-heading dark:text-slate-100 mt-0.5 whitespace-nowrap">
                Talent Placement Arm
              </p>
            </div>
          </Link>

          <nav
            aria-label="Generation Jobs main"
            className="flex shrink-0 items-center gap-1.5 sm:gap-2 overflow-x-auto py-1"
          >
            {JOBS_NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors sm:px-4 sm:text-sm",
                    isActive
                      ? "border-brand-600 dark:border-brand-500 bg-brand-600 dark:bg-brand-500 text-white shadow-xs"
                      : "border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 text-neutral-heading dark:text-slate-200 hover:border-brand-600 dark:hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-700",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              to="/"
              className="whitespace-nowrap rounded-full border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-heading dark:text-slate-200 transition-colors hover:border-brand-600 dark:hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-700 sm:px-4"
            >
              Main Site
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <JobsFooter />
    </div>
  );
}
