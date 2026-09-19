import { Link } from "react-router-dom";
import Section from "@/components/Section";
import JobsShell from "@/components/JobsShell";
import SmartImage from "@/components/SmartImage";
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
      <Section pattern="canvas" className="!pt-4 sm:!pt-6">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-4 sm:space-y-6 min-w-0">
            <span className="sir-tag">
              Why Hire Through Generation Jobs
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 lg:text-4xl break-words">
              Competitive delivery economics with built-in social impact
            </h2>
            <div className="sir-callout-border !my-2 sm:!my-3">
              <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                Employers access cost-effective, managed remote teams with EOR compliance support, rapid onboarding, and reliable retention.
              </p>
            </div>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              {valuePillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="sir-card-accent p-4 sm:p-5"
                >
                  <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">{pillar.title}</h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">{pillar.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-4 min-w-0 w-full">
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md aspect-[4/3] group">
              <SmartImage
                src="/Capacity building.png"
                alt="Capacity building and digital work session in Kakuma"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm aspect-[16/10] sm:aspect-[16/7] group">
              <SmartImage
                src="/blog generation jobs launch.webp"
                alt="Generation Jobs initiative launch"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* SERVICE LINES (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sir-tag">
            Comprehensive service portfolio
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Built for growth operations, support, and digital delivery
          </h2>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceLines.map((line) => (
            <article
              key={line.title}
              className="sir-card p-5 sm:p-6 border-t-4 border-t-brand-600 dark:border-t-brand-500"
            >
              <h3 className="font-serif text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">{line.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{line.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* STRATEGIC IMPACT SOURCING (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sir-tag">
            Strategic impact sourcing
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            High-performance business investment, not charity
          </h2>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 lg:grid-cols-2">
          {esgPillars.map((pillar) => (
            <article
              key={pillar.title}
              className="sir-card-accent p-5 sm:p-6"
            >
              <h3 className="font-serif text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{pillar.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* OPERATIONAL EXCELLENCE (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sir-tag">
            Operational excellence
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Quality assurance embedded in every delivery
          </h2>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 sm:grid-cols-3">
          {qualityPillars.map((pillar) => (
            <article
              key={pillar.title}
              className="sir-card p-5 sm:p-6"
            >
              <h3 className="font-serif text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{pillar.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* PARTNERSHIP MODELS (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="sir-card-accent p-5 sm:p-8 lg:p-10">
          <span className="sir-tag">
            Flexible partnership models
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 break-words">
            Adaptable engagement, transparent accountability
          </h2>
          <div className="sir-callout-border !my-3">
            <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
              Choose the model that matches your stage and goals. Every model is
              supported by KPI reporting, delivery supervision, and transparent
              monthly billing.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partnershipModels.map((model) => (
              <article
                key={model.title}
                className="sir-card p-4 sm:p-5"
              >
                <h3 className="font-serif text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100">
                  {model.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {model.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/jobs/opportunities"
              className="sir-btn-primary py-3 px-6 text-sm w-full sm:w-auto text-center justify-center"
            >
              <span>View Services and Pricing</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/contact"
              className="sir-btn-secondary py-3 px-6 text-sm w-full sm:w-auto text-center justify-center"
            >
              <span>Book a Discovery Call</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </Section>
    </JobsShell>
  );
}

