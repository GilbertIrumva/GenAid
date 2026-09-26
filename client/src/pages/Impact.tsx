import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";
import { SITE } from "@/data/site";
import { posts } from "@/data/posts";
import { stories as seedStories } from "@/data/stories";

interface ImpactMetric {
  _id: string;
  title: string;
  value: number;
  icon: string;
  order: number;
}

export interface Story {
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
    body: "Affordable, market relevant courses in ICT, English and craft skills, taught by trainers from the community.",
    kpi: "85% course completion rate",
  },
  {
    title: "Employment pathways",
    body: "Job readiness coaching, CV clinics and direct placements with NGOs and local businesses inside the camp.",
    kpi: "1 in 3 graduates placed within 6 months",
  },
  {
    title: "Entrepreneurship",
    body: "Seed kits, mentorship and business training for graduates launching tailoring, ICT and service ventures.",
    kpi: "40+ micro enterprises launched",
  },
  {
    title: "Community resilience",
    body: "We hire, train and lead from within Kakuma, strengthening refugee voice and long term self reliance.",
    kpi: "100% refugee led team",
  },
];

const highlights = [
  {
    tag: "Cohort milestone",
    title: "Our largest ICT cohort to date",
    body: "120 learners completed our Basic ICT & Digital Literacy course in 2025, the biggest single intake since we opened the lab.",
  },
  {
    tag: "Partnership",
    title: "First intercamp tailoring exchange",
    body: "Graduates from our dressmaking program ran a peer training week with women's groups in Kalobeyei, sharing curriculum and sewing patterns.",
  },
  {
    tag: "Recognition",
    title: "Featured at the Refugee Led Innovation Forum",
    body: "Generation Aid was invited to share its EdTech model with refugee led organisations from five East African countries.",
  },
];

const timeline = [
  {
    year: "2019",
    title: "Founded in Kakuma",
    body: "A small group of refugee youth launch Generation Aid to fill the post secondary gap.",
  },
  {
    year: "2021",
    title: "First ICT lab opened",
    body: "We secure equipment and partner with local providers to run our first cohort of digital literacy learners.",
  },
  {
    year: "2023",
    title: "Tailoring & English added",
    body: "Two new vocational streams launch alongside an entrepreneurship track for graduates.",
  },
  {
    year: "2025",
    title: "EdTech & livelihood scale up",
    body: "We cross 500 lifetime learners and begin formal employer placement partnerships.",
  },
];

const metrics: ImpactMetric[] = [
  {
    _id: "impact-1",
    title: "Directly Impacted",
    value: 1600,
    icon: "🎓",
    order: 1,
  },
  {
    _id: "impact-2",
    title: "Indirect Community Reach",
    value: 1200,
    icon: "🌍",
    order: 2,
  },
  {
    _id: "impact-3",
    title: "Refugees & Youth Trained",
    value: 700,
    icon: "💻",
    order: 3,
  },
  {
    _id: "impact-4",
    title: "Graduates Employed",
    value: 50,
    icon: "🚀",
    order: 4,
  },
  {
    _id: "impact-5",
    title: "Emergency Food & Medical Aid",
    value: 210,
    icon: "🏥",
    order: 5,
  },
  {
    _id: "impact-6",
    title: "Partner Collaborations",
    value: 15,
    icon: "🤝",
    order: 6,
  },
];

