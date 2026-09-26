import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { posts as seedPosts, type BlogPost as SeedPost } from "@/data/posts";
import { useSEO } from "@/utils/useSEO";
import {
  getPublishedPostBySlug,
  mapSanityPostToDisplayPost,
} from "@/lib/sanity";

interface DisplayPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  cover: string | undefined;
  content: string[];
}

function fromSeed(p: SeedPost): DisplayPost {
  return {
    slug: p.slug,
    title: p.title,
    date: p.date,
    author: p.author,
    excerpt: p.excerpt,
    cover: p.cover,
    content: p.content,
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

function renderBlock(block: string, i: number) {
  if (block.startsWith("## ")) {
    return (
      <h2
        key={i}
        className="pt-6 font-display text-2xl sm:text-3xl font-bold text-neutral-heading dark:text-white border-b border-neutral-border/60 dark:border-slate-800 pb-2"
      >
        {block.replace(/^## /, "")}
      </h2>
    );
  }
  if (block.startsWith("### ")) {
    return (
      <h3
        key={i}
        className="pt-4 font-display text-xl sm:text-2xl font-bold text-neutral-heading dark:text-slate-100"
      >
        {block.replace(/^### /, "")}
      </h3>
    );
  }
  if (block.startsWith("> ")) {
    return (
      <blockquote
        key={i}
        className="my-6 border-l-4 border-brand-500 bg-brand-50/70 dark:bg-slate-800/70 p-4 sm:p-5 rounded-r-xl italic font-medium text-neutral-heading dark:text-slate-100 text-base sm:text-lg shadow-sm"
      >
        {renderFormattedText(block.replace(/^> /, ""))}
      </blockquote>
    );
  }
  if (block.startsWith("🔹 ")) {
    return (
      <div
        key={i}
        className="my-3 flex items-start gap-3 rounded-xl bg-neutral-bg/60 dark:bg-slate-800/60 p-4 border border-neutral-border/70 dark:border-slate-700/70"
      >
        <span className="text-brand-600 dark:text-brand-400 text-lg shrink-0 mt-0.5" aria-hidden="true">
          🔹
        </span>
        <div className="text-base text-neutral-body dark:text-slate-300 leading-relaxed">
          {renderFormattedText(block.replace(/^🔹 /, ""))}
        </div>
      </div>
    );
  }
  return (
    <p key={i} className="text-base leading-relaxed text-neutral-body dark:text-slate-300 sm:text-lg">
      {renderFormattedText(block)}
    </p>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const seedMatch = seedPosts.find((p) => p.slug === slug);

  const [prevSlug, setPrevSlug] = useState(slug);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (prevSlug !== slug) {
    setPrevSlug(slug);
    setActiveImageIndex(0);
  }

  const { data: sanityPost, isLoading } = useQuery({
    queryKey: ["public", "sanity", "post", slug],
    enabled: Boolean(slug),
    queryFn: () => getPublishedPostBySlug(slug ?? ""),
    retry: false,
  });

  const post: DisplayPost | null = sanityPost
    ? mapSanityPostToDisplayPost(sanityPost)
    : seedMatch
      ? fromSeed(seedMatch)
      : null;

  useSEO({
    title: post?.title ?? "Blog post",
    description: post?.excerpt,
    image: post?.cover,
    type: "article",
  });

  if (isLoading && !seedMatch) {
    return (
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl animate-pulse space-y-4">
          <div className="h-4 w-24 rounded bg-brand-100 dark:bg-slate-800" />
          <div className="h-10 w-3/4 rounded bg-brand-100 dark:bg-slate-800" />
          <div className="aspect-video w-full rounded-2xl bg-brand-100 dark:bg-slate-800" />
          <div className="h-4 w-full rounded bg-brand-100 dark:bg-slate-800" />
          <div className="h-4 w-11/12 rounded bg-brand-100 dark:bg-slate-800" />
          <div className="h-4 w-10/12 rounded bg-brand-100 dark:bg-slate-800" />
        </div>
      </Section>
    );
  }

  if (!post) {
    return (
      <Section pattern="canvas">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl font-bold text-neutral-heading dark:text-slate-50">
            {t("blog.postNotFound")}
          </h1>
          <p className="mt-2 text-neutral-body dark:text-slate-300">{t("blog.postNotFoundSubtitle")}</p>
          <Link
            to="/blog"
            className="mt-6 inline-block rounded-lg bg-brand-600 dark:bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700 dark:hover:bg-brand-400 transition"
          >
            {t("blog.backToBlog")}
          </Link>
        </div>
      </Section>
    );
  }

  const others = seedPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)
    .map(fromSeed);

  // Separate media (photos) from text blocks so posts with galleries display side-by-side
  const mediaList: { src: string; alt: string }[] = [];
  const textBlocks: string[] = [];

  if (post.cover) {
    mediaList.push({ src: post.cover, alt: post.title });
  }

  post.content.forEach((block) => {
    if (block.startsWith("![") && block.includes("](") && block.endsWith(")")) {
      const match = block.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (match) {
        const alt = match[1];
        const src = match[2];
        if (!mediaList.some((m) => m.src === src)) {
          mediaList.push({ alt, src });
        }
        return;
      }
    }
    textBlocks.push(block);
  });

  const isSideBySide = mediaList.length > 1;
  const activeMedia = mediaList[activeImageIndex] || mediaList[0];

  const pbsSection = post.slug === "how-foreign-aid-cuts-threaten-refugee-led-initiatives-a-call-for-sustainable-solutions" && (
    <div className="my-10 overflow-hidden rounded-2xl border border-brand-200 dark:border-brand-800 bg-brand-50/70 dark:bg-slate-800/80 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-200/60 dark:border-slate-700">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 dark:bg-red-950/80 px-2.5 py-0.5 text-xs font-semibold text-red-700 dark:text-red-400">
            ▶ Watch Broadcast
          </span>
          <h3 className="mt-2 text-lg sm:text-xl font-bold text-neutral-heading dark:text-white">
            PBS News Interview with Hubert Senga
          </h3>
          <p className="mt-1 text-sm text-neutral-body dark:text-slate-300">
            How foreign aid cuts affect programs and livelihoods in Kenya&apos;s Kakuma refugee camp.
          </p>
        </div>
        <a
          href="https://www.youtube.com/watch?v=vIK-iBooRfo&t=8s"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 shrink-0 rounded-lg bg-red-600 hover:bg-red-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition"
        >
          <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
          <span>Watch on YouTube</span>
        </a>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-brand-200/80 dark:border-slate-700 shadow-md">
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src="https://www.youtube-nocookie.com/embed/vIK-iBooRfo"
            title="PBS News Interview with Hubert Senga"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 mb-3">
          How You Can Support Sustainable Solutions
        </h4>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-white dark:bg-slate-900 p-4 border border-brand-100 dark:border-slate-700 shadow-sm">
            <strong className="block text-neutral-heading dark:text-white font-semibold">1. Partner With Generation Aid</strong>
            <span className="text-xs text-neutral-body dark:text-slate-400 mt-1 block">Collaborate with our digital labs to hire remote refugee talent and support digital literacy cohorts.</span>
          </div>
          <div className="rounded-xl bg-white dark:bg-slate-900 p-4 border border-brand-100 dark:border-slate-700 shadow-sm">
            <strong className="block text-neutral-heading dark:text-white font-semibold">2. Direct RLO Investment</strong>
            <span className="text-xs text-neutral-body dark:text-slate-400 mt-1 block">Support refugee-led organizations directly to build durable, localized economic freedom and digital independence.</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      {isSideBySide ? (
        <Section pattern="canvas" className="!pt-20 !pb-12">
          <div className="mx-auto max-w-7xl">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline underline-offset-4 mb-6"
            >
              <span>&larr;</span>
              <span>{t("blog.backToBlog")}</span>
            </Link>

            <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 items-start">
              {/* LEFT COLUMN: Continuous Full Blog Narrative */}
              <article className="lg:col-span-7 flex flex-col">
                <header className="border-b border-neutral-border/70 dark:border-slate-800 pb-6 mb-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-body dark:text-slate-400">
                    <time className="font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                      {post.date}
                    </time>
                    <span>&middot;</span>
                    <span>{t("blog.byAuthor", { author: post.author })}</span>
                  </div>
                  <h1 className="mt-3 font-display text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl lg:text-5xl leading-tight">
                    {post.title}
                  </h1>
                </header>

                <div className="space-y-6 text-base sm:text-lg leading-relaxed text-neutral-body dark:text-slate-300">
                  {textBlocks.map((block, i) => renderBlock(block, i))}
                </div>

                {pbsSection}
              </article>

              {/* RIGHT COLUMN: Media Showcase (Side-by-Side Photos) */}
              <aside className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-muted dark:text-slate-400 px-1">
                  <span>Photos from this post</span>
                  {mediaList.length > 1 && (
                    <span className="text-brand-600 dark:text-brand-400">
                      {activeImageIndex + 1} of {mediaList.length}
                    </span>
                  )}
                </div>

                {/* Main Active Photo */}
                <div className="overflow-hidden rounded-2xl border border-neutral-border dark:border-slate-700 bg-brand-50 dark:bg-slate-800 aspect-[4/3] shadow-sm">
                  <SmartImage
                    src={activeMedia.src}
                    alt={activeMedia.alt || post.title}
                    className="h-full w-full object-cover transition duration-300"
                  />
                </div>

                {/* Caption if available */}
                {activeMedia.alt && activeMedia.alt !== post.title && (
                  <p className="text-xs text-neutral-body dark:text-slate-400 text-center italic px-1">
                    {activeMedia.alt}
                  </p>
                )}

                {/* Thumbnails */}
                {mediaList.length > 1 && (
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 pt-1">
                    {mediaList.map((m, idx) => (
                      <button
                        key={idx}
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
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </aside>
            </div>
          </div>
        </Section>
      ) : (
        <Section pattern="canvas" className="!pt-20 !pb-10">
          <article className="mx-auto max-w-3xl">
            <Link
              to="/blog"
              className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline underline-offset-4"
            >
              {t("blog.backToBlog")}
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-neutral-body dark:text-slate-400">
              <time className="font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {post.date}
              </time>
              <span>&middot;</span>
              <span>{t("blog.byAuthor", { author: post.author })}</span>
            </div>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-neutral-heading dark:text-slate-50 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {post.cover && (
              <figure className="mt-8 overflow-hidden rounded-2xl border border-neutral-border dark:border-slate-700 shadow-sm">
                <SmartImage
                  src={post.cover}
                  alt={post.title}
                  className="h-full w-full object-cover"
                  fallbackLabel="Blog post cover"
                />
              </figure>
            )}

            <div className="mt-8 space-y-6 text-base leading-relaxed text-neutral-body dark:text-slate-300 sm:text-lg">
              {post.content.map((block, i) => {
                if (block.startsWith("![") && block.includes("](") && block.endsWith(")")) {
                  const match = block.match(/^!\[(.*?)\]\((.*?)\)$/);
                  if (match) {
                    const [, alt, src] = match;
                    return (
                      <figure
                        key={i}
                        className="my-8 overflow-hidden rounded-2xl border border-neutral-border dark:border-slate-700 shadow-md"
                      >
                        <SmartImage
                          src={src}
                          alt={alt}
                          className="w-full h-auto max-h-[500px] object-cover"
                          fallbackLabel={alt}
                        />
                        {alt && (
                          <figcaption className="px-4 py-2.5 text-center text-xs sm:text-sm text-neutral-500 dark:text-slate-400 bg-neutral-50 dark:bg-slate-800/60 border-t border-neutral-border/60 dark:border-slate-700/60 italic">
                            {alt}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }
                }
                return renderBlock(block, i);
              })}
            </div>

            {pbsSection}
          </article>
        </Section>
      )}

      {others.length > 0 && (
        <Section pattern="soft" className="!pt-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-2xl font-bold text-neutral-heading dark:text-slate-50">
              {t("blog.moreArticles")}
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  to={`/blog/${o.slug}`}
                  className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
                >
                  <time className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    {o.date}
                  </time>
                  <h3 className="mt-2 font-display text-base font-semibold text-neutral-heading dark:text-slate-100">
                    {o.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-body dark:text-slate-300 line-clamp-3">
                    {o.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}
