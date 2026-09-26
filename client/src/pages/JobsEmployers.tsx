import { Link } from "react-router-dom";
import Section from "@/components/Section";
import JobsShell from "@/components/JobsShell";
import SmartImage from "@/components/SmartImage";
import SatisfiedClients from "@/components/SatisfiedClients";
import { useSEO } from "@/utils/useSEO";

const valuePillars = [
  {
    title: "Unmatched daily rates",
    body: "Access digital workers around €50/day compared with freelancers, agencies, or internal teams at much higher cost.",
  },
  {
    title: "Employer of record support",
    body: "Generation Jobs handles HR, payroll, compliance, and work permit administration to reduce legal and operational burden.",
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
    title: "Sales and Outbound",
    body: "Lead generation and qualification, CRM and database management, email and LinkedIn outreach.",
  },
  {
    title: "Google Ads & Meta Ads",
    body: "Paid advertising campaign setup, audience targeting, budget optimization, copy & creative testing, and multichannel performance tracking across Google and Meta platforms.",
  },
  {
    title: "Customer Support (Email, Chat & CRM)",
    body: "Multichannel customer service, ticket resolution, live chat assistance, CRM management, and customer satisfaction optimization.",
  },
  {
    title: "Graphic Design",
    body: "Brand identity assets, marketing collateral, social media creatives, ad banners, presentations, and visual design solutions.",
  },
  {
    title: "Transcripts",
    body: "Accurate, timely audio and video transcription, speaker identification, timestamping, and formatted transcripts for interviews, media, and corporate meetings.",
  },
  {
    title: "Translation",
    body: "Professional multi language translation and localization services bridging language barriers with cultural nuance and linguistic precision.",
  },
  {
    title: "Social Engagement",
    body: "Content scheduling, community management, and digital brand engagement.",
  },
  {
    title: "Social and SEO",
    body: "Social media marketing and blog strategy, keyword optimization, and on page SEO checks.",
  },
  {
    title: "Campaigns",
    body: "Paid ads performance management, marketing automation, and conversion A/B testing.",
  },
  {
    title: "Web Support & Maintenance",
    body: "CMS and content updates, speed and performance enhancements, and technical troubleshooting.",
  },
  {
    title: "Ecommerce",
    body: "Order management, catalog updates, payment verification, security, and routine backups.",
  },
  {
    title: "Data and AI Services",
    body: "Data annotation and dataset preparation, AI prompt testing, and human in the loop operations.",
  },
  {
    title: "Virtual Assistance & Admin",
    body: "Operational focus, key admin tasks, executive scheduling, and strategic workflow value.",
  },
];

const amazonAgencyServices = [
  {
    title: "Brands/suppliers Acquisition",
    body: "We identify, attract, and close new business accounts including brands and suppliers. Instead of buying assets, the focus here is on generating high-value leads and converting them into long-term retainers.",
    tag: "Lead Generation & Deals",
  },
  {
    title: "Total Account Management",
    body: "We manage your Amazon business end to end: catalog, advertising, operations, and execution. Nothing slips through the cracks and decisions aren't made in silos.",
    tag: "End-to-End Operations",
  },
  {
    title: "Catalog & Case Management",
    body: "From listings and variations to suppressions and Seller Support cases, we keep your catalog clean, compliant, and built to support advertising and conversion.",
    tag: "Listing & Compliance Health",
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
    body: "Start risk-free with Month 1 at $0 and Month 2 at $250 to validate value and scale with confidence.",
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
      {/* SERVED CLIENTS SOCIAL PROOF */}
      <SatisfiedClients showTitle={true} />

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
                src="/gen jobs/Copy of IMG_20260611_111051_050.jpg"
                alt="Generation Jobs BPO Delivery Hub and Workstations in Kakuma with UNHCR and Australian Aid partners"
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

      {/* SERVICE LINES (Blue Palette) */}
      <section className="bg-brand-600 dark:bg-brand-700 py-16 sm:py-20 text-white transition-colors border-t border-brand-500/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur mb-2 border border-white/25">
              Comprehensive service portfolio
            </span>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight !text-white">
              Built for growth operations, support, and digital delivery
            </h2>
          </div>

          <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceLines.map((line) => (
              <article
                key={line.title}
                className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-md border border-white/80 transition hover:shadow-xl hover:-translate-y-0.5"
              >
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-extrabold text-neutral-heading">
                    {line.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-body">
                    {line.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FULL AMAZON GROWTH AGENCY SUPPORT (Pattern A: Canvas) */}
      <Section pattern="canvas" id="amazon-growth-agency">
        <div className="sir-card-accent p-6 sm:p-10 lg:p-12 border-2 border-brand-500/30 dark:border-brand-500/20">
          <div className="max-w-3xl">
            <span className="sir-tag">
              FOR FULL AMAZON GROWTH AGENCY
            </span>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              Specialized Support for Amazon Growth Agencies
            </h2>
            <p className="mt-4 text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
              Are you a full channel Amazon Growth Agency founded to help brands scale profitably through advertising, creative optimization, and marketplace strategy?
            </p>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              We got you covered too. We specialize in researching and finding brands/suppliers that agencies like yours would be excited to work with.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {amazonAgencyServices.map((service) => (
              <div
                key={service.title}
                className="sir-card p-6 border-t-4 border-t-brand-600 dark:border-t-brand-500 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800">
                    {service.tag}
                  </span>
                  <h3 className="mt-4 font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {service.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Need dedicated Amazon operators, account managers, or catalog specialists?
            </p>
            <Link
              to="/contact?subject=Amazon+Growth+Agency+Inquiry"
              className="sir-btn-primary py-2.5 px-5 text-xs uppercase tracking-wider font-extrabold whitespace-nowrap"
            >
              <span>Partner With Us</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
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

