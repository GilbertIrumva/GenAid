import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";
import {
  stories as fallbackStories,
  type Story as FallbackStory,
} from "@/data/stories";
import { getStoryBySlug, mapSanityStoryToDisplayStory } from "@/lib/sanity";

interface DisplayStory {
  key: string;
  href: string;
  name: string;
  role: string;
  program: string;
  location: string;
  image: string;
  excerpt: string;
  paragraphs: string[];
}

function fromFallback(s: FallbackStory): DisplayStory {
  return {
    key: s.slug,
    href: `/stories/${s.slug}`,
    name: s.name,
    role: s.role,
    program: s.program,
    location: s.location,
    image: s.image,
    excerpt: s.excerpt,
    paragraphs: s.content,
  };
}

export default function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const { data: sanityStory, isLoading } = useQuery({
    queryKey: ["public", "sanity", "story", id],
    enabled: Boolean(id),
    queryFn: () => getStoryBySlug(id ?? ""),
    retry: false,
  });

  const story: DisplayStory | undefined = sanityStory
    ? mapSanityStoryToDisplayStory(sanityStory)
    : fallbackStories.filter((s) => s.slug === id).map(fromFallback)[0];

  useSEO({
    title: story
      ? `${story.name}${story.role ? ` — ${story.role}` : ""}`
      : "Story not found",
    description: story?.excerpt,
    type: "article",
    image: story?.image,
  });

  if (isLoading && !story) {
    return (
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="h-4 w-32 animate-pulse rounded bg-brand-100 dark:bg-slate-800" />
          <div className="h-12 w-3/4 animate-pulse rounded bg-brand-100 dark:bg-slate-800" />
          <div className="aspect-[16/10] w-full animate-pulse rounded-2xl bg-brand-100 dark:bg-slate-800" />
          <div className="h-4 w-full animate-pulse rounded bg-brand-100 dark:bg-slate-800" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-brand-100 dark:bg-slate-800" />
        </div>
      </Section>
    );
  }

  if (!story) {
    return (
      <Section pattern="canvas">
        <div className="mx-auto max-w-md text-center">
          <h1 className="font-display text-3xl font-bold text-neutral-heading dark:text-slate-50">
            {t("stories.notFound")}
          </h1>
          <p className="mt-3 text-neutral-body dark:text-slate-300">{t("stories.notFoundSubtitle")}</p>
          <Link
            to="/stories"
            className="mt-6 inline-block rounded-lg bg-brand-600 dark:bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 dark:hover:bg-brand-400 transition"
          >
            {t("stories.backToAll")}
          </Link>
        </div>
      </Section>
    );
  }

  const others: DisplayStory[] = (
    sanityStory ? [] : fallbackStories.map(fromFallback)
  )
    .filter((s) => s.key !== story.key)
    .slice(0, 3);

  const meta = [story.program, story.location].filter(Boolean).join(" · ");

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      <Section pattern="canvas" className="!pt-20 !pb-10">
        <article className="mx-auto max-w-3xl">
          <Link
            to="/stories"
            className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline underline-offset-4"
          >
            {t("stories.allStories")}
          </Link>

          <header className="mt-6">
            {meta && (
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {meta}
              </p>
            )}
            <h1 className="mt-2 font-display text-4xl font-bold text-neutral-heading dark:text-slate-50 sm:text-5xl">
              {story.name}
            </h1>
            {story.role && (
              <p className="mt-2 text-lg text-neutral-body dark:text-slate-300">{story.role}</p>
            )}
          </header>

          {story.image && (
            <div className="mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-neutral-border dark:border-slate-700 bg-brand-50 dark:bg-slate-800 shadow-sm">
              <SmartImage
                src={story.image}
                alt={`${story.name}${story.role ? ` — ${story.role}` : ""}`}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg mt-10 max-w-none space-y-5 text-neutral-body dark:text-slate-300">
            {story.paragraphs.map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-neutral-body dark:text-slate-300">
                {para}
              </p>
            ))}
          </div>
        </article>
      </Section>

      {others.length > 0 && (
        <Section pattern="soft">
          <h2 className="font-display text-2xl font-bold text-neutral-heading dark:text-slate-50">
            {t("stories.moreStories")}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {others.map((s) => (
              <article
                key={s.key}
                className="flex flex-col overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-brand-50 dark:bg-slate-900">
                  <SmartImage
                    src={s.image}
                    alt={`${s.name}${s.role ? ` — ${s.role}` : ""}`}
                    className="h-full w-full object-cover"
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
                  <p className="mt-2 flex-1 text-sm text-neutral-body dark:text-slate-300">{s.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
