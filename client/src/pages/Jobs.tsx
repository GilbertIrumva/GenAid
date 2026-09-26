import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import JobsShell from "@/components/JobsShell";
import SmartImage from "@/components/SmartImage";
import SatisfiedClients from "@/components/SatisfiedClients";
import GenJobsVideos from "@/components/GenJobsVideos";
import { getJobsContent } from "@/lib/sanity";
import { useSEO } from "@/utils/useSEO";

const genJobsHeroSlides = [
  {
    src: "/gen jobs/home slide images (1).jpg",
    alt: "Generation Jobs remote professionals at work in Kakuma",
  },
  {
    src: "/gen jobs/home slide images (2).jpg",
    alt: "Refugee talent providing global digital services",
  },
  {
    src: "/gen jobs/home slide images (3).jpg",
    alt: "Tech and BPO operations at Generation Aid hub",
  },
  {
    src: "/gen jobs/home slide images (1).jpeg",
    alt: "High-performance digital delivery from Kakuma",
  },
];

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
    title: "Customer Support (Email, Chat & CRM)",
    body: "Multi-channel ticket handling, live chat, customer retention, and CRM management for client-facing teams.",
  },
  {
    title: "Google Ads & Meta Ads",
    body: "Paid performance advertising, audience targeting, ROAS optimization, and multi-channel campaign funnels.",
  },
  {
    title: "Graphic Design",
    body: "Brand visual assets, social media creatives, ad banners, marketing decks, and design production.",
  },
  {
    title: "Transcripts & Translation",
    body: "Accurate multi-speaker transcription, timecoding, and professional multi-language translation and localization.",
  },
  {
    title: "Full Amazon Growth Agency Support",
    body: "Brands/suppliers acquisition, total account management, catalog hygiene, variations, and Seller Support case handling.",
  },
  {
    title: "Virtual Assistance & Admin",
    body: "Scheduling, inbox management, operational research, executive support, and workflow coordination.",
  },
  {
    title: "Data & AI Operations",
    body: "Data entry, human-in-the-loop annotation, AI prompt evaluation, and back-office process management.",
  },
  {
    title: "Custom Remote Placements",
    body: "Flexible placements tailored around your company's specific stack, workflow demands, and team structure.",
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

  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % genJobsHeroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const heroTitle = jobsContent?.overviewHeroTitle || "Empowering Global Growth with Remote Talent from Kakuma";
  const heroSubtitle =
    jobsContent?.overviewHeroSubtitle ||
    "For international employers seeking reliable remote talent: access vetted candidates through a trusted training-to-placement pipeline built by Generation Aid.";

  return (
    <JobsShell
      eyebrow="Generation Jobs Initiative"
      title={heroTitle}
      subtitle={heroSubtitle}
      customHero={
        <section className="relative w-full overflow-hidden min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex items-center bg-[#172554] gatsby-hero-bg">
          {/* Full Width Cinematic Sliding Video-Like Reel (No dots, no arrows, continuous flow) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {genJobsHeroSlides.map((slide, index) => {
              const isActive = index === heroSlideIndex;
              return (
                <motion.div
                  key={slide.src}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? [1, 1.08] : 1,
                    x: isActive ? [0, index % 2 === 0 ? -12 : 12] : 0,
                  }}
                  transition={{
                    opacity: { duration: 1.8, ease: "easeInOut" },
                    scale: { duration: 6.5, ease: "linear" },
                    x: { duration: 6.5, ease: "linear" },
                  }}
                  className={`absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)] ${isActive ? "z-[1]" : "z-0"
                    }`}
                >
                  <SmartImage
                    src={slide.src}
                    alt={slide.alt}
                    fallbackLabel=""
                    className="h-full w-full object-cover contrast-[1.12] brightness-[0.85] saturate-[1.08]"
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Deep Royal Blue Gradient Overlay */}
          <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#172554]/95 via-[#172554]/85 to-[#172554]/55 pointer-events-none" />

          {/* Hero Content Box */}
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl text-white space-y-4"
            >
              <span className="inline-block rounded-md bg-white/20 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white border border-white/30 backdrop-blur-sm">
                Generation Jobs Initiative
              </span>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl font-serif leading-[1.12] !text-white">
                Empowering Global Growth with Remote Talent from Kakuma
              </h1>

              <div className="sir-callout-border border-l-white !text-white !my-3">
                <p className="text-sm sm:text-base leading-relaxed font-medium !text-white">
                  {heroSubtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/jobs/employers"
                  className="sir-btn-primary py-2.5 px-5 text-xs sm:text-sm font-extrabold uppercase tracking-wider"
                >
                  <span>Employer Inquiries</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  to="/jobs/talent"
                  className="sir-btn-secondary py-2.5 px-5 text-xs sm:text-sm font-extrabold uppercase tracking-wider border-white/60 text-white hover:bg-white hover:text-slate-950 dark:border-white/60 dark:text-white"
                >
                  <span>Talent Consultation</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
                <a
                  href="#about-jobs"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white/80 hover:text-white transition-colors"
                >
                  <span>Learn Overview</span>
                  <span>↓</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      }
    >
      {/* SATISFIED CLIENTS / SERVED CLIENTS TICKER */}
      <SatisfiedClients showTitle={true} />

      {/* OVERVIEW: ABOUT GENERATION JOBS (FIRST SECTION) */}
      <Section id="about-jobs" pattern="canvas" className="!pt-4 sm:!pt-6 scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <span className="sir-tag">
              Overview
            </span>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 uppercase">
              About Generation Jobs
            </h2>
          </div>

          <div className="sir-card-accent p-6 sm:p-10 space-y-6 text-base leading-relaxed text-slate-700 dark:text-slate-300">
            <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
              Generation Jobs is positioned as Generation Aid’s employment and sustainability arm but its role is broader than simply generating revenue. Generation Jobs is the employment and social-enterprise arm of Generation Aid, created to turn skills into income while building a sustainable revenue engine for Generation Aid’s non profit mission.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 pt-2">
              <div className="rounded-xl border border-brand-200/80 dark:border-brand-900/60 bg-white/90 dark:bg-slate-900/80 p-5 shadow-sm">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800">
                  Generation Aid
                </span>
                <h3 className="mt-3 font-serif font-bold text-slate-900 dark:text-slate-100 text-base">
                  Nonprofit &amp; Impact Engine
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Provides education, digital skills, language training, entrepreneurship, and career preparation.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-200/80 dark:border-emerald-900/60 bg-white/90 dark:bg-slate-900/80 p-5 shadow-sm">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                  Generation Jobs
                </span>
                <h3 className="mt-3 font-serif font-bold text-slate-900 dark:text-slate-100 text-base">
                  Economic &amp; Sustainability Engine
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Converts those skills into paid work. This is consistent with Generation Aid’s public description of Generation Jobs as connecting trained refugees and host-community members with remote and global clients through BPO and digital services.
                </p>
              </div>
            </div>

            <p className="pt-2 text-sm sm:text-base border-t border-slate-200/80 dark:border-slate-800 leading-relaxed">
              Generation Aid is the nonprofit and impact engine. It provides education, digital skills, language training, entrepreneurship, and career preparation. Generation Jobs is the economic engine that converts those skills into paid work. This is consistent with Generation Aid’s public description of Generation Jobs as connecting trained refugees and host-community members with remote and global clients through BPO and digital services.
            </p>

            <div className="rounded-xl border-l-4 border-brand-600 bg-brand-50/70 dark:bg-slate-800/80 p-5 sm:p-6 mt-4 grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-center">
              <div>
                <span className="sir-tag mb-2">
                  Youth-refugee-led leadership
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                  Rooted in Kakuma, built for global collaboration.
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                  Generation Jobs, founded by Hubert Senga under Generation Aid, is Generation Aid’s employment and sustainability arm connecting skilled refugees and host-community professionals to global work while generating revenue to strengthen the organization’s long-term sustainability.
                </p>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                  Generation Aid and Generation Jobs combine local trust, authentic leadership, and global execution standards.
                </p>
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm aspect-[4/3] group">
                <SmartImage
                  src="/gen jobs/IMG-20260318-WA0031 - Copy.jpg"
                  alt="Generation Jobs team and global collaboration partners in Kakuma"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* HERO BANNER (Pattern B: Soft) */}
      <Section pattern="soft">
        <div className="sir-card-accent p-4 sm:p-8 lg:p-10 lg:grid-cols-[1.1fr_0.9fr] grid gap-6 sm:gap-8 items-center">
          <div className="space-y-4 min-w-0">
            <span className="sir-tag">
              Connect With Us
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
              src="/gen jobs/Copy of IMG_20260611_111051_050.jpg"
              alt="BPO Delivery Center and Workstations in Kakuma with UNHCR and Australian Aid partners"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </Section>

      {/* MARKET PROBLEM */}
      <Section pattern="canvas">
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

          {/* Partnership Banner with Konexio & Generation Aid */}
          <div className="mt-10 rounded-2xl overflow-hidden border border-white/20 bg-white/10 p-5 sm:p-7 backdrop-blur-sm grid md:grid-cols-[1fr_1.1fr] gap-6 items-center">
            <div className="space-y-3">
              <span className="inline-block rounded-md bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white border border-white/30">
                Partners in Enabling Impact
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-white">
                Konexio Africa &amp; Generation Aid
              </h3>
              <p className="text-sm text-white/90 leading-relaxed font-medium">
                Our training and economic empowerment pathways are powered through robust on-the-ground collaboration with Konexio Africa and global facilitators, preparing high-caliber digital professionals directly in Kakuma.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border border-white/20 shadow-md aspect-[16/10] group">
              <SmartImage
                src="/gen jobs/IMG_20260630_104952_312.jpg"
                alt="Generation Aid and Konexio Africa partnership team in Kakuma"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
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

      {/* ============ GENERATION JOBS VIDEO SHOWCASE & TESTIMONIALS ============ */}
      <GenJobsVideos />

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

