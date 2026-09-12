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
    <div className="jobs-experience flex min-h-screen flex-col bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/jobs" className="flex shrink-0 items-center gap-3 group">
            <img
              src="/logo.jpg"
              alt="Generation Jobs logo"
              className="h-10 w-10 shrink-0 rounded-xl border border-brand-200 dark:border-slate-700 object-cover shadow-xs group-hover:scale-105 transition-transform"
            />
            <div className="hidden sm:block">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400 leading-none">
                Generation Jobs
              </p>
              <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100 mt-1 whitespace-nowrap">
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
                    "whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-bold tracking-tight transition-all",
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

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              to="/contact?subject=Talent+Request"
              className="sir-btn-primary px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider hidden sm:inline-flex"
            >
              <span>Request Talent</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/"
              className="sir-btn-secondary px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider"
            >
              <span>Main Site</span>
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

