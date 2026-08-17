import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Section from "@/components/Section";
import JobsShell from "@/components/JobsShell";
import SmartImage from "@/components/SmartImage";
import { getJobsContent } from "@/lib/sanity";
import { useSEO } from "@/utils/useSEO";

const marketProblems = [
  {
    title: "Hiring gap",
    body: "Employers need dependable remote talent, but many teams struggle to find candidates who are ready, responsive, and consistent.",
  },
  {
    title: "Untapped supply",
    body: "Kakuma has capable people with strong motivation and relevant skills, but limited access to global work opportunities.",
  },
  {
    title: "Need for trust",
    body: "Employers want a partner that can reduce hiring risk, support quality, and keep teams stable over time.",
  },
];

const generationJobsDefinition = [
  {
    title: "Employer-facing placement arm",
    body: "Generation Jobs connects international employers to vetted remote talent through Generation Aid's talent pipeline.",
  },
  {
    title: "Built for confidence",
    body: "The initiative helps employers hire with clearer matching, onboarding support, and ongoing coordination.",
  },
  {
    title: "Part of a larger pathway",
    body: "Training and preparation happen through Generation Aid, while placement and employer support happen through Generation Jobs.",
  },
];

const pipelineSteps = [
  {
    step: "01",
    title: "Generation Aid | Training",
    body: "Build foundational skills through ICT, English, vocational learning, and work-readiness preparation.",
  },
  {
    step: "02",
    title: "Generation Jobs | Placement",
    body: "Match vetted talent to employer needs, then support onboarding, retention, and team integration.",
  },
  {
    step: "03",
    title: "Ongoing support",
    body: "Maintain quality through follow-up, coordination, and performance support after placement.",
  },
];

const talentCategories = [
  {
    title: "Customer support",
    body: "Email, chat, ticket handling, and CRM support for client-facing teams.",
  },
  {
    title: "Virtual assistance",
    body: "Scheduling, inbox management, research, and administrative support.",
  },
  {
    title: "Data operations",
    body: "Data entry, annotation, spreadsheet tasks, and process-driven back office work.",
  },
  {
    title: "Other remote roles",
    body: "Flexible placements can be scoped around specific employer needs and team structures.",
  },
];

const howHiringWorks = [
  {
    title: "Share your role brief",
    body: "Tell us what you need, your timeline, and the type of support you want to hire.",
  },
  {
    title: "Review matched talent",
    body: "We present candidates that fit your role requirements, communication needs, and working style.",
  },
  {
    title: "Hire with support",
    body: "We help with onboarding, coordination, and retention so the placement works for both sides.",
  },
];

const employerBenefits = [
  {
    title: "Reliable talent",
    body: "Access candidates who are prepared, motivated, and selected for role fit.",
  },
  {
    title: "Lower hiring friction",
    body: "Save time with a guided process that reduces guesswork and accelerates decisions.",
  },
  {
    title: "Human-centered partnership",
    body: "Work with a team that understands both employer needs and the realities of the talent pipeline.",
  },
];

const proofAndTrust = [
  {
    title: "Refugee-led leadership",
    body: "Built under Generation Aid with community-rooted leadership and a long-term local presence.",
  },
  {
    title: "Structured vetting",
    body: "Candidates are screened for communication, digital readiness, and role alignment before placement.",
  },
  {
    title: "Ongoing support",
    body: "Placements are backed by follow-up, coordination, and retention support.",
  },
];

const impactStats = [
  { label: "Individuals trained", value: "5,000+" },
  { label: "Earning before graduation", value: "80%" },
  { label: "Average monthly income", value: "$200" },
  { label: "Indirect beneficiaries reached", value: "7,000" },
];

