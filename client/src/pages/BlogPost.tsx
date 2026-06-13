import { useParams, Link } from "react-router-dom";
import Section from "@/components/Section";
import { posts } from "@/data/posts";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Section>
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl font-bold text-ink">Post not found</h1>
          <p className="mt-2 text-muted">The article you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            to="/blog"
            className="mt-6 inline-block rounded-md bg-primary-500 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-600"
          >
            Back to blog
          </Link>
        </div>
      </Section>
    );
  }

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Section className="!pt-20 !pb-10">
        <article className="mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="text-sm font-semibold text-primary-600 hover:underline"
          >
            &larr; Back to blog
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted">
            <time className="font-semibold uppercase tracking-wider text-primary-600">
              {post.date}
            </time>
            <span>&middot;</span>
            <span>by {post.author}</span>
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
            <h2 className="font-display text-2xl font-bold text-ink">More articles</h2>
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
