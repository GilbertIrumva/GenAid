import { Link, useParams } from "react-router-dom";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";
import { stories } from "@/data/stories";

export default function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const story = stories.find((s) => s.slug === id);

  useSEO({
    title: story ? `${story.name} — ${story.role}` : "Story not found",
    description: story?.excerpt,
    type: "article",
    image: story?.image,
  });

  if (!story) {
    return (
      <Section>
        <div className="mx-auto max-w-md text-center">
          <h1 className="font-display text-3xl font-bold text-ink">
            Story not found
          </h1>
          <p className="mt-3 text-muted">
            We couldn&apos;t find a story at this URL.
          </p>
          <Link
            to="/stories"
            className="mt-6 inline-block rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
          >
            Back to all stories
          </Link>
        </div>
      </Section>
    );
  }

  const others = stories.filter((s) => s.slug !== story.slug).slice(0, 3);

  return (
    <>
      <Section className="!pt-20 !pb-10">
        <article className="mx-auto max-w-3xl">
          <Link
            to="/stories"
            className="text-sm font-semibold text-primary-600 hover:underline"
          >
            &larr; All stories
          </Link>

          <header className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              {story.program} &middot; {story.location}
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold text-ink sm:text-5xl">
              {story.name}
            </h1>
            <p className="mt-2 text-lg text-muted">{story.role}</p>
          </header>

          <div className="mt-8 aspect-[16/10] w-full overflow-hidden rounded-3xl bg-primary-100">
            <SmartImage
              src={story.image}
              alt={`${story.name} — ${story.role}`}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="prose prose-lg mt-10 max-w-none space-y-5 text-ink">
            {story.content.map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-ink/90">
                {para}
              </p>
            ))}
          </div>
        </article>
      </Section>

      {others.length > 0 && (
        <Section className="bg-surface">
          <h2 className="font-display text-2xl font-bold text-ink">
            More stories
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {others.map((s) => (
              <article
                key={s.slug}
                className="flex flex-col overflow-hidden rounded-2xl border border-line bg-bg shadow-sm transition hover:border-primary-300 hover:shadow-md"
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
                  <p className="mt-2 flex-1 text-sm text-muted">{s.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
