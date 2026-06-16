import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import { api } from "@/api/client";
import { posts as seedPosts, type BlogPost as SeedPost } from "@/data/posts";
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

/** Unified display shape for the page. */
interface DisplayPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  cover: string | undefined;
  content: string[];
}

function formatDate(input: string, locale: string): string {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Server stores content as a single string with blank-line paragraph breaks. */
function splitParagraphs(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function fromApi(p: ApiPost, locale: string): DisplayPost {
  return {
    slug: p.slug ?? p._id,
    title: p.title,
    date: formatDate(p.publishedAt ?? p.createdAt, locale),
    author: p.author,
    excerpt: p.excerpt,
    cover: p.cover || undefined,
    content: splitParagraphs(p.content),
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
    content: p.content,
  };
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const seedMatch = seedPosts.find((p) => p.slug === slug);

  const query = useQuery<ApiPost | null>({
    queryKey: ["public", "posts", slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      try {
        const { data } = await api.get<ApiPost>(`/posts/${slug}`);
        return data;
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 404) {
          return null;
        }
        throw err;
      }
    },
  });

  // API result wins; seed copy is the fallback so the page never feels empty in dev.
  const post: DisplayPost | null = query.data
    ? fromApi(query.data, i18n.language)
    : seedMatch
    ? fromSeed(seedMatch)
    : null;

  useSEO({
    title: post?.title ?? "Blog post",
    description: post?.excerpt,
    image: post?.cover,
    type: "article",
  });

  if (query.isLoading && !seedMatch) {
    return (
      <Section>
        <div className="mx-auto max-w-3xl animate-pulse space-y-4">
          <div className="h-4 w-24 rounded bg-surface" />
          <div className="h-10 w-3/4 rounded bg-surface" />
          <div className="aspect-video w-full rounded-2xl bg-surface" />
          <div className="h-4 w-full rounded bg-surface" />
          <div className="h-4 w-11/12 rounded bg-surface" />
          <div className="h-4 w-10/12 rounded bg-surface" />
        </div>
      </Section>
    );
  }

  if (!post) {
    return (
      <Section>
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl font-bold text-ink">{t("blog.postNotFound")}</h1>
          <p className="mt-2 text-muted">{t("blog.postNotFoundSubtitle")}</p>
          <Link
            to="/blog"
            className="mt-6 inline-block rounded-md bg-primary-500 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-600"
          >
            {t("blog.backToBlog")}
          </Link>
        </div>
      </Section>
    );
  }

  // "More articles" is sourced from the seed list — keeps the section lively
  // while we only fetch the single post on this route.
  const others = seedPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)
    .map(fromSeed);

  return (
    <>
      <Section className="!pt-20 !pb-10">
        <article className="mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="text-sm font-semibold text-primary-600 hover:underline"
          >
            {t("blog.backToBlog")}
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted">
            <time className="font-semibold uppercase tracking-wider text-primary-600">
              {post.date}
            </time>
            <span>&middot;</span>
            <span>{t("blog.byAuthor", { author: post.author })}</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {post.cover && (
            <figure className="mt-8 overflow-hidden rounded-2xl border border-line">
              <img
                src={post.cover}
                alt={post.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </figure>
          )}

          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {post.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </article>
      </Section>

      {others.length > 0 && (
        <Section className="bg-surface !pt-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-2xl font-bold text-ink">{t("blog.moreArticles")}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  to={`/blog/${o.slug}`}
                  className="rounded-2xl border border-line bg-bg p-5 transition hover:border-primary-300 hover:shadow-md"
                >
                  <time className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                    {o.date}
                  </time>
                  <h3 className="mt-2 font-display text-base font-semibold text-ink">
                    {o.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted line-clamp-3">{o.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
