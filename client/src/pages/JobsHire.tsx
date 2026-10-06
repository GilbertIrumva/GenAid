import { Link } from "react-router-dom";
import {
  Clock,
  BadgeDollarSign,
  TrendingUp,
  SunMedium,
  ShieldCheck,
  Globe2,
  ChevronDown,
} from "lucide-react";
import Section from "@/components/Section";
import JobsShell from "@/components/JobsShell";
import SmartImage from "@/components/SmartImage";
import GenJobsVideos from "@/components/GenJobsVideos";
import SatisfiedClients from "@/components/SatisfiedClients";
import { getJobsContent } from "@/lib/sanity";
import { useQuery } from "@tanstack/react-query";
import { useSEO } from "@/utils/useSEO";

const CLIENT_FORM_URL = "https://forms.gle/wydDfQ8Y9GduXxi26";

const keyBenefits = [
  {
    icon: Clock,
    badge: "Save Time",
    title: "Reclaim Your Hours & Skip Recruitment Fatigue",
    description:
      "Avoid spending weeks sorting through hundreds of unqualified resumes, screening applicants, and conducting endless interviews. Generation Jobs matches you with vetted, English-proficient, job-ready digital professionals within days.",
    stat: "Save 15+ hours/week",
  },
  {
    icon: BadgeDollarSign,
    badge: "Save Budget",
    title: "Cut Operational Overhead by up to 70%",
    description:
      "Access high-caliber remote talent at unmatched daily rates without the heavy expenses of local recruitment, payroll taxes, or agency fees. Plus, start with our zero-risk pilot: Month 1 at $0 and Month 2 at $250.",
    stat: "Up to 70% cost savings",
  },
  {
    icon: TrendingUp,
    badge: "Rapid Growth",
    title: "Scale Your Business Rapidly & Flexibly",
    description:
      "Delegate repetitive tasks, customer communications, lead generation, Amazon management, and data workflows to dedicated professionals so your business can move faster, take on more clients, and expand sustainably.",
    stat: "Deploy in 3-5 days",
  },
  {
    icon: SunMedium,
    badge: "Peace of Mind",
    title: "Focus on High Duties — Or Take a Real Holiday!",
    description:
      "Focus your energy on strategic growth, core product innovation, and high-value partnerships — or disconnect and take a well-deserved vacation knowing your day-to-day operations are handled reliably by competent team members.",
    stat: "100% peace of mind",
  },
  {
    icon: ShieldCheck,
    badge: "Managed Delivery",
    title: "Turnkey Infrastructure, Hardware & QA Oversight",
    description:
      "We provide modern workstations, reliable solar & generator backup power, high-speed fiber internet, and active project management inside our Kakuma BPO center. You get consistent, reliable uptime.",
    stat: "Managed workstation hub",
  },
  {
    icon: Globe2,
    badge: "Real Impact",
    title: "Drive Measurable ESG & Life-Changing Impact",
    description:
      "Every contract creates dignified, direct employment for refugees and host-community youth in Kakuma. You're not just hiring talent — you are directly breaking the cycle of aid dependency through economic self-reliance.",
    stat: "Direct social impact",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Fill Out the Client Form",
    description:
      "Complete our quick 2-minute request form with your role needs, preferred skills, working hours, and timeline.",
  },
  {
    step: "02",
    title: "Review Matched Candidates",
    description:
      "Our team reviews your requirements and pairs you with screened, pre-vetted professionals matching your workflow.",
  },
  {
    step: "03",
    title: "Launch Your Risk-Free Pilot",
    description:
      "Begin with Month 1 at $0 (100% Free) to evaluate communication, output quality, and cultural alignment.",
  },
  {
    step: "04",
    title: "Scale With Full Support",
    description:
      "Seamlessly transition to Month 2 at $250 with ongoing supervision, QA monitoring, and HR/payroll administration.",
  },
];

