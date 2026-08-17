import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";
import { SITE } from "@/data/site";
import { stories as fallbackStories } from "@/data/stories";
import {
  getPublishedStories,
  mapSanityStoryToDisplayStory,
} from "@/lib/sanity";

interface DisplayStory {
  key: string;
  href: string;
  name: string;
  role: string;
  program: string;
  image: string;
  excerpt: string;
}

export default function Stories() {
  const { t } = useTranslation();
  useSEO({
    title: "Stories from Kakuma",
    description:
      "Real journeys from graduates, entrepreneurs and changemakers across the Generation Aid community.",
  });

  const { data: sanityStories = [], isLoading } = useQuery({
    queryKey: ["public", "sanity", "stories"],
    queryFn: getPublishedStories,
    retry: false,
  });

  const usingFallback = sanityStories.length === 0;
  const displayStories: DisplayStory[] = usingFallback
    ? fallbackStories.map((s) => ({
        key: s.slug,
        href: `/stories/${s.slug}`,
        name: s.name,
        role: s.role,
        program: s.program,
        image: s.image,
        excerpt: s.excerpt,
      }))
    : sanityStories.map((story) => {
        const mapped = mapSanityStoryToDisplayStory(story);
        return {
          key: mapped.key,
          href: mapped.href,
          name: mapped.name,
          role: mapped.role,
          program: mapped.program,
          image: mapped.image,
          excerpt: mapped.excerpt,
        };
      });

  const featured = displayStories[0];
  const rest = displayStories.slice(1);

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      {/* HERO (Pattern C: Solid Primary Blue Impact) */}
      <section className="relative isolate flex min-h-[55vh] items-center overflow-hidden bg-brand-900 dark:bg-slate-950 text-white transition-colors">
        <SmartImage
          src="/img/heroes/stories.jpg"
          alt="Learners sharing stories in Kakuma"
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/90 via-brand-900/75 to-brand-900/45 dark:from-slate-950/95 dark:via-slate-900/90 dark:to-slate-950/85"
        />
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
              {t("stories.hero.eyebrow")}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl !text-white dark:!text-white">
              {t("stories.hero.titleStart")}{" "}
              <span className="text-white">
                {t("stories.hero.titleHighlight")}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-brand-100">
              {t("stories.hero.subtitleAlt")}
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED STORY (Pattern A: Canvas) */}
      {isLoading ? (
        <Section pattern="canvas">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="aspect-[4/3] w-full animate-pulse rounded-2xl bg-brand-100 dark:bg-slate-800" />
            <div className="space-y-3">
              <div className="h-4 w-24 animate-pulse rounded bg-brand-100 dark:bg-slate-800" />
              <div className="h-8 w-3/4 animate-pulse rounded bg-brand-100 dark:bg-slate-800" />
              <div className="h-4 w-full animate-pulse rounded bg-brand-100 dark:bg-slate-800" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-brand-100 dark:bg-slate-800" />
            </div>
          </div>
        </Section>
      ) : featured ? (
        <Section pattern="canvas">
          <article className="grid items-center gap-10 lg:grid-cols-2">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-border dark:border-slate-700 bg-brand-50 dark:bg-slate-800 shadow-sm">
              <SmartImage
                src={featured.image}
                alt={`${featured.name}${featured.role ? ` — ${featured.role}` : ""}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
                {t("stories.featured")}
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
                {featured.name}
              </h2>
              {(featured.role || featured.program) && (
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {[featured.role, featured.program]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
              <p className="mt-5 text-neutral-body dark:text-slate-300">{featured.excerpt}</p>
              <Link
                to={featured.href}
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline underline-offset-4"
              >
                {t("stories.readPersonStory", { name: featured.name })}
              </Link>
            </div>
          </article>
        </Section>
      ) : null}

      {/* STORY GRID (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            {t("stories.moreFromCommunity")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-neutral-body dark:text-slate-300">
            {t("stories.moreSubtitle")}
          </p>
        </div>

        {rest.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((s) => (
              <article
                key={s.key}
                className="flex flex-col overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-brand-50 dark:bg-slate-900">
                  <SmartImage
                    src={s.image}
                    alt={`${s.name}${s.role ? ` — ${s.role}` : ""}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {s.program && (
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                      {s.program}
                    </p>
                  )}
                  <h3 className="mt-2 font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                    <Link to={s.href} className="hover:text-brand-600 dark:hover:text-brand-400">
                      {s.name}
                    </Link>
                  </h3>
                  {s.role && (
                    <p className="mt-1 text-xs text-neutral-body dark:text-slate-400">{s.role}</p>
                  )}
                  <p className="mt-3 flex-1 text-sm text-neutral-body dark:text-slate-300">{s.excerpt}</p>
                  <Link
                    to={s.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline underline-offset-4"
                  >
                    {t("stories.readStory")}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          !featured && (
            <p className="mt-10 rounded-xl border border-dashed border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-10 text-center text-sm text-neutral-body dark:text-slate-400">
              {t("stories.empty")}
            </p>
          )
        )}
      </Section>

      {/* SHARE A STORY CTA (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl rounded-2xl border border-neutral-border dark:border-slate-700 bg-brand-50/50 dark:bg-slate-800/50 p-10 text-center shadow-sm">
          <h2 className="font-display text-2xl font-bold text-neutral-heading dark:text-slate-50 sm:text-3xl">
            {t("stories.shareTitle")}
          </h2>
          <p className="mt-3 text-neutral-body dark:text-slate-300">{t("stories.shareBody")}</p>
          <a
            href={`mailto:${SITE.email}?subject=Story%20submission`}
            className="mt-6 inline-block rounded-lg bg-brand-600 dark:bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700 dark:hover:bg-brand-400 transition"
          >
            {t("stories.submitStory")}
          </a>
        </div>
      </Section>
    </div>
  );
}
