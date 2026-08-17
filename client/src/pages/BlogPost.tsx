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

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const seedMatch = seedPosts.find((p) => p.slug === slug);

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

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
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

          <div className="mt-8 space-y-5 text-base leading-relaxed text-neutral-body dark:text-slate-300 sm:text-lg">
            {post.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </article>
      </Section>

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
