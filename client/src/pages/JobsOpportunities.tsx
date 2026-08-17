import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Section from "@/components/Section";
import JobsShell from "@/components/JobsShell";
import { servicePackages, type ServiceCategory } from "@/data/jobsBoard";
import { useSEO } from "@/utils/useSEO";

const filters: Array<"All" | ServiceCategory> = [
  "All",
  "Data & AI",
  "Customer Support",
  "Digital Marketing",
  "Virtual Assistance",
  "Web Support",
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
      "Explore Generation Jobs service packages, pilot-first pricing, and the 3-week onboarding roadmap for global employers.",
  });

  return (
    <JobsShell
      eyebrow="Services and pricing"
      title="Operational packages built for growth"
      subtitle="Start with a two-month pilot at $150/month, then continue at $399/month with transparent scope and measurable KPIs."
    >
      {/* PACKAGES (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mb-6 rounded-xl border border-neutral-border dark:border-slate-700 bg-brand-50/50 dark:bg-slate-800/50 p-4 text-sm text-neutral-body dark:text-slate-300 shadow-sm">
          Choose the service package that fits your needs. Start with a 2-month
          trial at $150/month, then continue at $399/month. No hidden fees,
          cancel anytime.
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={
                activeFilter === filter
                  ? "rounded-full border border-brand-600 dark:border-brand-500 bg-brand-600 dark:bg-brand-500 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-sm"
                  : "rounded-full border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-heading dark:text-slate-200 hover:border-brand-600 dark:hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-700"
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
              className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {pkg.category}
                </span>
                <h2 className="mt-3 font-display text-2xl font-semibold text-neutral-heading dark:text-slate-100">
                  {pkg.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">
                  {pkg.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-neutral-body dark:text-slate-300">
                  {pkg.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-600 dark:bg-brand-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="mt-6 rounded-xl border border-neutral-border dark:border-slate-700 bg-brand-50/50 dark:bg-slate-900/50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    Pricing
                  </p>
                  <p className="mt-2 text-sm text-neutral-body dark:text-slate-300">
                    Pilot:{" "}
                    <span className="font-semibold text-neutral-heading dark:text-slate-100">
                      ${pkg.trialPrice}/month
                    </span>{" "}
                    for the first two months
                  </p>
                  <p className="mt-1 text-sm text-neutral-body dark:text-slate-300">
                    Standard:{" "}
                    <span className="font-semibold text-neutral-heading dark:text-slate-100">
                      ${pkg.monthlyPrice}/month
                    </span>{" "}
                    after pilot
                  </p>
                </div>

                <p className="mt-4 text-sm font-medium text-neutral-heading dark:text-slate-200">
                  Impact: {pkg.impact}
                </p>
              </div>
            </article>
          ))}
        </div>

        {packages.length === 0 && (
          <div className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-8 text-center text-neutral-body dark:text-slate-400 shadow-sm">
            No packages match this filter yet.
          </div>
        )}
      </Section>

      {/* ROADMAP (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="rounded-2xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm sm:p-8 lg:p-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Your 3-week roadmap
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-heading dark:text-slate-50 sm:text-4xl">
            Start your impact journey with us
          </h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {roadmap.map((item) => (
              <article
                key={item.week}
                className="rounded-xl border border-neutral-border dark:border-slate-700 bg-brand-50/50 dark:bg-slate-900/50 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {item.week}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-body dark:text-slate-300">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-lg bg-brand-600 dark:bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 dark:hover:bg-brand-400"
            >
              Start pilot
            </Link>
            <Link
              to="/jobs/employers"
              className="inline-flex items-center rounded-lg border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-3 text-sm font-semibold text-neutral-heading dark:text-slate-100 transition hover:border-brand-600 dark:hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400"
            >
              Review employer model
            </Link>
          </div>

          <p className="mt-4 text-sm font-medium text-neutral-body dark:text-slate-400">
            Hiring refugee talent through Generation Jobs is a strategic
            impact-sourcing investment powered by Generation Aid training.
          </p>
        </div>
      </Section>
    </JobsShell>
  );
}
