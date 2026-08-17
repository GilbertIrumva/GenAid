import { Link } from "react-router-dom";
import Section from "@/components/Section";
import JobsShell from "@/components/JobsShell";
import { useSEO } from "@/utils/useSEO";

const valuePillars = [
  {
    title: "Unmatched daily rates",
    body: "Access digital workers around €50/day compared with freelancers, agencies, or internal teams at much higher cost.",
  },
  {
    title: "Employer of record support",
    body: "Generation Jobs handles HR, payroll, compliance, and work-permit administration to reduce legal and operational burden.",
  },
  {
    title: "Rapid onboarding",
    body: "Deploy managed teams within days with clear KPIs, QA oversight, and project management from Day 1.",
  },
  {
    title: "Retention and stability",
    body: "Loyal talent and low attrition provide continuity, lower replacement costs, and consistent delivery performance.",
  },
];

const serviceLines = [
  {
    title: "Data and AI services",
    body: "Data annotation, dataset preparation, cleaning, enrichment, and AI prompt testing.",
  },
  {
    title: "Customer experience support",
    body: "Multilingual front-office and back-office operations, CRM management, and ticketing workflows.",
  },
  {
    title: "Digital marketing and outreach",
    body: "Lead generation, social media operations, content moderation, and campaign execution.",
  },
  {
    title: "Virtual assistance and admin",
    body: "Calendar coordination, web research, database updates, and executive support for growth teams.",
  },
  {
    title: "Web support and maintenance",
    body: "CMS updates, on-page optimization checks, troubleshooting, and platform reliability support.",
  },
  {
    title: "Operations and quality assurance",
    body: "Dedicated project managers and QA officers ensure precision workflows and security-first delivery.",
  },
];

const partnershipModels = [
  {
    title: "Direct hire",
    body: "Integrate vetted talent into your existing teams while Generation Jobs manages HR and compliance.",
  },
  {
    title: "Managed teams",
    body: "A fully managed delivery model with project management and QA embedded end to end.",
  },
  {
    title: "Project-based",
    body: "Agile engagement for specific deliverables and defined timelines without long-term commitments.",
  },
  {
    title: "Pilot-first",
    body: "Start with a focused two-month pilot to validate value and scale with confidence.",
  },
];

const esgPillars = [
  {
    title: "ESG and CSR alignment",
    body: "Integrate measurable social impact into your sourcing strategy while meeting reporting requirements.",
  },
  {
    title: "UN SDG contribution",
    body: "Contribute directly to No Poverty, Quality Education, and Decent Work through structured talent pathways.",
  },
  {
    title: "Brand and stakeholder trust",
    body: "Build a purpose-driven, diverse workforce narrative that resonates with customers, partners, and investors.",
  },
  {
    title: "Strategic advantage",
    body: "Access resilient, motivated, multilingual teams with competitive delivery economics and rapid deployment.",
  },
];

const qualityPillars = [
  {
    title: "Robust infrastructure",
    body: "Delivery centers in Kakuma with stable power and reliable high-speed internet connectivity.",
  },
  {
    title: "Precision management",
    body: "Every engagement is supported by dedicated project managers and QA officers.",
  },
  {
    title: "Data privacy and security",
    body: "Security-first workflows and controlled processes are applied across all operational steps.",
  },
];

export default function JobsEmployers() {
  useSEO({
    title: "Generation Jobs | For Employers",
    description:
      "Business case, operational model, and partnership options for employers hiring through Generation Jobs by Generation Aid.",
  });

  return (
    <JobsShell
      eyebrow="Strategic impact sourcing"
      title="Hiring through Generation Jobs is a strategic decision"
      subtitle="Secure high-performing digital talent while advancing ESG and social-impact mandates through a structured, measurable sourcing model."
    >
      {/* VALUE PILLARS (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="grid gap-6 lg:grid-cols-2">
          {valuePillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
            >
              <h2 className="font-display text-xl font-semibold text-neutral-heading dark:text-slate-100">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">{pillar.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* SERVICE LINES (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            Comprehensive service portfolio
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-heading dark:text-slate-50 sm:text-4xl">
            Built for growth operations, support, and digital delivery.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {serviceLines.map((line) => (
            <article
              key={line.title}
              className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
            >
              <h3 className="font-display text-xl font-semibold text-neutral-heading dark:text-slate-100">{line.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">{line.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* STRATEGIC IMPACT SOURCING (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            Strategic impact sourcing
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-heading dark:text-slate-50 sm:text-4xl">
            High-performance business investment, not charity
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {esgPillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
            >
              <h3 className="font-display text-xl font-semibold text-neutral-heading dark:text-slate-100">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">{pillar.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* OPERATIONAL EXCELLENCE (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            Operational excellence
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-heading dark:text-slate-50 sm:text-4xl">
            Quality assurance embedded in every delivery
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {qualityPillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
            >
              <h3 className="font-display text-xl font-semibold text-neutral-heading dark:text-slate-100">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">{pillar.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* PARTNERSHIP MODELS (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="rounded-2xl border border-neutral-border dark:border-slate-700 bg-brand-50/50 dark:bg-slate-800/50 p-6 shadow-sm sm:p-8 lg:p-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Flexible partnership models
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-heading dark:text-slate-50 sm:text-4xl">
            Adaptable engagement, transparent accountability
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-body dark:text-slate-300">
            Choose the model that matches your stage and goals. Every model is
            supported by KPI reporting, delivery supervision, and transparent
            monthly billing.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-4">
            {partnershipModels.map((model) => (
              <article
                key={model.title}
                className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm"
              >
                <h3 className="font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                  {model.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-body dark:text-slate-300">
                  {model.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/jobs/opportunities"
              className="inline-flex items-center rounded-lg bg-brand-600 dark:bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 dark:hover:bg-brand-400"
            >
              View services and pricing
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-lg border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-3 text-sm font-semibold text-neutral-heading dark:text-slate-100 transition hover:border-brand-600 dark:hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400"
            >
              Book a discovery call
            </Link>
          </div>
        </div>
      </Section>
    </JobsShell>
  );
}
