import { useState, useMemo } from "react";
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
  videoUrl?: string;
  videoPoster?: string;
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
    videoUrl: s.videoUrl,
    videoPoster: s.videoPoster,
    paragraphs: s.content,
  };
}

function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-neutral-heading dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(new Set());
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [prevId, setPrevId] = useState(id);

  if (prevId !== id) {
    setPrevId(id);
    setActiveImageIndex(0);
    setFailedSrcs(new Set());
  }

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
      ? `${story.name}${story.role ? ` · ${story.role}` : ""}`
      : "Story not found",
    description: story?.excerpt,
    type: "article",
    image: story?.image,
  });

  const { mediaList, textBlocks } = useMemo(() => {
    if (!story) {
      return { mediaList: [] as { src: string; alt: string }[], textBlocks: [] as string[] };
    }
    const media: { src: string; alt: string }[] = [];
    const text: string[] = [];

    story.paragraphs.forEach((block) => {
      if (block.startsWith("![") && block.includes("](") && block.endsWith(")")) {
        const match = block.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (match) {
          media.push({ alt: match[1], src: match[2] });
          return;
        }
      }
      text.push(block);
    });

    if (media.length === 0 && story.image && !story.videoUrl) {
      media.push({ alt: story.name, src: story.image });
    }

    return { mediaList: media, textBlocks: text };
  }, [story]);

  const validMediaList = useMemo(() => {
    return mediaList.filter((m) => !failedSrcs.has(m.src));
  }, [mediaList, failedSrcs]);

  const activeMedia = validMediaList[activeImageIndex] || validMediaList[0];

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
      <Section pattern="canvas" className="!pt-20 !pb-12">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/stories"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline underline-offset-4 mb-6"
          >
            <span>&larr;</span>
            <span>{t("stories.allStories")}</span>
          </Link>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 items-start">
            {/* LEFT COLUMN: Continuous Full Story Narrative */}
            <article className="lg:col-span-7 flex flex-col">
              <header className="border-b border-neutral-border/70 dark:border-slate-800 pb-6 mb-6">
                {meta && (
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    {meta}
                  </p>
                )}
                <h1 className="mt-2 font-display text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl lg:text-5xl leading-tight">
                  {story.name}
                </h1>
                {story.role && (
                  <p className="mt-2 text-lg text-neutral-body dark:text-slate-300 font-medium">
                    {story.role}
                  </p>
                )}
              </header>

              <div className="space-y-6 text-base sm:text-lg leading-relaxed text-neutral-body dark:text-slate-300">
                {textBlocks.map((block, i) => {
                  if (block.startsWith("## ")) {
                    return (
                      <h2
                        key={i}
                        className="pt-4 font-display text-2xl font-bold text-neutral-heading dark:text-slate-100 sm:text-3xl"
                      >
                        {block.replace(/^## /, "")}
                      </h2>
                    );
                  }
                  if (block.startsWith("> ")) {
                    return (
                      <blockquote
                        key={i}
                        className="my-6 border-l-4 border-brand-500 pl-4 py-1 italic text-neutral-body dark:text-slate-300 bg-brand-50/40 dark:bg-slate-800/40 rounded-r-xl"
                      >
                        {renderFormattedText(block.replace(/^> /, ""))}
                      </blockquote>
                    );
                  }
                  return (
                    <p key={i} className="text-base sm:text-lg leading-relaxed text-neutral-body dark:text-slate-300">
                      {renderFormattedText(block)}
                    </p>
                  );
                })}
              </div>
            </article>

            {/* RIGHT COLUMN: Media Showcase (Video + Photos Side-by-Side) */}
            <aside className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
              {story.videoUrl && (
                <div className="overflow-hidden rounded-2xl border border-neutral-border dark:border-slate-700 bg-slate-950 shadow-md">
                  <div className="relative aspect-video w-full">
                    <video
                      src={story.videoUrl}
                      poster={story.videoPoster || story.image}
                      controls
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="bg-slate-900 px-4 py-3 text-xs text-slate-300 flex items-center justify-between border-t border-slate-800">
                    <span className="font-semibold text-brand-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      Documentary Video
                    </span>
                    <span>Watch her story</span>
                  </div>
                </div>
              )}

              {validMediaList.length > 0 && activeMedia && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-muted dark:text-slate-400 px-1">
                    <span>Photos from the story</span>
                    {validMediaList.length > 1 && (
                      <span className="text-brand-600 dark:text-brand-400">
                        {activeImageIndex + 1} of {validMediaList.length}
                      </span>
                    )}
                  </div>

                  {/* Main Active Photo */}
                  <div className="overflow-hidden rounded-2xl border border-neutral-border dark:border-slate-700 bg-brand-50 dark:bg-slate-800 aspect-[4/3] shadow-sm">
                    <SmartImage
                      src={activeMedia.src}
                      alt={activeMedia.alt || story.name}
                      onError={() =>
                        setFailedSrcs((prev) => new Set(prev).add(activeMedia.src))
                      }
                      className="h-full w-full object-cover transition duration-300"
                    />
                  </div>

                  {/* Thumbnails (when multiple photos exist) */}
                  {validMediaList.length > 1 && (
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 pt-1">
                      {validMediaList.map((m, idx) => (
                        <button
                          key={m.src + idx}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative aspect-square overflow-hidden rounded-lg border-2 transition ${
                            activeImageIndex === idx
                              ? "border-brand-600 dark:border-brand-400 ring-2 ring-brand-500/20 shadow-sm"
                              : "border-transparent opacity-75 hover:opacity-100 hover:border-brand-300"
                          }`}
                        >
                          <SmartImage
                            src={m.src}
                            alt={m.alt || `Photo ${idx + 1}`}
                            onError={() =>
                              setFailedSrcs((prev) => new Set(prev).add(m.src))
                            }
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </aside>
          </div>
        </div>
      </Section>

      {others.length > 0 && (
        <section className="bg-brand-600 dark:bg-brand-700 py-16 sm:py-20 text-white transition-colors border-t border-brand-500/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur mb-2">
                  Explore More
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold !text-white">
                  {t("stories.moreStories", "More stories")}
                </h2>
              </div>
              <Link
                to="/stories"
                className="text-sm font-semibold text-brand-100 hover:text-white transition flex items-center gap-1.5"
              >
                <span>View all stories</span>
                <span>&rarr;</span>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((s) => (
                <article
                  key={s.key}
                  className="flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-sm transition hover:border-white/50 hover:bg-white/15 hover:shadow-lg group"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden bg-brand-700/60">
                    <SmartImage
                      src={s.image}
                      alt={`${s.name}${s.role ? ` · ${s.role}` : ""}`}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 text-white">
                    {s.program && (
                      <p className="text-xs font-bold uppercase tracking-wider text-brand-100">
                        {s.program}
                      </p>
                    )}
                    <h3 className="mt-2 font-display text-lg font-bold !text-white group-hover:text-brand-100 transition">
                      <Link to={s.href}>{s.name}</Link>
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-white/90 line-clamp-3 leading-relaxed">
                      {s.excerpt}
                    </p>
                    <div className="mt-4 pt-3 border-t border-white/15">
                      <Link
                        to={s.href}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white group-hover:text-brand-100 transition"
                      >
                        <span>Read full story</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
