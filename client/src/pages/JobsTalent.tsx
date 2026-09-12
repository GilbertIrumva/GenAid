import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Section from "@/components/Section";
import JobsShell from "@/components/JobsShell";
import SmartImage from "@/components/SmartImage";
import { getJobsContent } from "@/lib/sanity";
import { useSEO } from "@/utils/useSEO";

const profilePillars = [
  {
    title: "Multilingual communication",
    body: "Fluency in English (minimum B2), French, Swahili, and Arabic supports global customer and operations workflows.",
  },
  {
    title: "Technical proficiency",
    body: "Strong digital literacy, fast typing, and practical use of BPO tools shaped by market-driven training.",
  },
  {
    title: "Human + AI readiness",
    body: "Talent prepared for prompt testing, data workflows, and hybrid human-in-the-loop operations.",
  },
  {
    title: "Loyalty and retention",
    body: "A highly motivated workforce with low attrition and strong commitment to long-term growth.",
  },
];

const journey = [
  {
    title: "Training",
    body: "Intensive digital literacy, English communication, and vocational pathways build strong baseline capability.",
  },
  {
    title: "Vetting",
    body: "Selection criteria cover technical proficiency, communication, adaptability, and reliability.",
  },
  {
    title: "Placement",
    body: "Talent is matched to client needs with role clarity, onboarding support, and manager supervision.",
  },
  {
    title: "Ongoing support",
    body: "Continuous mentoring, QA feedback, and performance follow-up secure sustained professional growth.",
  },
];

export default function JobsTalent() {
  useSEO({
    title: "Generation Jobs | Talent Model",
    description:
      "See how Generation Aid training, vetting, and support produce multilingual, remote-ready professionals through Generation Jobs.",
  });

  const { data: jobsContent } = useQuery({
    queryKey: ["sanity", "jobs-content"],
    queryFn: getJobsContent,
    retry: false,
  });

  return (
    <JobsShell
      eyebrow="Talent ecosystem"
      title="Unlocking global talent from Kakuma"
      subtitle="Generation Jobs transforms trained potential into globally deployable talent through a rigorous journey and quality assurance model."
    >
      {/* PROFILE PILLARS (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <span className="sir-tag">
              Profile Pillars
            </span>
            <h2 className="font-serif text-3xl font-extrabold text-slate-900 dark:text-slate-50 sm:text-4xl">
              Vetted digital professionals built for global delivery
            </h2>
            <div className="sir-callout-border !my-3">
              <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                Our talent pool in Kakuma is equipped with multilingual communication, technical proficiency, and high commitment to long-term operational success.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {profilePillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="sir-card-accent p-5"
                >
                  <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">{pillar.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">{pillar.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md aspect-[4/3] group">
              <SmartImage
                src="/remote employee.webp"
                alt="Generation Jobs remote digital professional at workstation"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm aspect-video group">
                <SmartImage
                  src="/digital class.jpeg"
                  alt="Digital training classroom session in Kakuma"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm aspect-video group">
                <SmartImage
                  src="/Gradutes.webp"
                  alt="Generation Aid graduates with certificates"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* THE TALENT JOURNEY (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sir-tag">
            The talent journey
          </span>
          <h2 className="mt-3 font-serif text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            Training and vetting for global standards
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            A robust four-step flow that converts dedicated learners into
            professionals prepared for immediate contribution.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((step, index) => (
            <article
              key={step.title}
              className="sir-card p-6 border-t-4 border-t-brand-600 dark:border-t-brand-500"
            >
              <span className="sir-tag">
                Step {index + 1}
              </span>
              <h3 className="mt-3 font-serif text-xl font-extrabold text-slate-900 dark:text-slate-100">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{step.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* LEADERSHIP (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="sir-card-accent p-6 sm:p-8 lg:p-10 lg:grid-cols-[1.1fr_0.9fr] grid gap-8 items-center">
          <div>
            <span className="sir-tag">
              Youth-refugee-led leadership
            </span>
            <h2 className="mt-3 font-serif text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
              Rooted in Kakuma, built for global collaboration.
            </h2>
            <div className="sir-callout-border !my-3">
              <p className="max-w-2xl text-base leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                Founded in Kakuma by refugee leader Hubert Senga, Generation Aid
                and Generation Jobs combine local trust, authentic leadership, and
                global execution standards.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/jobs/employers"
                className="sir-btn-primary py-3 px-6 text-sm"
              >
                <span>See Employer Value</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/about"
                className="sir-btn-secondary py-3 px-6 text-sm"
              >
                <span>About Generation Aid</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md aspect-[4/3] relative group">
            <SmartImage
              src={jobsContent?.leadershipImage || "/hubert.jpg"}
              alt="Hubert Senga — Founder and Refugee Leader"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </Section>

      {/* TALENT MATCHING MODEL & REQUEST CTA (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sir-tag">
            Talent Sourcing & Placement
          </span>
          <h2 className="mt-3 font-serif text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            Custom Talent Matching for Your Business
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Generation Aid maintains a managed internal database of trained, vetted refugee professionals.
            Tell us what skills you need, and our team will match qualified candidates tailored to your requirements.
          </p>
        </div>

        <div className="mt-10 sir-card-accent p-8 text-center max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            Ready to hire trained digital talent?
          </h3>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Submit a talent request with your role requirements, team size, and timeline. Our team will review our database and connect with you to discuss candidate placement.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact?subject=Talent+Request"
              className="sir-btn-primary py-3.5 px-6 text-sm"
            >
              <span>Submit Talent Request</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/jobs/employers"
              className="sir-btn-secondary py-3 px-6 text-sm"
            >
              <span>For Employers</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </Section>
    </JobsShell>
  );
}

