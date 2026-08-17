import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";
import { SITE } from "@/data/site";

interface ImpactMetric {
  _id: string;
  title: string;
  value: number;
  icon: string;
  order: number;
}

interface Story {
  _id: string;
  title: string;
  summary: string;
  image: string;
  author: string;
  createdAt: string;
}

function formatValue(n: number): string {
  if (n >= 1_000_000)
    return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M+`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}k+`;
  return `${n.toLocaleString()}`;
}

const outcomeAreas = [
  {
    title: "Education access",
    body: "Affordable, market-relevant courses in ICT, English and craft skills — taught by trainers from the community.",
    kpi: "85% course completion rate",
  },
  {
    title: "Employment pathways",
    body: "Job-readiness coaching, CV clinics and direct placements with NGOs and local businesses inside the camp.",
    kpi: "1 in 3 graduates placed within 6 months",
  },
  {
    title: "Entrepreneurship",
    body: "Seed kits, mentorship and business training for graduates launching tailoring, ICT and service ventures.",
    kpi: "40+ micro-enterprises launched",
  },
  {
    title: "Community resilience",
    body: "We hire, train and lead from within Kakuma — strengthening refugee voice and long-term self-reliance.",
    kpi: "100% refugee-led team",
  },
];

const highlights = [
  {
    tag: "Cohort milestone",
    title: "Our largest ICT cohort to date",
    body: "120 learners completed our Basic ICT & Digital Literacy course in 2025 — the biggest single intake since we opened the lab.",
  },
  {
    tag: "Partnership",
    title: "First inter-camp tailoring exchange",
    body: "Graduates from our dressmaking program ran a peer-training week with women's groups in Kalobeyei, sharing curriculum and sewing patterns.",
  },
  {
    tag: "Recognition",
    title: "Featured at the Refugee-Led Innovation Forum",
    body: "Generation Aid was invited to share its EdTech model with refugee-led organisations from five East African countries.",
  },
];

const timeline = [
  {
    year: "2019",
    title: "Founded in Kakuma",
    body: "A small group of refugee youth launch Generation Aid to fill the post-secondary gap.",
  },
  {
    year: "2021",
    title: "First ICT lab opened",
    body: "We secure equipment and partner with local providers to run our first cohort of digital-literacy learners.",
  },
  {
    year: "2023",
    title: "Tailoring & English added",
    body: "Two new vocational streams launch alongside an entrepreneurship track for graduates.",
  },
  {
    year: "2025",
    title: "EdTech & livelihood scale-up",
    body: "We cross 500 lifetime learners and begin formal employer placement partnerships.",
  },
];

const metrics: ImpactMetric[] = [
  {
    _id: "impact-1",
    title: "Learners supported",
    value: 500,
    icon: "🎓",
    order: 1,
  },
  {
    _id: "impact-2",
    title: "Volunteer hours logged",
    value: 1800,
    icon: "🤝",
    order: 2,
  },
  {
    _id: "impact-3",
    title: "Community partners",
    value: 24,
    icon: "🌍",
    order: 3,
  },
  {
    _id: "impact-4",
    title: "Refugee-led initiatives",
    value: 8,
    icon: "🚀",
    order: 4,
  },
];

const fallbackStories: Story[] = [
  {
    _id: "story-1",
    title: "A youth-led coding circle in Kakuma",
    summary:
      "Young learners are building practical digital skills and confidence through our community-led program.",
    image: "/img/stories/leila.jpg",
    author: "Generation Aid team",
    createdAt: "2025-01-01",
  },
  {
    _id: "story-2",
    title: "Tailoring graduates launching small businesses",
    summary:
      "Graduates are turning new skills into income and self-reliance for their families.",
    image: "/img/stories/yusuf.jpg",
    author: "Community mentor",
    createdAt: "2025-02-01",
  },
];

