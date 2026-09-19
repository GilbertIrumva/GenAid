import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Section from "@/components/Section";
import JobsShell from "@/components/JobsShell";
import { servicePackages, type ServiceCategory } from "@/data/jobsBoard";
import { useSEO } from "@/utils/useSEO";

const filters: Array<"All" | ServiceCategory> = [
  "All",
  "Sales & Outbound",
  "Social Engagement",
  "Social & SEO",
  "Campaigns",
  "Web Support",
  "E-Commerce",
  "Data & AI",
  "Virtual Assistance",
];

const roadmap = [
  {
    week: "Week 1",
    title: "Discovery and scoping",
    body: "Align on project needs, success metrics, and team structure.",
  },
  {
    week: "Week 2",
    title: "Talent matching",
    body: "Match vetted multilingual talent to your specific workflow and role requirements.",
  },
  {
    week: "Week 3",
    title: "Pilot launch",
    body: "Start execution with project management, QA, and clear KPI tracking.",
  },
];

export default function JobsOpportunities() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");

  const packages = useMemo(
    () =>
      activeFilter === "All"
        ? servicePackages
        : servicePackages.filter((item) => item.category === activeFilter),
    [activeFilter],
  );

  useSEO({
    title: "Generation Jobs | Services and Pricing",
    description:
      "Explore Generation Jobs service packages, pilot pricing ($0 Month 1, $250 Month 2), and the 3-week onboarding roadmap for global employers.",
  });

  return (
    <JobsShell
      eyebrow="Services and pricing"
      title="Operational packages built for growth"
      subtitle="Start with Month 1 at $0 and Month 2 at $250 with transparent scope and measurable KPIs."
    >
      {/* PACKAGES (Pattern A: Canvas) */}
      <Section pattern="canvas" className="!pt-4 sm:!pt-6">
        <div className="sir-callout-border mb-6">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
            Choose the service package that fits your needs. Start with <strong className="text-brand-700 dark:text-brand-400">Month 1 at $0 (Free)</strong> and <strong className="text-brand-700 dark:text-brand-400">Month 2 at $250</strong>. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="mb-6 sm:mb-8 flex items-center gap-2 overflow-x-auto pb-2 w-full max-w-full sm:flex-wrap no-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={
                activeFilter === filter
                  ? "whitespace-nowrap shrink-0 rounded-full bg-brand-600 dark:bg-brand-500 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm"
                  : "whitespace-nowrap shrink-0 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:border-brand-600 dark:hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400"
              }
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {packages.map((pkg) => (
            <article
              key={pkg.slug}
              className="sir-card-accent p-5 sm:p-6 flex flex-col justify-between"
            >
              <div>
                <span className="sir-tag">
                  {pkg.category}
                </span>
                <h2 className="mt-3 font-serif text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                  {pkg.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {pkg.description}
                </p>
                <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                  {pkg.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 sm:mt-2 h-1.5 w-1.5 rounded-full bg-brand-600 dark:bg-brand-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="mt-6 rounded-2xl border border-blue-100 dark:border-slate-800 bg-gradient-to-br from-brand-50/80 to-blue-50/40 dark:from-slate-950/80 dark:to-slate-900/60 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                      Pilot Pricing
                    </p>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3 text-center">
                    <div className="rounded-xl bg-white dark:bg-slate-900 p-3 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-center">
                      <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">Month 1</p>
                      <p className="text-base sm:text-lg font-black text-brand-600 dark:text-brand-400">${pkg.firstMonthPrice}</p>
                      <p className="text-[10px] font-bold text-brand-700 dark:text-brand-400">100% Free</p>
                    </div>
                    <div className="rounded-xl bg-white dark:bg-slate-900 p-3 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-center">
                      <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">Month 2</p>
                      <p className="text-base sm:text-lg font-black text-brand-600 dark:text-brand-400">${pkg.secondMonthPrice}</p>
                      <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Pilot Rate</p>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-200">
                  Impact: {pkg.impact}
                </p>
              </div>
            </article>
          ))}
        </div>

        {packages.length === 0 && (
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center text-slate-500 shadow-sm">
            No packages match this filter yet.
          </div>
        )}
      </Section>

      {/* ROADMAP (White background with blue container card) */}
      <section className="relative isolate overflow-hidden bg-white dark:bg-slate-900 py-12 sm:py-20 transition-colors border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-brand-600 dark:bg-brand-900 p-5 sm:p-8 lg:p-12 border border-brand-700 shadow-2xl text-white">
            <span className="inline-block rounded-md bg-white/20 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white border border-white/30 backdrop-blur-sm">
              Your 3-week roadmap
            </span>
            <h2 className="mt-4 font-serif text-2xl sm:text-3xl font-extrabold tracking-tight !text-white sm:text-4xl lg:text-5xl break-words">
              Start your impact journey with us
            </h2>

            <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 sm:grid-cols-3">
              {roadmap.map((item) => (
                <article
                  key={item.week}
                  className="relative rounded-2xl bg-white text-slate-900 p-5 sm:p-8 shadow-xl border border-white flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-widest text-brand-700 bg-brand-50 border border-brand-200">
                      {item.week}
                    </span>
                    <h3 className="mt-4 font-serif text-lg sm:text-xl font-extrabold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 font-medium">
                      {item.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-brand-700 shadow-md transition hover:bg-brand-50 hover:text-brand-800 w-full sm:w-auto"
              >
                <span>Start Pilot</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/jobs/employers"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/10 px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-white hover:text-brand-800 w-full sm:w-auto"
              >
                <span>Review Employer Model</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <p className="mt-6 text-xs sm:text-sm font-medium text-white/90">
              Hiring refugee talent through Generation Jobs is a strategic
              impact-sourcing investment powered by Generation Aid training.
            </p>
          </div>
        </div>
      </section>
    </JobsShell>
  );
}

