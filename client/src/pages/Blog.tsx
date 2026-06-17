import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { posts as seedPosts, type BlogPost as SeedPost } from "@/data/posts";
import { videos as fallbackVideos } from "@/data/videos";

import { api } from "@/api/client";
import { useSEO } from "@/utils/useSEO";

interface ApiPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  cover: string;
  slug?: string;
  published: boolean;
  publishedAt: string;
  createdAt: string;
}

/** Shape consumed by the page — both API and seed posts are mapped to this. */
interface DisplayPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  cover: string | undefined;
}

function formatDate(input: string): string {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function fromApi(p: ApiPost): DisplayPost {
  return {
    slug: p.slug ?? p._id,
    title: p.title,
    date: formatDate(p.publishedAt ?? p.createdAt),
    author: p.author,
    excerpt: p.excerpt,
    cover: p.cover || undefined,
  };
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

interface ApiVideo {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  createdAt: string;
}

interface ApiPhoto {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

async function fetchPosts(): Promise<ApiPost[]> {
  const { data } = await api.get<ApiPost[]>("/posts");
  return data;
}

async function fetchVideos(): Promise<ApiVideo[]> {
  const { data } = await api.get<ApiVideo[]>("/videos");
  return data;
}

async function fetchPhotos(): Promise<ApiPhoto[]> {
  const { data } = await api.get<ApiPhoto[]>("/photos");
  return data;
}

export default function Blog() {
  const { t } = useTranslation();
  useSEO({
    title: "Blog",
    description: "News, project launches and reflections from Generation Aid in Kakuma.",
  });
  const { data: apiPosts = [] } = useQuery({
    queryKey: ["public", "posts"],
    queryFn: fetchPosts,
  });
  const { data: apiVideos = [] } = useQuery({
    queryKey: ["public", "videos"],
    queryFn: fetchVideos,
  });
  const { data: photos = [] } = useQuery({
    queryKey: ["public", "photos"],
    queryFn: fetchPhotos,
  });

  // API wins when present, otherwise seed keeps the page populated.
  const posts: DisplayPost[] =
    apiPosts.length > 0 ? apiPosts.map(fromApi) : seedPosts.map(fromSeed);
  const recent = posts.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[55vh] items-center overflow-hidden">
        {/* TODO: replace with real Generation Aid photo */}
        <SmartImage
          src="/img/heroes/blog.jpg"
          alt="Laptop and notebook representing our blog"
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover dark:opacity-80"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b1729]/85 via-[#0b1729]/65 to-[#0b1729]/40 dark:from-black/90 dark:via-black/75 dark:to-black/55"
        />
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-300 backdrop-blur">
              {t("blog.hero.eyebrowAlt")}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              {t("blog.hero.titleAlt")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              {t("blog.hero.subtitleAlt")}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#gallery"
                className="rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
              >
                {t("blog.seePhotos")}
              </a>
              <a
                href="#videos"
                className="rounded-md border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                {t("blog.watchVideos")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN GRID */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          {/* Posts list */}
          <div className="space-y-8">
            {posts.map((p) => (
              <article
                key={p.slug}
                className="rounded-2xl border border-line bg-surface p-6 transition hover:border-primary-300 hover:shadow-md sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                  <time className="font-semibold uppercase tracking-wider text-primary-600">
                    {p.date}
                  </time>
                  <span>&middot;</span>
                  <span>{t("blog.byAuthor", { author: p.author })}</span>
                </div>
                <h2 className="mt-3 font-display text-xl font-semibold text-ink sm:text-2xl">
                  <Link to={`/blog/${p.slug}`} className="hover:text-primary-600">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {p.excerpt}
                </p>
                <Link
                  to={`/blog/${p.slug}`}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:underline"
                >
                  {t("common.readMoreArrow")}
                </Link>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-display text-lg font-semibold text-ink">{t("blog.aboutUsTitle")}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t("blog.aboutUsBody")}
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-display text-lg font-semibold text-ink">
                {t("blog.recentArticles")}
              </h3>
              <ul className="mt-4 space-y-4">
                {recent.map((r) => (
                  <li key={r.slug} className="border-b border-line pb-4 last:border-0 last:pb-0">
                    <Link
                      to={`/blog/${r.slug}`}
                      className="block text-sm font-semibold text-ink hover:text-primary-600"
                    >
                      {r.title}
                    </Link>
                    <p className="mt-1 text-xs text-muted">
                      {r.date} &middot; {r.author}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-display text-lg font-semibold text-ink">
                {t("blog.postCategories")}
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <span className="text-muted">{t("blog.uncategorized")}</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      {/* PHOTO GALLERY */}
      {photos.length > 0 && (
        <Section id="gallery" className="!pt-0">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
              {t("blog.gallery")}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
              {t("blog.momentsField")}
            </h2>
            <p className="mt-3 text-muted">{t("blog.momentsSubtitle")}</p>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((p) => (
              <li
                key={p._id}
                className="overflow-hidden rounded-2xl border border-line bg-surface transition hover:border-primary-300 hover:shadow-md"
              >
                <div className="aspect-video w-full overflow-hidden bg-bg">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {p.description}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-primary-600">
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

      {/* VIDEOS */}
      <Section id="videos" className="bg-surface">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            {t("blog.videosEyebrow")}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
            {t("blog.videosTitle")}
          </h2>
          <p className="mt-3 text-muted">{t("blog.videosSubtitle")}</p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {apiVideos.length > 0
            ? apiVideos.map((v) => (
                <article
                  key={v._id}
                  className="overflow-hidden rounded-2xl border border-line bg-bg transition hover:border-primary-300 hover:shadow-md"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-[#0b1729]">
                    <video
                      src={v.videoUrl}
                      poster={v.posterUrl || undefined}
                      controls
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{v.description}</p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-primary-600">
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
                  className="overflow-hidden rounded-2xl border border-line bg-bg transition hover:border-primary-300 hover:shadow-md"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-[#0b1729]">
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
                      <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-primary-500/20 to-primary-900/40 text-white">
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
                          <p className="mt-2 text-xs font-semibold uppercase tracking-wider">
                            {t("common.comingSoon")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{v.description}</p>
                    {v.date && (
                      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-primary-600">
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
            className="inline-block rounded-md bg-primary-500 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-600"
          >
            {t("blog.haveAStory")}
          </Link>
        </div>
      </Section>
    </>
  );
}