export default function Impact() {
  const { t } = useTranslation();
  useSEO({
    title: "Our impact",
    description:
      "Numbers, data, and stories that show what refugee led innovation is delivering in Kakuma.",
  });

  const featuredStories = seedStories.slice(0, 3);

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      {/* HERO (Pattern C: Solid Primary Blue Impact) */}
      <section className="relative isolate flex min-h-[55vh] items-center overflow-hidden bg-brand-900 dark:bg-slate-950 text-white transition-colors">
        <SmartImage
          src="https://media.licdn.com/dms/image/v2/D4D22AQF7u2wlvntemA/feedshare-shrink_800/B4DZ64fL7PHgAk-/0/1781211644043?e=2147483647&v=beta&t=L6S7NtqPrDOTcWbkr2IoFNRW1fs507W4ouiiQ8vS7p8"
          alt="UNHCR and Australian Aid delegation visit to Generation Aid in Kakuma"
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/90 via-brand-900/75 to-brand-900/45 dark:from-slate-950/95 dark:via-slate-900/90 dark:to-slate-950/85"
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
          <p className="mt-5 max-w-2xl text-base text-white sm:text-lg">
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          <h2 className="mt-4 font-display text-3xl font-bold !text-white sm:text-4xl">
            {t("impact.outcomesTitle")}
          </h2>
          <p className="mt-4 text-base text-white">
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
          <h2 className="mt-4 font-display text-3xl font-bold !text-white sm:text-4xl">
            {t("impact.journeyTitle")}
          </h2>
          <p className="mt-4 text-base text-white">
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
              <p className="text-xs font-extrabold uppercase tracking-wider text-white">
                {t.year}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold !text-white">
                {t.title}
              </h3>
              <p className="mt-1 text-sm text-white">{t.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* FROM OUR BLOG: CRITICAL INSIGHTS & THOUGHT LEADERSHIP */}
      <Section pattern="soft" id="impact-blogs">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 dark:bg-brand-900/60 px-3 py-1 text-xs font-semibold text-brand-800 dark:text-brand-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-600 dark:bg-brand-400 animate-pulse" />
              From Our Blog &amp; Thought Leadership
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-neutral-heading dark:text-slate-50 sm:text-3xl">
              Critical Insights &amp; Community Perspectives
            </h2>
            <p className="mt-1 text-sm text-neutral-body dark:text-slate-300 max-w-2xl">
              Refugee leaders and practitioners unpacking systemic challenges, foreign aid realities, and sustainable blueprints from Kakuma.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline underline-offset-4"
          >
            <span>Explore all articles</span>
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Flagship Featured Blog Card */}
        {posts.length > 0 && (
          <div className="mb-12 overflow-hidden rounded-2xl border border-neutral-border/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="grid lg:grid-cols-12 gap-0">
              {/* Media column */}
              <div className="relative lg:col-span-5 min-h-[260px] sm:min-h-[320px] bg-slate-950 overflow-hidden group">
                <SmartImage
                  src={posts[0].cover || "/pbs-hubert.png"}
                  alt={posts[0].title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                {/* Media Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    ★ Featured Analysis
                  </span>
                  <span className="inline-flex items-center rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-slate-200">
                    5 min read
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-xs text-white/90 bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 font-medium">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                    <span>Featured on PBS News Hour &amp; LinkedIn Pulse</span>
                  </div>
                </div>
              </div>

              {/* Content column */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-muted dark:text-slate-400 mb-3">
                    <span className="font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                      {posts[0].author}
                    </span>
                    <span>•</span>
                    <time dateTime="2025-03-05">{posts[0].date}</time>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 text-neutral-body dark:text-slate-300">
                      <span>Refugee Led Innovation</span>
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-heading dark:text-white leading-snug">
                    <Link
                      to={`/blog/${posts[0].slug}`}
                      className="hover:text-brand-600 dark:hover:text-brand-400 transition"
                    >
                      {posts[0].title}
                    </Link>
                  </h3>

                  <p className="mt-3 text-sm text-neutral-body dark:text-slate-300 leading-relaxed">
                    {posts[0].excerpt}
                  </p>

                  {/* Highlights Grid */}
                  <div className="mt-5 grid sm:grid-cols-3 gap-3 border-y border-neutral-border/60 dark:border-slate-800/80 py-4">
                    <div className="rounded-lg bg-neutral-bg/60 dark:bg-slate-800/60 p-2.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                        The Aid Cliff
                      </p>
                      <p className="mt-1 text-xs text-neutral-body dark:text-slate-300 leading-normal">
                        Ration cuts impacting ~290,000 refugees in Kakuma.
                      </p>
                    </div>
                    <div className="rounded-lg bg-neutral-bg/60 dark:bg-slate-800/60 p-2.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        EdTech at Risk
                      </p>
                      <p className="mt-1 text-xs text-neutral-body dark:text-slate-300 leading-normal">
                        Digital training bootcamps face critical funding deficits.
                      </p>
                    </div>
                    <div className="rounded-lg bg-neutral-bg/60 dark:bg-slate-800/60 p-2.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        RLO Solution
                      </p>
                      <p className="mt-1 text-xs text-neutral-body dark:text-slate-300 leading-normal">
                        Empowering builders and remote employment pathways.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    to={`/blog/${posts[0].slug}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition"
                  >
                    <span>Read Full Article</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>

                  <a
                    href="https://www.youtube.com/watch?v=vIK-iBooRfo&t=8s"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-neutral-bg dark:hover:bg-slate-700 px-3.5 py-2 text-sm font-semibold text-neutral-heading dark:text-slate-200 transition"
                  >
                    <svg aria-hidden="true" className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                    <span>Watch PBS Interview</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Recent Posts Grid */}
        {posts.length > 1 && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-neutral-heading dark:text-slate-100">
                More from our Blog
              </h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {posts.slice(1, 3).map((post) => (
                <article
                  key={post.slug}
                  className="flex flex-col sm:flex-row overflow-hidden rounded-xl border border-neutral-border/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow transition"
                >
                  {post.cover && (
                    <div className="sm:w-44 aspect-video sm:aspect-auto overflow-hidden bg-brand-50 dark:bg-slate-950 shrink-0">
                      <SmartImage
                        src={post.cover}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                        {post.date} • {post.author}
                      </div>
                      <h4 className="mt-1.5 font-display text-base font-bold text-neutral-heading dark:text-slate-100 leading-snug line-clamp-2">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="hover:text-brand-600 dark:hover:text-brand-400 transition"
                        >
                          {post.title}
                        </Link>
                      </h4>
                      <p className="mt-2 line-clamp-2 text-xs text-neutral-body dark:text-slate-300">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-3 pt-2">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline"
                      >
                        <span>Read full article</span>
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
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
            {featuredStories.map((s) => (
              <article
                key={s.slug}
                className="overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video w-full overflow-hidden bg-brand-50 dark:bg-slate-900">
                    <SmartImage
                      src={s.image}
                      alt={s.name}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    {s.program && (
                      <p className="text-xs uppercase tracking-wide font-semibold text-brand-600 dark:text-brand-400">
                        {s.program}
                      </p>
                    )}
                    <h3 className="mt-2 font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                      <Link to={`/stories/${s.slug}`} className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                        {s.name}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-neutral-body dark:text-slate-300">
                      {s.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-0">
                  <Link
                    to={`/stories/${s.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline"
                  >
                    <span>Read story</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
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
            <h2 className="font-display text-2xl font-bold sm:text-3xl !text-white">
              {t("impact.ctaTitle")}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white">
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
