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
      <Section pattern="canvas" className="!pt-4 sm:!pt-6">
        <div className="sir-card-accent p-4 sm:p-8 lg:p-10 lg:grid-cols-[1.1fr_0.9fr] grid gap-6 sm:gap-8 items-center">
          <div className="space-y-4 min-w-0">
            <span className="sir-tag">
              Overview
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 break-words">
              {jobsContent?.overviewHeroTitle || "Reliable remote talent from Kakuma, ready for global employers."}
            </h2>
            <div className="sir-callout-border !my-2">
              <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                {jobsContent?.overviewHeroSubtitle || "Generation Jobs connects international employers to trained, vetted, and supported talent through a clear pipeline that serves both business needs and human opportunity."}
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/jobs/employers"
                className="sir-btn-primary py-3 px-6 text-sm w-full sm:w-auto text-center justify-center"
              >
                <span>Employer Inquiries</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/jobs/talent"
                className="sir-btn-secondary py-3 px-6 text-sm w-full sm:w-auto text-center justify-center"
              >
                <span>Talent Consultation Request</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md aspect-[4/3] group w-full min-w-0 max-w-lg mx-auto lg:max-w-none">
            <SmartImage
              src="/genjob.jpg"
              alt="Generation Jobs remote professionals at Kakuma workstation"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </Section>

      {/* MARKET PROBLEM */}
      <Section pattern="soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sir-tag">
            Market Need
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Global demand is growing, but qualified remote talent remains hard to access
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Employers need dependable remote workers who are ready, responsive,
            and consistent. Kakuma holds capable, trained people who need access
            to those opportunities.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 lg:grid-cols-3">
          {marketProblems.map((item) => (
            <article
              key={item.title}
              className="sir-card p-5 sm:p-7 border-t-4 border-t-brand-600 dark:border-t-brand-500"
            >
              <h3 className="font-serif text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* WHAT IS GENERATION JOBS */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sir-tag">
            What is Generation Jobs
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            The talent placement arm under Generation Aid
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Generation Jobs is the employer-facing bridge between training and
            placement, designed to help global teams hire with confidence.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 lg:grid-cols-3">
          {generationJobsDefinition.map((signal) => (
            <article
              key={signal.title}
              className="sir-card-accent p-5 sm:p-7"
            >
              <h3 className="font-serif text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">{signal.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{signal.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* PIPELINE (BRAND BLUE PALETTE) */}
      <section className="bg-brand-600 dark:bg-brand-900 text-white py-12 sm:py-20 border-y border-brand-700 dark:border-brand-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-md bg-white/20 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white border border-white/30 backdrop-blur-sm">
              Training-to-Placement Pipeline
            </span>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight !text-white">
              A clear path from skills development to employer placement
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/90">
              The pipeline is intentionally simple: train talent, vet readiness,
              place the right people, and support retention.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 lg:grid-cols-3">
            {pipelineSteps.map((step) => (
              <article
                key={step.step}
                className="relative rounded-2xl bg-white text-slate-900 p-5 sm:p-7 shadow-xl border border-white flex flex-col justify-between"
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-widest text-brand-700 bg-brand-50 border border-brand-200">
                    Step {step.step}
                  </span>
                  <h3 className="mt-4 font-serif text-lg sm:text-xl font-extrabold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 font-medium">
                    {step.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TALENT CATEGORIES */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sir-tag">
            Talent Categories
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Roles employers can hire through Generation Jobs
          </h2>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 lg:grid-cols-2">
          {talentCategories.map((pillar) => (
            <article
              key={pillar.title}
              className="sir-card-accent p-5 sm:p-7"
            >
              <h3 className="font-serif text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{pillar.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* HOW HIRING WORKS */}
      <Section pattern="soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sir-tag">
            How Hiring Works
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            A guided hiring process for employers
          </h2>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 lg:grid-cols-3">
          {howHiringWorks.map((item, index) => (
            <article
              key={item.title}
              className="sir-card p-5 sm:p-7"
            >
              <span className="sir-tag">
                Step {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* EMPLOYER BENEFITS */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sir-tag">
            Employer Benefits
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Why employers choose Generation Jobs
          </h2>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 lg:grid-cols-3">
          {employerBenefits.map((item) => (
            <article
              key={item.title}
              className="sir-card-accent p-5 sm:p-7"
            >
              <h3 className="font-serif text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* PROOF & TRUST */}
      <Section pattern="soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sir-tag">
            Proof & Trust
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Built on local leadership and structured support
          </h2>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 lg:grid-cols-3">
          {proofAndTrust.map((item) => (
            <article
              key={item.title}
              className="sir-card p-5 sm:p-7"
            >
              <h3 className="font-serif text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* IMPACT METRICS */}
      <Section pattern="canvas">
        <div className="sir-card-accent p-5 sm:p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div>
              <span className="sir-tag">
                Impact Metrics
              </span>
              <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                Outcomes that matter to employers and communities
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400">
              Target by 2030: empower 10,000 individuals
            </p>
          </div>

          <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((item) => (
              <article
                key={item.label}
                className="sir-card p-5 sm:p-6 text-center border-t-4 border-t-brand-600 dark:border-t-brand-500"
              >
                <p className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-600 dark:text-brand-400">
                  {item.value}
                </p>
                <p className="mt-2 text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {item.label}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/jobs/employers"
              className="sir-btn-primary py-3 px-6 text-sm w-full sm:w-auto text-center justify-center"
            >
              <span>Generate Employer Inquiry</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/contact"
              className="sir-btn-secondary py-3 px-6 text-sm w-full sm:w-auto text-center justify-center"
            >
              <span>Request a Talent Consultation</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </Section>

      {/* FINAL CTA (BRAND BLUE PALETTE) */}
      <section className="bg-brand-600 dark:bg-brand-900 text-white py-12 sm:py-20 border-y border-brand-700 dark:border-brand-800">
        <div className="mx-auto max-w-4xl text-center px-4 space-y-4">
          <span className="inline-block rounded-md bg-white/20 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white border border-white/30 backdrop-blur-sm">
            Final CTA
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight !text-white sm:text-4xl lg:text-5xl">
            Ready to hire reliable remote talent?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white/90 max-w-2xl mx-auto">
            Start with an employer inquiry or request a consultation for talent
            matching, and we’ll guide the next step.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <Link
              to="/jobs/employers"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-brand-700 shadow-md transition hover:bg-brand-50 hover:text-brand-800 w-full sm:w-auto"
            >
              <span>Book an Employer Call</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/jobs/talent"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/10 px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-white hover:text-brand-800 w-full sm:w-auto"
            >
              <span>Request Matched Candidates</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>


    </JobsShell>
  );
}

