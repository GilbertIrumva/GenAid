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
      heroImage="/gen jobs/IMG_20260630_104952_312.jpg"
    >
      {/* PROFILE PILLARS (Pattern A: Canvas) */}
      <Section pattern="canvas" className="!pt-4 sm:!pt-6">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-4 sm:space-y-6">
            <span className="sir-tag">
              Profile Pillars
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 lg:text-4xl break-words">
              Vetted digital professionals built for global delivery
            </h2>
            <div className="sir-callout-border !my-2 sm:!my-3">
              <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                Our talent pool in Kakuma is equipped with multilingual communication, technical proficiency, and high commitment to long-term operational success.
              </p>
            </div>
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {profilePillars.map((pillar) => (
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

          <div className="space-y-4 sm:space-y-6">
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md aspect-[4/3] group">
              <SmartImage
                src="/gen jobs/IMG-20260529-WA0065.jpg"
                alt="Generation Jobs remote digital professional at workstation in Kakuma"
                className="h-full w-full object-cover object-[center_20%] brightness-105 sm:brightness-110 contrast-[1.04] saturate-[1.08] dark:brightness-100 dark:contrast-[1.08] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm aspect-[4/3] group">
                <SmartImage
                  src="/digital class.jpeg"
                  alt="Digital training classroom session in Kakuma"
                  className="h-full w-full object-cover object-[center_20%] brightness-105 sm:brightness-110 contrast-[1.04] saturate-[1.08] dark:brightness-100 dark:contrast-[1.08] transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm aspect-[4/3] group">
                <SmartImage
                  src="/Gradutes.webp"
                  alt="Generation Aid graduates with certificates"
                  className="h-full w-full object-cover object-[center_20%] brightness-105 sm:brightness-110 contrast-[1.04] saturate-[1.08] dark:brightness-100 dark:contrast-[1.08] transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* THE TALENT JOURNEY (BRAND BLUE PALETTE) */}
      <section className="bg-brand-600 dark:bg-brand-900 text-white py-14 sm:py-20 border-y border-brand-700 dark:border-brand-800 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-md bg-white/20 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white border border-white/30 backdrop-blur-sm">
              The talent journey
            </span>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight !text-white">
              Training and vetting for global standards
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-blue-100/90 max-w-2xl mx-auto">
              A robust four-step flow that converts dedicated learners into
              professionals prepared for immediate contribution.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((step, index) => (
              <article
                key={step.title}
                className="rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-5 sm:p-6 shadow-xl border border-slate-100 dark:border-slate-800 border-t-4 border-t-brand-600 dark:border-t-brand-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <span className="sir-tag">
                    Step {index + 1}
                  </span>
                  <h3 className="mt-3 font-serif text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="rounded-2xl bg-brand-600 dark:bg-brand-900 text-white p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 shadow-xl border border-brand-500/30 dark:border-brand-800 transition-colors">
          <div className="max-w-3xl">
            <span className="inline-block rounded-md bg-white/20 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white border border-white/30 backdrop-blur-sm mb-3">
              Youth-refugee-led leadership
            </span>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight !text-white break-words">
              Rooted in Kakuma, built for global collaboration.
            </h2>
            <div className="!my-3 rounded-lg border-l-4 border-white/60 bg-white/10 p-4 sm:p-5 backdrop-blur-xs">
              <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-white/95 font-medium">
                Generation Jobs, founded by Hubert Senga under Generation Aid, is Generation Aid’s employment and sustainability arm connecting skilled refugees and host-community professionals to global work while generating revenue to strengthen the organization’s long-term sustainability.
              </p>
              <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-blue-100/90 font-medium mt-2">
                Generation Aid and Generation Jobs combine local trust, authentic leadership, and global execution standards.
              </p>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/jobs/employers"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-brand-700 shadow-md transition-all duration-200 hover:bg-slate-100 hover:shadow-lg w-full sm:w-auto text-center group"
              >
                <span>See Employer Value</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-slate-800 shadow-md transition-all duration-200 hover:bg-slate-100 hover:shadow-lg w-full sm:w-auto text-center group"
              >
                <span>About Generation Aid</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* TWO LARGE IMAGES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 pt-2">
            <div className="overflow-hidden rounded-2xl border border-white/25 shadow-2xl aspect-[4/3] group bg-brand-800/40">
              <SmartImage
                src={jobsContent?.leadershipImage || "/Hubert Senga.jpg"}
                alt="Hubert Senga, Founder and Refugee Leader"
                className="h-full w-full object-cover object-center brightness-105 sm:brightness-110 contrast-[1.04] saturate-[1.08] transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/25 shadow-2xl aspect-[4/3] group bg-brand-800/40">
              <SmartImage
                src={jobsContent?.leadershipImageSecondary || "/gen jobs/hubert-leadership-partnership.jpg"}
                alt="Hubert Senga with global partners"
                className="h-full w-full object-cover object-center brightness-105 sm:brightness-110 contrast-[1.04] saturate-[1.08] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* FEATURED TESTIMONIAL VIDEO (MICHELLE LEE) */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <span className="sir-tag">
              Partner &amp; Client Testimonial
            </span>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              Listen to the inspiring reflection shared by Michelle Lee
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Hear firsthand feedback on the talent caliber, dedication, and transformative global collaboration delivered by Generation Jobs.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-xl aspect-video w-full">
            <iframe
              src="https://www.youtube-nocookie.com/embed/VRoXjJpB854?rel=0&modestbranding=1"
              title="Testimonial: Inspiring reflection shared by Michelle Lee"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        </div>
      </Section>

      {/* TALENT MATCHING MODEL & REQUEST CTA (BRAND BLUE PALETTE) */}
      <section className="bg-brand-600 dark:bg-brand-900 text-white py-14 sm:py-20 border-y border-brand-700 dark:border-brand-800 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-md bg-white/20 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white border border-white/30 backdrop-blur-sm">
              Talent Sourcing &amp; Placement
            </span>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight !text-white">
              Custom Talent Matching for Your Business
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-blue-100/90 max-w-2xl mx-auto">
              Generation Aid maintains a managed internal database of trained, vetted refugee professionals.
              Tell us what skills you need, and our team will match qualified candidates tailored to your requirements.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6 sm:p-10 text-center max-w-3xl mx-auto shadow-2xl border border-slate-100 dark:border-slate-800">
            <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              Ready to hire trained digital talent?
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Submit a talent request with your role requirements, team size, and timeline. Our team will review our database and connect with you to discuss candidate placement.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
              <Link
                to="/contact?subject=Talent+Request"
                className="sir-btn-primary py-3.5 px-6 text-sm w-full sm:w-auto text-center justify-center font-extrabold"
              >
                <span>Submit Talent Request</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/jobs/employers"
                className="sir-btn-secondary py-3 px-6 text-sm w-full sm:w-auto text-center justify-center font-extrabold"
              >
                <span>For Employers</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </JobsShell>
  );
}

