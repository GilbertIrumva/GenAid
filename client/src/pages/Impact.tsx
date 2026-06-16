import { useQuery } from "@tanstack/react-query";
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
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M+`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}k+`;
  return `${n.toLocaleString()}`;
}

/**
 * Outcome areas — the four pillars we measure ourselves against.
 * These mirror our program design so visitors can see how delivery maps to impact.
 */
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

/**
 * Narrative highlights — three concrete wins that put a face on the metrics.
 * Update copy as new milestones land.
 */
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

/**
 * Journey timeline — milestones from founding to today. Keep entries short.
 */
const timeline = [
  { year: "2019", title: "Founded in Kakuma", body: "A small group of refugee youth launch Generation Aid to fill the post-secondary gap." },
  { year: "2021", title: "First ICT lab opened", body: "We secure equipment and partner with local providers to run our first cohort of digital-literacy learners." },
  { year: "2023", title: "Tailoring & English added", body: "Two new vocational streams launch alongside an entrepreneurship track for graduates." },
  { year: "2025", title: "EdTech & livelihood scale-up", body: "We cross 500 lifetime learners and begin formal employer placement partnerships." },
];

export default function Impact() {
  const { t } = useTranslation();
  useSEO({
    title: "Our impact",
    description:
      "Numbers, reports, and stories that show what refugee-led innovation is delivering in Kakuma.",
  });

  const { data: metrics = [], isLoading: metricsLoading } = useQuery<ImpactMetric[]>({
    queryKey: ["public", "impact"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "/api"}/impact`);
      if (!res.ok) throw new Error("Failed to load metrics");
      return res.json();
    },
  });

  const { data: stories = [] } = useQuery<Story[]>({
    queryKey: ["public", "stories"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "/api"}/stories`);
      if (!res.ok) throw new Error("Failed to load stories");
      return res.json();
    },
  });

  const featuredStories = stories.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        {/* TODO: replace with real Generation Aid photo */}
        <SmartImage
          src="https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=1600&q=80"
          alt="Celebrating achievement and learning"
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-900/90 via-ink/85 to-ink/70"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle_at_top_right,theme(colors.primary.400),transparent_60%)]"
        />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-300">
            {t("impact.hero.eyebrow")}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            {t("impact.hero.titleStart")}{" "}
            <span className="text-primary-300">{t("impact.hero.titleHighlight")}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
            {t("impact.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* METRICS */}
      <Section className="bg-bg">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              {t("impact.byTheNumbers")}
            </h2>
            <p className="mt-1 text-sm text-muted">{t("impact.byTheNumbersSubtitle")}</p>
          </div>
        </div>

        {metricsLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-36 animate-pulse rounded-2xl border border-line bg-surface"
              />
            ))}
          </div>
        ) : metrics.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center text-sm text-muted">
            {t("impact.metricsEmpty")}
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m._id}
                className="rounded-2xl border border-line bg-surface p-6 shadow-sm transition hover:border-primary-300 hover:shadow-md"
              >
                <div className="font-display text-4xl font-bold text-primary-600">
                  {formatValue(m.value)}
                </div>
                <p className="mt-2 text-sm font-medium text-ink">{m.title}</p>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* OUTCOME AREAS — what we measure */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            {t("impact.outcomesEyebrow")}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
            {t("impact.outcomesTitle")}
          </h2>
          <p className="mt-4 text-base text-muted">{t("impact.outcomesSubtitle")}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {outcomeAreas.map((o) => (
            <div
              key={o.title}
              className="flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm transition hover:border-primary-300 hover:shadow-md"
            >
              <h3 className="font-display text-lg font-semibold text-ink">
                {o.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted">{o.body}</p>
              <p className="mt-4 border-t border-line pt-3 text-xs font-semibold uppercase tracking-wide text-primary-600">
                {o.kpi}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* HIGHLIGHTS — narrative wins */}
      <Section className="bg-surface">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              {t("impact.highlightsTitle")}
            </h2>
            <p className="mt-1 text-sm text-muted">{t("impact.highlightsSubtitle")}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((h) => (
            <article
              key={h.title}
              className="rounded-2xl border border-line bg-bg p-6 shadow-sm"
            >
              <span className="inline-block rounded-full bg-primary-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-600">
                {h.tag}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                {h.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{h.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* TIMELINE — journey since 2019 */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            {t("impact.journeyEyebrow")}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
            {t("impact.journeyTitle")}
          </h2>
          <p className="mt-4 text-base text-muted">{t("impact.journeySubtitle")}</p>
        </div>

        <ol className="relative mx-auto mt-12 max-w-3xl border-l border-line pl-8">
          {timeline.map((t) => (
            <li key={t.year} className="relative mb-10 last:mb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[37px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary-500 bg-surface text-[10px] font-bold text-primary-600"
              >
                ●
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                {t.year}
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                {t.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{t.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* STORIES PREVIEW */}
      {featuredStories.length > 0 && (
        <Section className="bg-surface">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                {t("impact.behindNumbersTitle")}
              </h2>
              <p className="mt-1 text-sm text-muted">{t("impact.behindNumbersSubtitle")}</p>
            </div>
            <Link
              to="/stories"
              className="text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              {t("impact.readAllStories")}
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredStories.map((s) => (
              <article
                key={s._id}
                className="overflow-hidden rounded-2xl border border-line bg-bg shadow-sm"
              >
                {s.image ? (
                  <img
                    src={s.image}
                    alt=""
                    className="aspect-video w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-bg text-xs text-muted">
                    No image
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted">{s.summary}</p>
                  <p className="mt-3 text-xs uppercase tracking-wide text-primary-600">
                    {s.author}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section className="bg-primary-600 text-white">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{t("impact.ctaTitle")}</h2>
            <p className="mt-2 max-w-xl text-sm text-primary-100">{t("impact.ctaSubtitle")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={SITE.donateUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-accent-500 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-accent-400"
            >
              {t("common.donate")}
            </a>
            <Link
              to="/contact"
              className="rounded-md border border-white/40 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
            >
              {t("impact.partnerWithUs")}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
