import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";
import { SITE } from "@/data/site";

interface ImpactMetric {
  _id: string;
  title: string;
  value: number;
  icon: string;
  order: number;
}

interface Story {
  _id: string;
  title: string;
  summary: string;
  image: string;
  author: string;
  createdAt: string;
}

function formatValue(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M+`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}k+`;
  return `${n.toLocaleString()}`;
}

export default function Impact() {
  useSEO({
    title: "Our impact",
    description:
      "Numbers, reports, and stories that show what refugee-led innovation is delivering in Kakuma.",
  });

  const { data: metrics = [], isLoading: metricsLoading } = useQuery<ImpactMetric[]>({
    queryKey: ["public", "impact"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "/api"}/impact`);
      if (!res.ok) throw new Error("Failed to load metrics");
      return res.json();
    },
  });

  const { data: stories = [] } = useQuery<Story[]>({
    queryKey: ["public", "stories"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "/api"}/stories`);
      if (!res.ok) throw new Error("Failed to load stories");
      return res.json();
    },
  });

  const featuredStories = stories.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        {/* TODO: replace with real Generation Aid photo */}
        <SmartImage
          src="https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=1600&q=80"
          alt="Celebrating achievement and learning"
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-900/90 via-ink/85 to-ink/70"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle_at_top_right,theme(colors.primary.400),transparent_60%)]"
        />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-300">
            Our impact
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            Real numbers. Real lives.{" "}
            <span className="text-primary-300">Real change in Kakuma.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
            We measure what matters — opportunities created, livelihoods restored,
            and futures unlocked. Every number below represents a person whose
            potential is finally being met.
          </p>
        </div>
      </section>

      {/* METRICS */}
      <Section className="bg-bg">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              By the numbers
            </h2>
            <p className="mt-1 text-sm text-muted">Updated as our programs grow.</p>
          </div>
        </div>

        {metricsLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-36 animate-pulse rounded-2xl border border-line bg-surface"
              />
            ))}
          </div>
        ) : metrics.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center text-sm text-muted">
            Impact metrics will appear here as we publish them.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m._id}
                className="rounded-2xl border border-line bg-surface p-6 shadow-sm transition hover:border-primary-300 hover:shadow-md"
              >
                {m.icon && (
                  <div className="text-3xl" aria-hidden="true">
                    {m.icon}
                  </div>
                )}
                <div className="mt-3 font-display text-4xl font-bold text-primary-600">
                  {formatValue(m.value)}
                </div>
                <p className="mt-2 text-sm font-medium text-ink">{m.title}</p>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* STORIES PREVIEW */}
      {featuredStories.length > 0 && (
        <Section className="bg-surface">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                Behind the numbers
              </h2>
              <p className="mt-1 text-sm text-muted">
                The people whose lives our programs have shaped.
              </p>
            </div>
            <Link
              to="/stories"
              className="text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              Read all stories →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredStories.map((s) => (
              <article
                key={s._id}
                className="overflow-hidden rounded-2xl border border-line bg-bg shadow-sm"
              >
                {s.image ? (
                  <img
                    src={s.image}
                    alt=""
                    className="aspect-video w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-bg text-xs text-muted">
                    No image
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted">{s.summary}</p>
                  <p className="mt-3 text-xs uppercase tracking-wide text-primary-600">
                    {s.author}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section className="bg-primary-600 text-white">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Want to help these numbers grow?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-primary-100">
              Every donation, partnership, or volunteer hour expands what we can
              deliver next year.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={SITE.donateUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-accent-500 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-accent-400"
            >
              Donate
            </a>
            <Link
              to="/contact"
              className="rounded-md border border-white/40 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
            >
              Partner with us
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
