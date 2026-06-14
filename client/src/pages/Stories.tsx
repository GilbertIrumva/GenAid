import { Link } from "react-router-dom";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";
import { SITE } from "@/data/site";
import { stories } from "@/data/stories";

export default function Stories() {
  useSEO({
    title: "Stories from Kakuma",
    description:
      "Real journeys from graduates, entrepreneurs and changemakers across the Generation Aid community.",
  });

  const featured = stories[0];
  const rest = stories.slice(1);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[55vh] items-center overflow-hidden">
        {/* TODO: replace with real Generation Aid photo */}
        <SmartImage
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80"
          alt="Portrait representing the people behind our stories"
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/65 to-ink/40"
        />
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-300 backdrop-blur">
              Stories
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              Real journeys from{" "}
              <span className="text-primary-300">Kakuma</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              Every number on our impact page is a person. These are some of the
              people behind the numbers &mdash; in their own words.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED STORY */}
      {featured && (
        <Section className="bg-surface">
          <article className="grid items-center gap-10 lg:grid-cols-2">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl bg-primary-100">
              <SmartImage
                src={featured.image}
                alt={`${featured.name} — ${featured.role}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
                Featured story
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
                {featured.name}
              </h2>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-primary-600">
                {featured.role} &middot; {featured.program}
              </p>
              <p className="mt-5 text-muted">{featured.excerpt}</p>
              <Link
                to={`/stories/${featured.slug}`}
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:underline"
              >
                Read {featured.name}&apos;s story &rarr;
              </Link>
            </div>
          </article>
        </Section>
      )}

      {/* STORY GRID */}
      <Section>
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            More stories from the community
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            From first-time coders to cooperative founders &mdash; explore the
            paths our learners are building.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((s) => (
            <article
              key={s.slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition hover:border-primary-300 hover:shadow-md"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-primary-50">
                <SmartImage
                  src={s.image}
                  alt={`${s.name} — ${s.role}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                  {s.program}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                  <Link
                    to={`/stories/${s.slug}`}
                    className="hover:text-primary-600"
                  >
                    {s.name}
                  </Link>
                </h3>
                <p className="mt-1 text-xs text-muted">{s.role}</p>
                <p className="mt-3 flex-1 text-sm text-muted">{s.excerpt}</p>
                <Link
                  to={`/stories/${s.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:underline"
                >
                  Read story &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* SHARE A STORY CTA */}
      <Section className="bg-surface">
        <div className="mx-auto max-w-3xl rounded-3xl border border-line bg-bg p-10 text-center">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Are you a graduate? Share your story.
          </h2>
          <p className="mt-3 text-muted">
            Your journey can inspire the next learner who walks into the Hub.
            We&apos;ll help you write and publish it &mdash; in any language
            you&apos;re comfortable with.
          </p>
          <a
            href={`mailto:${SITE.email}?subject=Story%20submission`}
            className="mt-6 inline-block rounded-md bg-primary-500 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-600"
          >
            Submit your story
          </a>
        </div>
      </Section>
    </>
  );
}
