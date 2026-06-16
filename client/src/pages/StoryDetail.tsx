import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { api } from "@/api/client";
import { useSEO } from "@/utils/useSEO";
import { stories as fallbackStories, type Story as FallbackStory } from "@/data/stories";

interface ApiStory {
  _id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  slug?: string;
  role?: string;
  program?: string;
  location?: string;
  excerpt?: string;
  createdAt: string;
}

interface DisplayStory {
  key: string;
  href: string;
  name: string;
  role: string;
  program: string;
  location: string;
  image: string;
  excerpt: string;
  paragraphs: string[];
}

function fromApi(s: ApiStory): DisplayStory {
  // Treat blank lines as paragraph breaks, keeping the UI consistent with the
  // static seed data which is already an array of paragraphs.
  const paragraphs = s.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  return {
    key: s._id,
    href: `/stories/${s.slug ?? s._id}`,
    name: s.title || s.author,
    role: s.role || s.author,
    program: s.program || "",
    location: s.location || "",
    image: s.image,
    excerpt: s.excerpt || s.summary,
    paragraphs,
  };
}

function fromFallback(s: FallbackStory): DisplayStory {
  return {
    key: s.slug,
    href: `/stories/${s.slug}`,
    name: s.name,
    role: s.role,
    program: s.program,
    location: s.location,
    image: s.image,
    excerpt: s.excerpt,
    paragraphs: s.content,
  };
}

export default function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const { data: apiStory, isLoading } = useQuery<ApiStory | null>({
    queryKey: ["public", "story", id],
    enabled: Boolean(id),
    queryFn: async () => {
      try {
        const { data } = await api.get<ApiStory>(`/stories/${id}`);
        return data;
      } catch {
        // Fall back to local seed data below — surfaces "not found" if neither has it.
        return null;
      }
    },
  });

  const story: DisplayStory | undefined = apiStory
    ? fromApi(apiStory)
    : fallbackStories
        .filter((s) => s.slug === id)
        .map(fromFallback)[0];

  useSEO({
    title: story ? `${story.name}${story.role ? ` — ${story.role}` : ""}` : "Story not found",
    description: story?.excerpt,
    type: "article",
    image: story?.image,
  });

  if (isLoading && !story) {
    return (
      <Section>
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="h-4 w-32 animate-pulse rounded bg-primary-100" />
          <div className="h-12 w-3/4 animate-pulse rounded bg-primary-100" />
          <div className="aspect-[16/10] w-full animate-pulse rounded-3xl bg-primary-100" />
          <div className="h-4 w-full animate-pulse rounded bg-primary-100" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-primary-100" />
        </div>
      </Section>
    );
  }

  if (!story) {
    return (
      <Section>
        <div className="mx-auto max-w-md text-center">
          <h1 className="font-display text-3xl font-bold text-ink">
            {t("stories.notFound")}
          </h1>
          <p className="mt-3 text-muted">
            {t("stories.notFoundSubtitle")}
          </p>
          <Link
            to="/stories"
            className="mt-6 inline-block rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
          >
            {t("stories.backToAll")}
          </Link>
        </div>
      </Section>
    );
  }

  // Build the "more stories" rail: prefer real API data when available; otherwise
  // pad with the fallback seed.
  const others: DisplayStory[] = (apiStory ? [] : fallbackStories.map(fromFallback))
    .filter((s) => s.key !== story.key)
    .slice(0, 3);

  const meta = [story.program, story.location].filter(Boolean).join(" · ");

  return (
    <>
      <Section className="!pt-20 !pb-10">
        <article className="mx-auto max-w-3xl">
          <Link
            to="/stories"
            className="text-sm font-semibold text-primary-600 hover:underline"
          >
            {t("stories.allStories")}
          </Link>

          <header className="mt-6">
            {meta && (
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                {meta}
              </p>
            )}
            <h1 className="mt-2 font-display text-4xl font-bold text-ink sm:text-5xl">
              {story.name}
            </h1>
            {story.role && (
              <p className="mt-2 text-lg text-muted">{story.role}</p>
            )}
          </header>

          {story.image && (
            <div className="mt-8 aspect-[16/10] w-full overflow-hidden rounded-3xl bg-primary-100">
              <SmartImage
                src={story.image}
                alt={`${story.name}${story.role ? ` — ${story.role}` : ""}`}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg mt-10 max-w-none space-y-5 text-ink">
            {story.paragraphs.map((para, i) => (
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
            {t("stories.moreStories")}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {others.map((s) => (
              <article
                key={s.key}
                className="flex flex-col overflow-hidden rounded-2xl border border-line bg-bg shadow-sm transition hover:border-primary-300 hover:shadow-md"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-primary-50">
                  <SmartImage
                    src={s.image}
                    alt={`${s.name}${s.role ? ` — ${s.role}` : ""}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  {s.program && (
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                      {s.program}
                    </p>
                  )}
                  <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                    <Link to={s.href} className="hover:text-primary-600">
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