const faqs = [
  {
    question: "How fast can an employer start working with talent?",
    answer:
      "Once you submit the client form, our team matches qualified candidates within 24 to 48 hours. Most pilots launch within 3 to 5 business days after role confirmation.",
  },
  {
    question: "How is internet and power reliability managed in Kakuma?",
    answer:
      "Generation Aid operates a dedicated BPO and remote delivery center equipped with redundant commercial fiber internet, solar systems, and backup power generators to ensure uninterrupted service.",
  },
  {
    question: "How does the $0 Month 1 Pilot work?",
    answer:
      "Month 1 is 100% free with zero financial commitment. If you are satisfied with performance and wish to proceed, Month 2 is offered at the subsidized pilot rate of $250. You can cancel at any time.",
  },
  {
    question: "What roles can we hire for through Generation Jobs?",
    answer:
      "We support a wide array of digital roles including Sales & Lead Generation, Google & Meta Ads, Customer Support (Email/Chat/CRM), Graphic Design, Audio/Video Transcription & Translation, Amazon Account Management, Social Media & SEO, E-Commerce operations, Data & AI Annotation, and Executive Virtual Assistance.",
  },
];

export default function JobsHire() {
  const { data: jobsContent } = useQuery({
    queryKey: ["public", "sanity", "jobsContent"],
    queryFn: getJobsContent,
    retry: false,
  });

  const formUrl = (jobsContent?.clientFormUrl as string) || CLIENT_FORM_URL;
  const title = (jobsContent?.hireHeroTitle as string) || "Scale Your Business While Empowering Global Talent";
  const subtitle = (jobsContent?.hireHeroSubtitle as string) || "Partner with dedicated, vetted refugee professionals from Kakuma. Save time, reduce costs, and scale your operations while you focus on strategic duties — or enjoy a well-deserved holiday.";

  useSEO({
    title: "Hire a Refugee | Generation Jobs",
    description:
      "Hire vetted, remote-ready refugee professionals from Kakuma. Save time, reduce overhead costs, and scale your business quickly with Generation Jobs.",
  });

  return (
    <JobsShell
      eyebrow="Hire a Refugee • Client Sign-Up"
      title={title}
      subtitle={subtitle}
      heroImage="/gen jobs/Copy of IMG_20260611_111051_050.jpg"
    >
      {/* SATISFIED CLIENTS TICKER */}
      <SatisfiedClients showTitle={true} />

      {/* VALUE HIGHLIGHT CALLOUT */}
      <Section pattern="canvas" className="!pt-4 sm:!pt-6">
        <div className="sir-card-accent p-6 sm:p-10 lg:p-12 border-2 border-brand-500/30 dark:border-brand-500/20">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
            <div className="space-y-4">
              <span className="sir-tag">
                Why Hire With Us
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                Work smarter, grow faster, and create meaningful global impact.
              </h2>
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Hiring through Generation Jobs gives you access to loyal, highly trained digital talent with built-in oversight, managed infrastructure, and a <strong className="text-brand-600 dark:text-brand-400">100% free Month 1 pilot</strong>.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sir-btn-primary py-3 px-6 text-xs sm:text-sm font-extrabold uppercase tracking-wider group"
                >
                  <span>Sign Up &amp; Request Talent (Google Form)</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
                <Link
                  to="/jobs/opportunities"
                  className="sir-btn-secondary py-3 px-5 text-xs sm:text-sm font-extrabold uppercase tracking-wider"
                >
                  <span>View Services &amp; Rates</span>
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg aspect-[4/3] group bg-slate-100 dark:bg-slate-800">
              <SmartImage
                src="/gen jobs/IMG-20260529-WA0065.jpg"
                alt="Refugee digital worker at workstation in Kakuma"
                className="h-full w-full object-cover object-[center_20%] brightness-105 sm:brightness-110 contrast-[1.04] saturate-[1.08] dark:brightness-100 dark:contrast-[1.08] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* CORE BENEFITS SECTION (BRAND BLUE PALETTE) */}
      <section className="bg-brand-600 dark:bg-brand-900 text-white py-14 sm:py-20 border-y border-brand-700 dark:border-brand-800 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-md bg-white/20 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white border border-white/30 backdrop-blur-sm">
              Client Advantages
            </span>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight !text-white">
              Tangible benefits for your business
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/90">
              Designed for startups, agencies, e-commerce stores, and global enterprises looking for agility, high output, and cost optimization.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {keyBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article
                  key={benefit.title}
                  className="relative rounded-2xl bg-white dark:bg-slate-900/95 text-slate-900 dark:text-slate-100 p-6 shadow-xl border border-white/80 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950/70 text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-brand-800 shadow-xs">
                        <Icon className="h-6 w-6 stroke-[1.9]" />
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-brand-800 dark:text-brand-300 bg-brand-100 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-700">
                        {benefit.badge}
                      </span>
                    </div>
                    <h3 className="mt-4 font-serif text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 leading-snug">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                      {benefit.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-black text-brand-700 dark:text-brand-400 uppercase tracking-wider">
                      {benefit.stat}
                    </span>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                      Guaranteed
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* PROMINENT FORM BANNER IN BENEFITS (GLASSMORPHISM WHITE ACCENT) */}
          <div className="mt-12 rounded-2xl bg-white/10 border border-white/25 p-6 sm:p-8 text-white shadow-xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-serif text-xl sm:text-2xl font-extrabold !text-white">
                Ready to free up your schedule and grow?
              </h3>
              <p className="text-sm text-white/90 max-w-xl font-medium">
                Takes just 2 minutes to submit your staffing needs. We will respond within 24–48 hours with matched profiles.
              </p>
            </div>
            <a
              href={CLIENT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-brand-700 shadow-md transition hover:bg-brand-50 hover:text-brand-800 shrink-0 w-full sm:w-auto"
            >
              <span>Fill Client Request Form ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / ONBOARDING FLOW */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sir-tag">
            Simple 4-Step Process
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            How to hire a refugee professional
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            From initial request to active day-to-day collaboration in under a week.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((item) => (
            <article
              key={item.step}
              className="sir-card-accent p-6 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block rounded-md bg-brand-100 dark:bg-brand-900/60 px-3 py-1 text-xs font-black text-brand-700 dark:text-brand-300">
                  Step {item.step}
                </span>
                <h3 className="mt-4 font-serif text-lg font-extrabold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* VIDEO / TESTIMONIAL SHOWCASE */}
      <GenJobsVideos />

      {/* FAQS SECTION */}
      <Section pattern="soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sir-tag">
            Questions &amp; Answers
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto grid gap-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm open:shadow-md transition-all duration-200"
            >
              <summary className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 cursor-pointer list-none flex items-center justify-between gap-4">
                <span>{faq.question}</span>
                <ChevronDown className="h-5 w-5 text-brand-600 dark:text-brand-400 transition-transform duration-200 group-open:rotate-180 shrink-0" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {/* FINAL HIGH-IMPACT CALL TO ACTION */}
      <section className="bg-brand-600 dark:bg-brand-900 text-white py-12 sm:py-20 border-y border-brand-700 dark:border-brand-800">
        <div className="mx-auto max-w-4xl text-center px-4 space-y-4">
          <span className="inline-block rounded-md bg-white/20 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white border border-white/30 backdrop-blur-sm">
            Client Request
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight !text-white">
            Hire talent. Grow your business. Change a life.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white/90 max-w-2xl mx-auto">
            Fill out our simple client form today to start your free 1-month pilot with zero obligation.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-brand-700 shadow-md transition hover:bg-brand-50 hover:text-brand-800 w-full sm:w-auto"
            >
              <span>Open Client Form (Google Form) ↗</span>
            </a>
            <Link
              to="/jobs/opportunities"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/10 px-7 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-white hover:text-brand-800 w-full sm:w-auto"
            >
              <span>Explore Services &amp; Pricing</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </JobsShell>
  );
}
