import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { api } from "@/api/client";
import { useSEO } from "@/utils/useSEO";
import { SITE } from "@/data/site";
import { stories as fallbackStories } from "@/data/stories";

/**
 * Server-side story shape returned by /api/stories. Display fields are optional
 * because older records may have been created before they were added.
 */
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
  image: string;
  excerpt: string;
}

/** Map an API story to the shape the cards render with. */
function fromApi(s: ApiStory): DisplayStory {
  return {
    key: s._id,
    href: `/stories/${s.slug ?? s._id}`,
    name: s.title || s.author,
    role: s.role || s.author,
    program: s.program || "",
    image: s.image,
    excerpt: s.excerpt || s.summary,
  };
}

export default function Stories() {
  const { t } = useTranslation();
  useSEO({
    title: "Stories from Kakuma",
    description:
      "Real journeys from graduates, entrepreneurs and changemakers across the Generation Aid community.",
  });

  const { data: apiStories = [], isLoading } = useQuery<ApiStory[]>({
    queryKey: ["public", "stories"],
    queryFn: async () => {
      const { data } = await api.get<ApiStory[]>("/stories");
      return data;
    },
  });

  // Until the CMS is populated, fall back to the static seed list so the page
  // never looks empty.
  const usingFallback = apiStories.length === 0;
  const displayStories: DisplayStory[] = usingFallback
    ? fallbackStories.map((s) => ({
        key: s.slug,
        href: `/stories/${s.slug}`,
        name: s.name,
        role: s.role,
        program: s.program,
        image: s.image,
        excerpt: s.excerpt,
      }))
    : apiStories.map(fromApi);

  const featured = displayStories[0];
  const rest = displayStories.slice(1);

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
              {t("stories.hero.eyebrow")}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              {t("stories.hero.titleStart")}{" "}
              <span className="text-primary-300">{t("stories.hero.titleHighlight")}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">{t("stories.hero.subtitleAlt")}</p>
          </div>
        </div>
      </section>

      {isLoading ? (
        <Section className="bg-surface">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="aspect-[4/3] w-full animate-pulse rounded-3xl bg-primary-100" />
            <div className="space-y-3">
              <div className="h-4 w-24 animate-pulse rounded bg-primary-100" />
              <div className="h-8 w-3/4 animate-pulse rounded bg-primary-100" />
              <div className="h-4 w-full animate-pulse rounded bg-primary-100" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-primary-100" />
            </div>
          </div>
        </Section>
      ) : featured ? (
        <Section className="bg-surface">
          <article className="grid items-center gap-10 lg:grid-cols-2">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl bg-primary-100">
              <SmartImage
                src={featured.image}
                alt={`${featured.name}${featured.role ? ` — ${featured.role}` : ""}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
                {t("stories.featured")}
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
                {featured.name}
              </h2>
              {(featured.role || featured.program) && (
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-primary-600">
                  {[featured.role, featured.program].filter(Boolean).join(" · ")}
                </p>
              )}
              <p className="mt-5 text-muted">{featured.excerpt}</p>
              <Link
                to={featured.href}
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:underline"
              >
                {t("stories.readPersonStory", { name: featured.name })}
              </Link>
            </div>
          </article>
        </Section>
      ) : null}

      {/* STORY GRID */}
      <Section>
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            {t("stories.moreFromCommunity")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">{t("stories.moreSubtitle")}</p>
        </div>

        {rest.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((s) => (
              <article
                key={s.key}
                className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition hover:border-primary-300 hover:shadow-md"
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
                  {s.role && <p className="mt-1 text-xs text-muted">{s.role}</p>}
                  <p className="mt-3 flex-1 text-sm text-muted">{s.excerpt}</p>
                  <Link
                    to={s.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:underline"
                  >
                    {t("stories.readStory")}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          !featured && (
            <p className="mt-10 rounded-2xl border border-dashed border-line bg-surface p-10 text-center text-sm text-muted">
              {t("stories.empty")}
            </p>
          )
        )}
      </Section>

      {/* SHARE A STORY CTA */}
      <Section className="bg-surface">
        <div className="mx-auto max-w-3xl rounded-3xl border border-line bg-bg p-10 text-center">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            {t("stories.shareTitle")}
          </h2>
          <p className="mt-3 text-muted">{t("stories.shareBody")}</p>
          <a
            href={`mailto:${SITE.email}?subject=Story%20submission`}
            className="mt-6 inline-block rounded-md bg-primary-500 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-600"
          >
            {t("stories.submitStory")}
          </a>
        </div>
      </Section>
    </>
  );
}
