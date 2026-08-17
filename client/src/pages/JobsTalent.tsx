import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Section from "@/components/Section";
import JobsShell from "@/components/JobsShell";
import SmartImage from "@/components/SmartImage";
import { talentProfiles as fallbackProfiles } from "@/data/talentProfiles";
import {
  getTalentProfiles,
  getJobsContent,
  mapSanityTalentProfileToRecord,
} from "@/lib/sanity";
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

  const { data: sanityProfiles = [] } = useQuery({
    queryKey: ["jobs", "sanity", "talent-profiles"],
    queryFn: getTalentProfiles,
    retry: false,
  });

  const { data: jobsContent } = useQuery({
    queryKey: ["sanity", "jobs-content"],
    queryFn: getJobsContent,
    retry: false,
  });

  const profiles =
    sanityProfiles.length > 0
      ? sanityProfiles.map(mapSanityTalentProfileToRecord)
      : fallbackProfiles;

  return (
    <JobsShell
      eyebrow="Talent ecosystem"
      title="Unlocking global talent from Kakuma"
      subtitle="Generation Jobs transforms trained potential into globally deployable talent through a rigorous journey and quality assurance model."
    >
      {/* PROFILE PILLARS (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="grid gap-6 lg:grid-cols-2">
          {profilePillars.map((pillar) => (
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

      {/* THE TALENT JOURNEY (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            The talent journey
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-heading dark:text-slate-50 sm:text-4xl">
            Training and vetting for global standards
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-body dark:text-slate-300">
            A robust four-step flow that converts dedicated learners into
            professionals prepared for immediate contribution.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {journey.map((step, index) => (
            <article
              key={step.title}
              className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Step {index + 1}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold text-neutral-heading dark:text-slate-100">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">{step.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* LEADERSHIP (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="grid gap-6 rounded-2xl border border-neutral-border dark:border-slate-700 bg-brand-50/50 dark:bg-slate-800/50 p-6 shadow-sm sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Youth-refugee-led leadership
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-heading dark:text-slate-50 sm:text-4xl">
              Rooted in Kakuma, built for global collaboration.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-body dark:text-slate-300">
              Founded in Kakuma by refugee leader Hubert Senga, Generation Aid
              and Generation Jobs combine local trust, authentic leadership, and
              global execution standards.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/jobs/employers"
                className="inline-flex items-center rounded-lg bg-brand-600 dark:bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 dark:hover:bg-brand-400"
              >
                See employer value
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center rounded-lg border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-3 text-sm font-semibold text-neutral-heading dark:text-slate-100 transition hover:border-brand-600 dark:hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400"
              >
                About Generation Aid
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm aspect-[4/3] relative">
            <SmartImage
              src={jobsContent?.leadershipImage || "/hubert.jpg"}
              alt="Hubert Senga — Founder and Refugee Leader"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Section>

      {/* SAMPLE TALENT PROFILES (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            User profiles
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-heading dark:text-slate-50 sm:text-4xl">
            Sample talent profiles
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-body dark:text-slate-300">
            View profile pages for candidates currently in the Generation Jobs
            placement pipeline.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {profiles.map((profile) => (
            <article
              key={profile.slug}
              className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {profile.readiness}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-neutral-heading dark:text-slate-100">
                  {profile.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-neutral-heading/80 dark:text-slate-300">
                  {profile.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">
                  {profile.location}
                </p>
              </div>
              <Link
                to={`/jobs/talent/${profile.slug}`}
                className="mt-5 inline-flex items-center text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline underline-offset-4"
              >
                Open profile →
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </JobsShell>
  );
}
