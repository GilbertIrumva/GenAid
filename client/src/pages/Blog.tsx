import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { posts as seedPosts, type BlogPost as SeedPost } from "@/data/posts";
import { videos as fallbackVideos } from "@/data/videos";

import { useSEO } from "@/utils/useSEO";
import {
  getPhotos,
  getPublishedPosts,
  getVideos,
  mapSanityPhotoToDisplayPhoto,
  mapSanityPostToDisplayPost,
  mapSanityVideoToDisplayVideo,
} from "@/lib/sanity";

interface DisplayPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  cover: string | undefined;
}

function fromSeed(p: SeedPost): DisplayPost {
  return {
    slug: p.slug,
    title: p.title,
    date: p.date,
    author: p.author,
    excerpt: p.excerpt,
    cover: p.cover,
  };
}

export default function Blog() {
  const { t } = useTranslation();
  useSEO({
    title: "Blog",
    description:
      "News, project launches and reflections from Generation Aid in Kakuma.",
  });
  const { data: sanityPosts = [] } = useQuery({
    queryKey: ["public", "sanity", "posts"],
    queryFn: getPublishedPosts,
    retry: false,
  });

  const posts: DisplayPost[] =
    sanityPosts.length > 0
      ? sanityPosts.map(mapSanityPostToDisplayPost)
      : seedPosts.map(fromSeed);

  const { data: sanityPhotos = [] } = useQuery({
    queryKey: ["public", "sanity", "photos"],
    queryFn: getPhotos,
    retry: false,
  });

  const { data: sanityVideos = [] } = useQuery({
    queryKey: ["public", "sanity", "videos"],
    queryFn: getVideos,
    retry: false,
  });

  const recent = posts.slice(0, 3);
  const photos = sanityPhotos.map(mapSanityPhotoToDisplayPhoto);
  const apiVideos = sanityVideos
    .map(mapSanityVideoToDisplayVideo)
    .filter((v) => Boolean(v.videoUrl));

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      {/* HERO (Pattern C: Solid Primary Blue Impact) */}
      <section className="relative isolate flex min-h-[55vh] items-center overflow-hidden bg-brand-900 dark:bg-slate-950 text-white transition-colors">
        <SmartImage
          src="/img/heroes/blog.jpg"
          alt="Hands writing in a journal"
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
              {t("blog.hero.eyebrowAlt")}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl !text-white dark:!text-white">
              {t("blog.hero.titleAlt")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-brand-100">
              {t("blog.hero.subtitleAlt")}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#gallery"
                className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-600 shadow-sm transition hover:bg-brand-50"
              >
                {t("blog.seePhotos")}
              </a>
              <a
                href="#videos"
                className="rounded-lg border border-white/70 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition"
              >
                {t("blog.watchVideos")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN GRID (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          {/* Posts list */}
          <div className="space-y-8">
            {posts.map((p) => (
              <article
                key={p.slug}
                className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-body dark:text-slate-400">
                  <time className="font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    {p.date}
                  </time>
                  <span>&middot;</span>
                  <span>{t("blog.byAuthor", { author: p.author })}</span>
                </div>
                <h2 className="mt-3 font-display text-xl font-semibold text-neutral-heading dark:text-slate-100 sm:text-2xl">
                  <Link
                    to={`/blog/${p.slug}`}
                    className="hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300 sm:text-base">
                  {p.excerpt}
                </p>
                <Link
                  to={`/blog/${p.slug}`}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline underline-offset-4"
                >
                  {t("common.readMoreArrow")}
                </Link>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                {t("blog.aboutUsTitle")}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">
                {t("blog.aboutUsBody")}
              </p>
            </div>

            <div className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                {t("blog.recentArticles")}
              </h3>
              <ul className="mt-4 space-y-4">
                {recent.map((r) => (
                  <li
                    key={r.slug}
                    className="border-b border-neutral-border dark:border-slate-700 pb-4 last:border-0 last:pb-0"
                  >
                    <Link
                      to={`/blog/${r.slug}`}
                      className="block text-sm font-semibold text-neutral-heading dark:text-slate-100 hover:text-brand-600 dark:hover:text-brand-400"
                    >
                      {r.title}
                    </Link>
                    <p className="mt-1 text-xs text-neutral-body dark:text-slate-400">
                      {r.date} &middot; {r.author}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                {t("blog.postCategories")}
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <span className="text-neutral-body dark:text-slate-400">{t("blog.uncategorized")}</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      {/* PHOTO GALLERY (Pattern B: Soft Contrast) */}
      {photos.length > 0 && (
        <Section id="gallery" pattern="soft">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
              {t("blog.gallery")}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
              {t("blog.momentsField")}
            </h2>
            <p className="mt-3 text-neutral-body dark:text-slate-300">{t("blog.momentsSubtitle")}</p>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((p) => (
              <li
                key={p._id}
                className="overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
              >
                <div className="aspect-video w-full overflow-hidden bg-brand-50 dark:bg-slate-900">
                  <SmartImage
                    src={p.imageUrl}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    fallbackLabel="Gallery photo"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-body dark:text-slate-300">
                    {p.description}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    {new Date(p.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* VIDEOS (Pattern A: Canvas) */}
      <Section id="videos" pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            {t("blog.videosEyebrow")}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            {t("blog.videosTitle")}
          </h2>
          <p className="mt-3 text-neutral-body dark:text-slate-300">{t("blog.videosSubtitle")}</p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {apiVideos.length > 0
            ? apiVideos.map((v) => (
                <article
                  key={v._id}
                  className="overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-brand-100 dark:bg-slate-900">
                    <video
                      src={v.videoUrl}
                      poster={v.posterUrl || undefined}
                      controls
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-body dark:text-slate-300">{v.description}</p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                      {new Date(v.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </article>
              ))
            : fallbackVideos.map((v) => (
                <article
                  key={v.title}
                  className="overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-brand-100 dark:bg-slate-900">
                    {v.youtubeId ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
                        title={v.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center bg-brand-600/30 text-white">
                        <div className="text-center">
                          <svg
                            width="56"
                            height="56"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mx-auto"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white">
                            {t("common.comingSoon")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-body dark:text-slate-300">{v.description}</p>
                    {v.date && (
                      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                        {v.date}
                      </p>
                    )}
                  </div>
                </article>
              ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/contact"
            className="inline-block rounded-lg bg-brand-600 dark:bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700 dark:hover:bg-brand-400 transition"
          >
            {t("blog.haveAStory")}
          </Link>
        </div>
      </Section>
    </div>
  );
}