export default function Impact() {
  const { t } = useTranslation();
  useSEO({
    title: "Our impact",
    description:
      "Numbers, reports, and stories that show what refugee-led innovation is delivering in Kakuma.",
  });

  const featuredStories = fallbackStories.slice(0, 3);

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      {/* HERO (Pattern C: Solid Primary Blue Impact) */}
      <section className="relative isolate overflow-hidden bg-brand-900 dark:bg-slate-950 text-white transition-colors">
        <SmartImage
          src="/img/heroes/impact.jpg"
          alt="Refugee youth working on computers"
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-950/90 via-brand-900/75 to-brand-900/45 dark:from-slate-950/95 dark:via-slate-900/90 dark:to-slate-950/85"
        />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            {t("impact.hero.eyebrow")}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl !text-white dark:!text-white">
            {t("impact.hero.titleStart")}{" "}
            <span className="text-white">
              {t("impact.hero.titleHighlight")}
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-brand-100 sm:text-lg">
            {t("impact.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* METRICS (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-heading dark:text-slate-50 sm:text-3xl">
              {t("impact.byTheNumbers")}
            </h2>
            <p className="mt-1 text-sm text-neutral-body dark:text-slate-300">
              {t("impact.byTheNumbersSubtitle")}
            </p>
          </div>
        </div>

        {metrics.length === 0 ? (
          <p className="rounded-xl border border-dashed border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-8 text-center text-sm text-neutral-body dark:text-slate-400">
            {t("impact.metricsEmpty")}
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m._id}
                className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
              >
                <div className="font-display text-4xl font-bold text-brand-600 dark:text-brand-400">
                  {formatValue(m.value)}
                </div>
                <p className="mt-2 text-sm font-semibold text-neutral-heading dark:text-slate-100">{m.title}</p>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* OUTCOME AREAS / WHAT WE MEASURE (Pattern C: Solid Primary Blue Impact) */}
      <Section pattern="impact">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
            {t("impact.outcomesEyebrow")}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            {t("impact.outcomesTitle")}
          </h2>
          <p className="mt-4 text-base text-brand-100 dark:text-slate-300">
            {t("impact.outcomesSubtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {outcomeAreas.map((o) => (
            <div
              key={o.title}
              className="flex flex-col rounded-xl border border-white/20 bg-white dark:bg-slate-800 p-6 shadow-xl text-slate-900 dark:text-white transition hover:scale-[1.02]"
            >
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
                {o.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-300">{o.body}</p>
              <p className="mt-4 border-t border-slate-200 dark:border-slate-700 pt-3 text-xs font-bold uppercase tracking-wide text-brand-600 dark:text-brand-400">
                {o.kpi}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* HIGHLIGHTS (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-heading dark:text-slate-50 sm:text-3xl">
              {t("impact.highlightsTitle")}
            </h2>
            <p className="mt-1 text-sm text-neutral-body dark:text-slate-300">
              {t("impact.highlightsSubtitle")}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((h) => (
            <article
              key={h.title}
              className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm"
            >
              <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-700 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-600">
                {h.tag}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                {h.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-body dark:text-slate-300">{h.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* TIMELINE / OUR JOURNEY (Pattern C: Solid Primary Blue Impact) */}
      <Section pattern="impact">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
            {t("impact.journeyEyebrow")}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            {t("impact.journeyTitle")}
          </h2>
          <p className="mt-4 text-base text-brand-100 dark:text-slate-300">
            {t("impact.journeySubtitle")}
          </p>
        </div>

        <ol className="relative mx-auto mt-12 max-w-3xl border-l border-white/30 dark:border-slate-700 pl-8">
          {timeline.map((t) => (
            <li key={t.year} className="relative mb-10 last:mb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[37px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-brand-600 dark:bg-brand-500 text-[10px] font-bold text-white shadow-sm"
              >
                ●
              </span>
              <p className="text-xs font-extrabold uppercase tracking-wider text-cyan-300 dark:text-brand-400">
                {t.year}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold text-white">
                {t.title}
              </h3>
              <p className="mt-1 text-sm text-brand-100 dark:text-slate-300">{t.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* STORIES PREVIEW (Pattern A: Canvas) */}
      {featuredStories.length > 0 && (
        <Section pattern="canvas">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-neutral-heading dark:text-slate-50 sm:text-3xl">
                {t("impact.behindNumbersTitle")}
              </h2>
              <p className="mt-1 text-sm text-neutral-body dark:text-slate-300">
                {t("impact.behindNumbersSubtitle")}
              </p>
            </div>
            <Link
              to="/stories"
              className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline underline-offset-4"
            >
              {t("impact.readAllStories")}
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredStories.map((s: Story) => (
              <article
                key={s._id}
                className="overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm"
              >
                {s.image ? (
                  <div className="aspect-video w-full overflow-hidden bg-brand-50 dark:bg-slate-900">
                    <SmartImage
                      src={s.image}
                      alt={s.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-brand-50 dark:bg-slate-900 text-xs text-neutral-body dark:text-slate-400">
                    No image
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                    {s.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-neutral-body dark:text-slate-300">
                    {s.summary}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-wide font-semibold text-brand-600 dark:text-brand-400">
                    {s.author}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      )}

      {/* CTA (Pattern C: Neutral Dark Impact Surface) */}
      <Section pattern="impact">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl text-white">
              {t("impact.ctaTitle")}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-300">
              {t("impact.ctaSubtitle")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={SITE.donateUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white dark:bg-brand-500 px-5 py-2.5 text-sm font-semibold text-brand-600 dark:text-white hover:bg-brand-50 dark:hover:bg-brand-400 transition shadow-sm"
            >
              <svg
                aria-hidden
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21s-7-4.534-9.5-9.07C.94 8.94 2.4 5.5 5.6 5.5c1.74 0 3.41 1 4.4 2.5 1-1.5 2.66-2.5 4.4-2.5 3.2 0 4.66 3.44 3.1 6.43C19 16.466 12 21 12 21z" />
              </svg>
              {t("common.donate")}
            </a>
            <Link
              to="/contact"
              className="rounded-lg border border-white/70 dark:border-slate-700 bg-white/10 dark:bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 dark:hover:bg-slate-700 transition"
            >
              {t("impact.partnerWithUs")}
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
