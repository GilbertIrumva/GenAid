import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";

const APPLY_FORM_URL = "https://forms.gle/ye7o2b2UZi7PJeKEA";
const FULL_PDF_URL = "https://drive.google.com/file/d/1r5EdJ4tH_3QMEqiVIq7O7dlru42tlkDu/view?usp=sharing";

const requirements = [
  "Strong English communication skills",
  "Current university student or recent graduate (specialization in humanitarian, development, or policy-related fields preferred but not required)",
  "Relevant skills or experience aligned with your chosen track (communications, digital skills, education, fundraising, etc.)",
  "Demonstrated passion for refugee empowerment and community-led initiatives",
  "Commitment to ethical, community-led engagement",
  "Minimum availability of 4 weeks",
  "Respect for cultural diversity and sensitivity to refugee contexts",
];

const programHighlights = [
  {
    title: "Program Duration",
    value: "4 weeks minimum",
    desc: "Flexible commitment tailored for immersive field experience.",
  },
  {
    title: "Deadline",
    value: "No deadline",
    desc: "Rolling submissions — apply whenever you are ready.",
  },
  {
    title: "Working Hours",
    value: "Mon - Fri (9 AM - 5 PM)",
    desc: "With optional program activities on Saturdays.",
  },
];

export default function Volunteer() {
  useSEO({
    title: "Get Involved — Volunteer & Internship Program",
    description:
      "Join Generation Aid as a volunteer or intern in Kakuma Refugee Camp. Equip refugee youth with digital skills, education, and social impact pathways.",
  });

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      {/* HERO SECTION */}
      <section className="relative isolate flex min-h-[55vh] items-center overflow-hidden bg-brand-900 dark:bg-slate-950 text-white transition-colors">
        <SmartImage
          src="/img/heroes/about-team-cta.jpg"
          alt="Generation Aid volunteers working together"
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/90 via-brand-900/75 to-brand-900/45 dark:from-slate-950/95 dark:via-slate-900/90 dark:to-slate-950/85"
        />
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <span className="inline-block rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
              Get Involved
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl !text-white dark:!text-white">
              Become a Volunteer & Intern
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-brand-100 dark:text-slate-200">
              Together we can restore hope and dignity to young refugee youth while building practical educational and employment pathways.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={APPLY_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white dark:bg-brand-500 px-5 py-3 text-sm font-semibold text-brand-600 dark:text-white shadow-sm transition hover:bg-brand-50 dark:hover:bg-brand-400"
              >
                Apply Here →
              </a>
              <a
                href={FULL_PDF_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/70 dark:border-slate-700 bg-white/10 dark:bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20 dark:hover:bg-slate-700"
              >
                Download PDF Description
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BECOME A VOLUNTEER SECTION */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            Join Our Community
          </span>
          <h2 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            Become a Volunteer — Together We Can
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-body dark:text-slate-300">
            Are you looking for an internship or volunteering opportunity? Join <strong className="font-semibold text-neutral-heading dark:text-slate-100">Generation Aid</strong>! We are a youth-led nonprofit organization based in Kenya’s{" "}
            <a
              href="https://en.wikipedia.org/wiki/Kakuma_Refugee_Camp"
              target="_blank"
              rel="noreferrer"
              className="text-brand-600 dark:text-brand-400 hover:underline"
            >
              Kakuma Refugee Camp
            </a>
            . Our mission is to transform lives by providing vocational skills and EdTech programs that create educational and employment pathways for refugee communities, helping them integrate into the global economy.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-body dark:text-slate-300">
            As a volunteer, you’ll help restore hope and dignity to young refugee youth, making a meaningful impact with your skills. Join us and be part of a dedicated community making a positive global difference.
          </p>
        </div>

        {/* 3 HIGHLIGHT BOXES */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-3">
          {programHighlights.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 text-center shadow-sm"
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {item.title}
              </h3>
              <p className="mt-2 font-display text-xl font-bold text-neutral-heading dark:text-slate-100">
                {item.value}
              </p>
              <p className="mt-2 text-xs text-neutral-body dark:text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ONSITE YOUTH INTERNSHIP PROGRAM */}
      <Section pattern="soft">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="inline-block rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
              Community-Led Initiative
            </span>
            <h2 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
              Generation Aid’s Onsite Youth Internship Program
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-body dark:text-slate-300">
              The{" "}
              <a
                href="https://generationaid.org/"
                target="_blank"
                rel="noreferrer"
                className="text-brand-600 dark:text-brand-400 hover:underline font-semibold"
              >
                Generation Aid
              </a>{" "}
              Internship Program is designed to equip young people with practical skills, real-world experience, and opportunities to contribute to meaningful social impact. As a refugee-led organization, we prioritize local leadership and ensure that all internship opportunities directly benefit the communities we serve.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h3 className="font-display text-xl font-bold text-neutral-heading dark:text-slate-100">
                Mentorship & Field Exposure
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">
                Interns work directly under a mentor, receiving guidance and support while contributing to real projects, developing practical advocacy skills, and gaining hands-on experience in community-led initiatives.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">
                For international interns, the program offers valuable field exposure through direct engagement with grassroots community initiatives right in Kakuma.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h3 className="font-display text-xl font-bold text-neutral-heading dark:text-slate-100">
                Program Information
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-neutral-body dark:text-slate-300">
                <li>
                  <strong className="text-neutral-heading dark:text-slate-100">Duration:</strong> 4 weeks minimum
                </li>
                <li>
                  <strong className="text-neutral-heading dark:text-slate-100">Deadline:</strong> No deadline — submit at your convenience
                </li>
                <li>
                  <strong className="text-neutral-heading dark:text-slate-100">Working Hours:</strong> 9 AM – 5 PM (Mon – Fri), with optional Saturday activities
                </li>
              </ul>
            </div>
          </div>

          {/* FINANCIAL STIPEND & FEES */}
          <div className="mt-8 rounded-2xl border border-brand-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm sm:p-8">
            <h3 className="font-display text-2xl font-bold text-neutral-heading dark:text-slate-100">
              Stipend & Fee Structure
            </h3>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-brand-100 dark:border-slate-700 bg-brand-50/50 dark:bg-slate-900/50 p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  Local & Regional Interns
                </span>
                <p className="mt-2 font-display text-2xl font-bold text-neutral-heading dark:text-slate-100">
                  5,000 KSH / month
                </p>
                <p className="mt-2 text-xs text-neutral-body dark:text-slate-300">
                  Stipend provided for refugee interns and interns originating from Kenya territories.
                </p>
              </div>

              <div className="rounded-xl border border-brand-100 dark:border-slate-700 bg-brand-50/50 dark:bg-slate-900/50 p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  International Interns
                </span>
                <p className="mt-2 font-display text-2xl font-bold text-neutral-heading dark:text-slate-100">
                  $620 USD / month
                </p>
                <ul className="mt-3 space-y-1 text-xs text-neutral-body dark:text-slate-300">
                  <li>• <strong>$540 USD</strong> — Accommodation fee</li>
                  <li>• <strong>$40 USD</strong> — Transportation fee (compound to field & return)</li>
                  <li>• <strong>$40 USD</strong> — Donation to support Generation Aid program activities</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30 p-4 text-xs leading-relaxed text-amber-900 dark:text-amber-200">
              <strong>NOTE ON MEALS:</strong> Interns are responsible for their own food. Accommodation is fully equipped with an outdoor kitchen, and there are grocery stores and local restaurants nearby in Kakuma town.
            </div>
          </div>
        </div>
      </Section>

      {/* REQUIREMENTS FOR INTERNATIONAL INTERNS */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
              Applicant Criteria
            </span>
            <h2 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
              Requirements for International Interns
            </h2>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-1 md:grid-cols-2">
            {requirements.map((req, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-xs"
              >
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 dark:bg-brand-500 text-white text-xs font-bold">
                  ✓
                </div>
                <p className="text-sm text-neutral-heading dark:text-slate-200">
                  {req}
                </p>
              </div>
            ))}
          </div>

          {/* APPLICATION CTAS */}
          <div className="mt-12 rounded-2xl border border-brand-200 dark:border-slate-700 bg-brand-600 dark:bg-slate-950 p-8 text-center text-white shadow-md">
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Ready to Make a Difference?
            </h3>
            <p className="mt-3 text-sm text-brand-100 dark:text-slate-300 max-w-xl mx-auto">
              Before applying, please read the full program description, then submit your application via Google Forms. We can’t wait to receive your application!
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={APPLY_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white dark:bg-brand-500 px-6 py-3 text-sm font-semibold text-brand-600 dark:text-white shadow-sm transition hover:bg-brand-50 dark:hover:bg-brand-400"
              >
                APPLY HERE →
              </a>
              <a
                href={FULL_PDF_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/80 dark:border-slate-700 bg-white/10 dark:bg-slate-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20 dark:hover:bg-slate-700"
              >
                Read Full Description (PDF)
              </a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