export default function Jobs() {
  useSEO({
    title: "Generation Jobs | Empowering Global Growth",
    description:
      "Generation Jobs by Generation Aid connects skilled professionals in Kakuma to global digital work through a two-step training and placement model.",
  });

  const { data: jobsContent } = useQuery({
    queryKey: ["sanity", "jobs-content"],
    queryFn: getJobsContent,
    retry: false,
  });

  return (
    <JobsShell
      eyebrow="Generation Jobs Initiative"
      title={jobsContent?.overviewHeroTitle || "Empowering global growth with remote talent from Kakuma"}
      subtitle={jobsContent?.overviewHeroSubtitle || "For international employers seeking reliable remote talent: access vetted candidates through a trusted training-to-placement pipeline built by Generation Aid."}
    >
      {/* HERO BANNER (Pattern A: Canvas) */}
      <Section pattern="canvas" className="!pt-6">
        <div className="grid gap-6 rounded-2xl border border-neutral-border dark:border-slate-700 bg-brand-50/50 dark:bg-slate-800/50 p-6 shadow-sm sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div>
            <span className="inline-block rounded-full bg-brand-100 dark:bg-slate-700 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">
              Overview
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-heading dark:text-slate-50 sm:text-4xl">
              {jobsContent?.overviewHeroTitle || "Reliable remote talent from Kakuma, ready for global employers."}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-body dark:text-slate-300">
              {jobsContent?.overviewHeroSubtitle || "Generation Jobs connects international employers to trained, vetted, and supported talent through a clear pipeline that serves both business needs and human opportunity."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/jobs/employers"
                className="inline-flex items-center rounded-lg bg-brand-600 dark:bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 dark:hover:bg-brand-400"
              >
                Employer inquiries
              </Link>
              <Link
                to="/jobs/talent"
                className="inline-flex items-center rounded-lg border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-3 text-sm font-semibold text-neutral-heading dark:text-slate-100 transition hover:border-brand-600 dark:hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400"
              >
                Talent consultation request
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm aspect-[4/3]">
            <SmartImage
              src={jobsContent?.overviewHeroImage || "/img/home/featured-banner.jpg"}
              alt="Skilled remote talent at Kakuma workstation"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Section>

      {/* MARKET PROBLEM (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            Market Need
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-heading dark:text-slate-50 sm:text-4xl">
            Global demand is growing, but qualified remote talent remains hard
            to access
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-body dark:text-slate-300">
            Employers need dependable remote workers who are ready, responsive,
            and consistent. Kakuma holds capable, trained people who need access
            to those opportunities.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {marketProblems.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm"
            >
              <h3 className="font-display text-xl font-semibold text-neutral-heading dark:text-slate-100">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* WHAT IS GENERATION JOBS (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            What is Generation Jobs
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-heading dark:text-slate-50 sm:text-4xl">
            The talent placement arm under Generation Aid
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-body dark:text-slate-300">
            Generation Jobs is the employer-facing bridge between training and
            placement, designed to help global teams hire with confidence.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {generationJobsDefinition.map((signal) => (
            <article
              key={signal.title}
              className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
            >
              <h3 className="font-display text-xl font-semibold text-neutral-heading dark:text-slate-100">{signal.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">{signal.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* PIPELINE (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            Training-to-Placement Pipeline
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-heading dark:text-slate-50 sm:text-4xl">
            A clear path from skills development to employer placement
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-body dark:text-slate-300">
            The pipeline is intentionally simple: train talent, vet readiness,
            place the right people, and support retention.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {pipelineSteps.map((step) => (
            <article
              key={step.step}
              className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md sm:p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Step {step.step}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold text-neutral-heading dark:text-slate-100">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">{step.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* TALENT CATEGORIES (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            Talent Categories
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-heading dark:text-slate-50 sm:text-4xl">
            Roles employers can hire through Generation Jobs
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {talentCategories.map((pillar) => (
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

      {/* HOW HIRING WORKS (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            How Hiring Works
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-heading dark:text-slate-50 sm:text-4xl">
            A guided hiring process for employers
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {howHiringWorks.map((item, index) => (
            <article
              key={item.title}
              className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Step {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold text-neutral-heading dark:text-slate-100">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* EMPLOYER BENEFITS (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            Employer Benefits
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-heading dark:text-slate-50 sm:text-4xl">
            Why employers choose Generation Jobs
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {employerBenefits.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
            >
              <h3 className="font-display text-xl font-semibold text-neutral-heading dark:text-slate-100">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* PROOF & TRUST (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            Proof & Trust
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-heading dark:text-slate-50 sm:text-4xl">
            Built on local leadership and structured support
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {proofAndTrust.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
            >
              <h3 className="font-display text-xl font-semibold text-neutral-heading dark:text-slate-100">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* IMPACT METRICS (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="rounded-2xl border border-neutral-border dark:border-slate-700 bg-brand-50/50 dark:bg-slate-800/50 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Impact Metrics
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-neutral-heading dark:text-slate-50 sm:text-4xl">
                Outcomes that matter to employers and communities
              </h2>
            </div>
            <p className="text-sm font-medium text-neutral-body dark:text-slate-300">
              Target by 2030: empower 10,000 individuals
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((item) => (
              <article
                key={item.label}
                className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm"
              >
                <p className="font-display text-3xl font-bold tracking-tight text-brand-600 dark:text-brand-400">
                  {item.value}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-neutral-heading dark:text-slate-200">
                  {item.label}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/jobs/employers"
              className="inline-flex items-center rounded-lg bg-brand-600 dark:bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 dark:hover:bg-brand-400"
            >
              Generate employer inquiry
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-lg border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-3 text-sm font-semibold text-neutral-heading dark:text-slate-100 transition hover:border-brand-600 dark:hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400"
            >
              Request a talent consultation
            </Link>
          </div>
        </div>
      </Section>

      {/* FINAL CTA (Pattern C: Impact) */}
      <Section pattern="impact">
        <div className="mx-auto max-w-4xl text-center text-white">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-100 dark:text-brand-300">
            Final CTA
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to hire reliable remote talent?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-100 dark:text-slate-300 max-w-2xl mx-auto">
            Start with an employer inquiry or request a consultation for talent
            matching, and we’ll guide the next step.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/jobs/employers"
              className="inline-flex items-center rounded-lg bg-white dark:bg-brand-500 px-5 py-3 text-sm font-semibold text-brand-600 dark:text-white shadow-sm transition hover:bg-brand-50 dark:hover:bg-brand-400"
            >
              Book an employer call
            </Link>
            <Link
              to="/jobs/talent"
              className="inline-flex items-center rounded-lg border border-white/70 dark:border-slate-700 bg-white/10 dark:bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20 dark:hover:bg-slate-700"
            >
              Request matched candidates
            </Link>
          </div>
        </div>
      </Section>
    </JobsShell>
  );
}
