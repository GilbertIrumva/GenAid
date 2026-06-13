import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Section from "@/components/Section";
import { posts } from "@/data/posts";
import { videos as fallbackVideos } from "@/data/videos";
import { api } from "@/api/client";

const recent = posts.slice(0, 3);

interface ApiVideo {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  createdAt: string;
}

async function fetchVideos(): Promise<ApiVideo[]> {
  const { data } = await api.get<ApiVideo[]>("/videos");
  return data;
}

export default function Blog() {
  const { data: apiVideos = [] } = useQuery({
    queryKey: ["public", "videos"],
    queryFn: fetchVideos,
  });

  return (
    <>
      {/* HERO */}
      <Section className="!pt-20 !pb-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            Our Blog
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl">
            News &amp; Updates
          </h1>
          <p className="mt-6 text-lg text-muted">
            Stories from the field, project launches and reflections from the
            Generation Aid team in Kakuma.
          </p>
          <div className="mt-6">
            <a
              href="#videos"
              className="inline-flex items-center gap-2 rounded-md border border-primary-500 px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50"
            >
              Watch our videos &darr;
            </a>
          </div>
        </div>
      </Section>

      {/* MAIN GRID */}
      <Section className="!pt-0">
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
                  <span>by {p.author}</span>
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
                  Read more &rarr;
                </Link>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-display text-lg font-semibold text-ink">About us</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Over the years, GAID has worked tirelessly to provide a range of
                services to displaced communities &mdash; including entrepreneurship,
                vocational education and digital skills. We became a legal
                Community-Based Organisation in 2019 and later transitioned to the name
                Generation Aid, before receiving our Government certificate in 2025.
                The name reflects our ambition of serving refugees and displaced youth
                within the Kakuma refugee camp.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-display text-lg font-semibold text-ink">
                Recent articles
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
                Post categories
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <span className="text-muted">Uncategorized</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      {/* VIDEOS */}
      <Section id="videos" className="bg-surface">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            Watch
          </span>
          <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
            Videos &amp; stories on screen
          </h2>
          <p className="mt-3 text-muted">
            Walkthroughs of our hub, graduate testimonials, behind-the-scenes from
            workshops, and updates from the field.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {apiVideos.length > 0
            ? apiVideos.map((v) => (
                <article
                  key={v._id}
                  className="overflow-hidden rounded-2xl border border-line bg-bg transition hover:border-primary-300 hover:shadow-md"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-ink">
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
                  <div className="relative aspect-video w-full overflow-hidden bg-ink">
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
                            Coming soon
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
            Have a story? Get in touch
          </Link>
        </div>
      </Section>
    </>
  );
}
