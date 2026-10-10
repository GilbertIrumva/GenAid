import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Section from "@/components/Section";
import JobsShell from "@/components/JobsShell";
import SmartImage from "@/components/SmartImage";
import SatisfiedClients from "@/components/SatisfiedClients";
import { useSEO } from "@/utils/useSEO";
import { getJobsContent } from "@/lib/sanity";

const valuePillars = [
  {
    title: "Unmatched daily rates",
    body: "Access digital workers around $8/day compared with freelancers, agencies, or internal teams at much higher cost.",
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
    title: "Listing & Compliance Health",
    body: "We manage your Amazon business end to end catalog: From listings and variations, A+ content to suppressions and Seller Support cases, we keep your catalog clean, compliant, and built to support advertising and conversion.",
    tag: "End-to-End Catalog Operations & Case Management",
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
  const { data: jobsContent } = useQuery({
    queryKey: ["public", "sanity", "jobsContent"],
    queryFn: getJobsContent,
    retry: false,
  });

  const heroTitle = jobsContent?.employerHeroTitle || "Hiring through Generation Jobs is a strategic decision";
  const heroSubtitle = jobsContent?.employerHeroSubtitle || "Secure high-performing digital talent while advancing ESG and social-impact mandates through a structured, measurable sourcing model.";
  const heroImage = jobsContent?.employerHeroImage || "/gen jobs/home slide images (1).jpg";

  const amazonTag = (jobsContent?.amazonAgencyTag as string) || "FOR FULL AMAZON GROWTH AGENCY";
  const amazonTitle = (jobsContent?.amazonAgencyTitle as string) || "Specialized Support for Amazon Growth Agencies";
  const amazonSubtitle = (jobsContent?.amazonAgencySubtitle as string) || "Are you a full channel Amazon Growth Agency founded to help brands scale profitably through advertising, creative optimization, and marketplace strategy?";
  const amazonBody = (jobsContent?.amazonAgencyBody as string) || "We got you covered too. We specialize in researching and finding brands/suppliers that agencies like yours would be excited to work with.";
  const amazonImage = (jobsContent?.amazonAgencyImage as string) || "/gen jobs/amazon-growth-agency.jpg";
  const clientFormUrl = (jobsContent?.clientFormUrl as string) || "https://forms.gle/wydDfQ8Y9GduXxi26";
  const amazonCapabilities =
    jobsContent?.amazonAgencyCapabilities && jobsContent.amazonAgencyCapabilities.length > 0
      ? (jobsContent.amazonAgencyCapabilities as string[])
      : [
          "Brand & Supplier Prospecting",
          "Catalog Health & Compliance",
          "Full catalog operations and inventory health",
          "Sponsored Ads monitoring and daily optimizations",
          "Cross-functional operational execution without silos",
        ];

  const whyHireTag = (jobsContent?.whyHireTag as string) || "Why Hire Through Generation Jobs";
  const whyHireTitle = (jobsContent?.whyHireTitle as string) || "Competitive delivery economics with built-in social impact";
  const whyHireImage = (jobsContent?.whyHireImage as string) || "/gen jobs/why-hire-feature.jpg";

  const strategicImpactTag = (jobsContent?.strategicImpactTag as string) || "Strategic impact sourcing";
  const strategicImpactImage = (jobsContent?.strategicImpactImage as string) || "/gen jobs/strategic-impact-sourcing.jpg";

  useSEO({
    title: "Generation Jobs | For Employers",
    description:
      "Business case, operational model, and partnership options for employers hiring through Generation Jobs by Generation Aid.",
  });

  return (
    <JobsShell
      eyebrow="Strategic impact sourcing"
      title={heroTitle}
      subtitle={heroSubtitle}
      heroImage={heroImage}
    >
      {/* SERVED CLIENTS SOCIAL PROOF */}
      <SatisfiedClients showTitle={true} />

      {/* VALUE PILLARS & STRATEGIC MODEL (Pattern A: Canvas) */}
      <Section pattern="canvas" className="!pt-4 sm:!pt-6">
        <div className="space-y-8 sm:space-y-10">
          {/* Header Block */}
          <div className="max-w-3xl">
            <span className="inline-block rounded-md bg-brand-50 dark:bg-brand-950/60 px-3.5 py-1 text-sm font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
              {whyHireTag}
            </span>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 break-words">
              {whyHireTitle}
            </h2>
            <div className="sir-callout-border !my-3">
              <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                Employers access cost-effective, managed remote teams with structured support, rapid onboarding, and reliable retention.
              </p>
            </div>
          </div>

          {/* High-Resolution Infographic Showcase (Full Width & Height - All Information Visible) */}
          <div className="w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl group transition-all duration-300 hover:shadow-brand-500/10">
            <div className="relative w-full aspect-[1536/1024] bg-slate-950/5 dark:bg-slate-950/40">
              <SmartImage
                src={whyHireImage}
                alt={whyHireTitle}
                className="w-full h-full object-contain object-center brightness-105 sm:brightness-110 contrast-[1.04] saturate-[1.05]"
              />
            </div>
          </div>

          {/* 3 Core Value Pillar Cards */}
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-3">
            {valuePillars.map((pillar) => (
              <article
                key={pillar.title}
                className="sir-card-accent p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">{pillar.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">{pillar.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* SERVICE LINES (Blue Palette) */}
      <section className="bg-brand-600 dark:bg-brand-900 py-16 sm:py-20 text-white transition-colors border-t border-brand-500/50 dark:border-brand-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-md bg-white/20 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white border border-white/30 backdrop-blur-sm mb-2">
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
                className="flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900/95 p-6 shadow-md border border-white/80 dark:border-slate-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">
                    {line.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                    {line.body}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <a
              href="https://forms.gle/wydDfQ8Y9GduXxi26"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-brand-700 shadow-md transition hover:bg-brand-50 hover:text-brand-800 w-full sm:w-auto"
            >
              <span>Fill Employer Inquiry Form</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            <Link
              to="/jobs/opportunities"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/10 px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-white hover:text-brand-800 w-full sm:w-auto"
            >
              <span>Explore Pricing &amp; Packages</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FULL AMAZON GROWTH AGENCY SUPPORT (Pattern A: Canvas) */}
      <Section pattern="canvas" id="amazon-growth-agency">
        <div className="sir-card-accent p-6 sm:p-10 lg:p-12 border-2 border-brand-500/30 dark:border-brand-500/20">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-10 items-center">
            <div className="space-y-4 min-w-0">
              <span className="sir-tag">
                {amazonTag}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 break-words">
                {amazonTitle}
              </h2>
              <div className="sir-callout-border !my-3">
                <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
                  {amazonSubtitle}
                </p>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {amazonBody}
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold">
                {amazonCapabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-brand-500"></span>
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xl bg-slate-900/10 dark:bg-slate-900/60 aspect-[4/3] sm:aspect-[16/11] w-full">
              <SmartImage
                src={amazonImage}
                alt={amazonTitle}
                className="h-full w-full object-cover object-center brightness-105 sm:brightness-110 contrast-[1.03] saturate-[1.05] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-200/80 dark:border-slate-800 grid gap-6 md:grid-cols-2">
            {amazonAgencyServices.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl bg-brand-600 hover:bg-brand-700 dark:bg-brand-700 dark:hover:bg-brand-600 p-6 sm:p-7 text-white shadow-md border border-brand-500/80 dark:border-brand-600/80 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider text-white bg-white/20 border border-white/30 backdrop-blur-xs">
                    {service.tag}
                  </span>
                  <h3 className="mt-4 font-serif text-lg sm:text-xl font-bold !text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-blue-50/95 dark:text-blue-100 font-normal">
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
            <a
              href={clientFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sir-btn-primary py-2.5 px-5 text-xs uppercase tracking-wider font-extrabold whitespace-nowrap group"
            >
              <span>Request This Service</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </Section>

      {/* STRATEGIC IMPACT SOURCING (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="space-y-8 sm:space-y-10">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-block rounded-md bg-brand-50 dark:bg-brand-950/60 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 shadow-2xs mb-3">
              Purpose &amp; Delivery Alignment
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              {strategicImpactTag}
            </h2>
          </div>

          {/* High-Resolution Feature Infographic Showcase (Full Width & Uncropped Height) */}
          <div className="w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl group transition-all duration-300 hover:shadow-brand-500/10">
            <div className="relative w-full aspect-[1536/1024] bg-slate-950/5 dark:bg-slate-950/40">
              <SmartImage
                src={strategicImpactImage}
                alt="Strategic impact sourcing - High-performance business investment, not charity"
                className="w-full h-full object-contain object-center brightness-105 sm:brightness-110 contrast-[1.04] saturate-[1.05]"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* OPERATIONAL EXCELLENCE (Blue Palette) */}
      <section className="bg-brand-600 dark:bg-brand-900 py-16 sm:py-20 text-white transition-colors border-t border-brand-500/50 dark:border-brand-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-md bg-white/20 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white border border-white/30 backdrop-blur-sm mb-2">
              Operational excellence
            </span>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight !text-white">
              Quality assurance embedded in every delivery
            </h2>
          </div>

          <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 sm:grid-cols-3">
            {qualityPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900/95 p-6 shadow-md border border-white/80 dark:border-slate-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                    {pillar.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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

