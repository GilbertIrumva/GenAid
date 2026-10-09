import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";
import { SITE } from "@/data/site";
import { stories as fallbackStories } from "@/data/stories";
import {
  getPublishedStories,
  mapSanityStoryToDisplayStory,
} from "@/lib/sanity";

interface DisplayStory {
  key: string;
  href: string;
  name: string;
  role: string;
  program: string;
  image: string;
  excerpt: string;
  videoUrl?: string;
  videoPoster?: string;
}

const successStoryVideos = [
  {
    youtubeId: "VRoXjJpB854",
    title: "Employer Testimonial: Inspiring Reflection by Michelle Lee",
    badge: "Employer Reflection · Global Hiring",
    description:
      "Hear firsthand feedback from global employers on the talent caliber, dedication, and transformative collaboration delivered by Generation Aid & Jobs graduates.",
  },
  {
    youtubeId: "HoWTNc58HZg",
    title: "English Language & Literacy Success Story: Unlocking Possibilities",
    badge: "Student Success Story · Education",
    description:
      "Watch refugee students in Kakuma share how practical English communication and literacy opened doors to scholarships, jobs, and renewed hope.",
  },
  {
    youtubeId: "o3gR64PDTZU",
    title: "Emergency Relief & Community Support: Standing Together in Kakuma",
    badge: "Community Lifeline · Kakuma",
    description:
      "Witness community solidarity and emergency food distribution as refugee leaders step forward during critical humanitarian funding cuts in Kakuma.",
  },
  {
    youtubeId: "rnSZrhR1PCw",
    title: "Refugee Voices & Lived Experience: Journeys of Transformation",
    badge: "Refugee Voices · Lived Experience",
    description:
      "Inspiring stories and lived experiences of refugee youth in Kakuma turning adversity into opportunity through skills, solidarity, and education.",
  },
];

export default function Stories() {
  const { t } = useTranslation();
  useSEO({
    title: "Stories from Kakuma",
    description:
      "Real journeys from graduates, entrepreneurs and changemakers across the Generation Aid community.",
  });

  const { data: sanityStories = [], isLoading } = useQuery({
    queryKey: ["public", "sanity", "stories"],
    queryFn: getPublishedStories,
    retry: false,
  });

  const usingFallback = sanityStories.length === 0;
  const displayStories: DisplayStory[] = usingFallback
    ? fallbackStories.map((s) => ({
      key: s.slug,
      href: `/stories/${s.slug}`,
      name: s.name,
      role: s.role,
      program: s.program,
      image: s.image,
      excerpt: s.excerpt,
      videoUrl: s.videoUrl,
      videoPoster: s.videoPoster,
    }))
    : sanityStories.map((story) => {
      const mapped = mapSanityStoryToDisplayStory(story);
      const isAkia =
        mapped.key === "from-skills-to-earning-success-story" ||
        mapped.name.toLowerCase().includes("akia");
      return {
        key: mapped.key,
        href: mapped.href,
        name: mapped.name,
        role: mapped.role,
        program: mapped.program,
        image: mapped.image,
        excerpt: mapped.excerpt,
        videoUrl: mapped.videoUrl || (isAkia ? "/videos/akia-success-story.mp4" : undefined),
        videoPoster: mapped.videoPoster || (isAkia ? "/videos/akia-poster.jpg" : undefined),
      };
    });

  const featured =
    displayStories.find((s) => s.key === "from-skills-to-earning-success-story") ||
    displayStories[0];
  const rest = displayStories.filter((s) => s.key !== featured?.key);

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      {/* HERO (Pattern C: Solid Primary Blue Impact) */}
      <section className="relative isolate flex min-h-[55vh] items-center overflow-hidden bg-brand-900 dark:bg-slate-950 text-white transition-colors">
        <SmartImage
          src="/programs/stories.jpg"
          alt="Learners sharing stories in Kakuma"
          fallbackLabel=""
          priority={true}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_20%] brightness-105 sm:brightness-110 contrast-[1.04] dark:brightness-100 dark:contrast-[1.08]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/85 via-brand-900/50 via-50% to-transparent dark:from-slate-950/90 dark:via-slate-900/65 dark:to-slate-950/25"
        />
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
              {t("stories.hero.eyebrow")}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl !text-white dark:!text-white">
              {t("stories.hero.titleStart")}{" "}
              <span className="text-white">
                {t("stories.hero.titleHighlight")}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white">
              {t("stories.hero.subtitleAlt")}
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED STORY (Pattern A: Canvas) */}
      {isLoading ? (
        <Section pattern="canvas">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="aspect-[4/3] w-full animate-pulse rounded-2xl bg-brand-100 dark:bg-slate-800" />
            <div className="space-y-3">
              <div className="h-4 w-24 animate-pulse rounded bg-brand-100 dark:bg-slate-800" />
              <div className="h-8 w-3/4 animate-pulse rounded bg-brand-100 dark:bg-slate-800" />
              <div className="h-4 w-full animate-pulse rounded bg-brand-100 dark:bg-slate-800" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-brand-100 dark:bg-slate-800" />
            </div>
          </div>
        </Section>
      ) : featured ? (
        <Section pattern="canvas">
          <article className="grid items-center gap-10 lg:grid-cols-2">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-border dark:border-slate-700 bg-brand-50 dark:bg-slate-800 shadow-sm relative group flex flex-col">
              {featured.videoUrl ? (
                (() => {
                  const isYouTube =
                    featured.videoUrl.includes("youtube.com") ||
                    featured.videoUrl.includes("youtu.be");
                  const ytId = isYouTube
                    ? featured.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)?.[1]
                    : null;

                  if (ytId) {
                    return (
                      <div className="relative h-full w-full bg-black">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0`}
                          title={`${featured.name} video`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="h-full w-full border-0"
                        />
                      </div>
                    );
                  }

                  return (
                    <div className="relative h-full w-full flex flex-col bg-black">
                      <video
                        src={featured.videoUrl}
                        poster={featured.videoPoster || featured.image}
                        controls
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover"
                      >
                        <source src={featured.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  );
                })()
              ) : (
                <SmartImage
                  src={featured.image}
                  alt={`${featured.name}${featured.role ? ` · ${featured.role}` : ""}`}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div>
              <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
                {t("stories.featured")}
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
                {featured.name}
              </h2>
              {(featured.role || featured.program) && (
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {[featured.role, featured.program]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
              <p className="mt-5 text-neutral-body dark:text-slate-300">{featured.excerpt}</p>
              <Link
                to={featured.href}
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline underline-offset-4"
              >
                {t("stories.readPersonStory", { name: featured.name })}
              </Link>
            </div>
          </article>
        </Section>
      ) : null}

      {/* VIDEO TESTIMONIALS & SUCCESS STORIES */}
      <section className="py-16 sm:py-20 bg-neutral-50 dark:bg-slate-900/60 border-t border-neutral-border/80 dark:border-slate-800 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
              Watch Real Impact in Motion
            </h2>
            <p className="mt-3 text-base text-neutral-body dark:text-slate-300">
              Experience authentic reflections and documentary features from graduates, employer partners, and community leaders in Kakuma.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {successStoryVideos.map((v) => (
              <div
                key={v.youtubeId}
                className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-border dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm transition hover:shadow-lg hover:border-brand-300 dark:hover:border-brand-500"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full border-0"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-brand-50 dark:bg-slate-700/80 px-2.5 py-1 text-xs font-bold text-brand-700 dark:text-brand-300">
                      {v.badge}
                    </span>
                    <a
                      href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                    >
                      <span>YouTube</span>
                      <span>↗</span>
                    </a>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-neutral-heading dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-body dark:text-slate-300 flex-1">
                    {v.description}
                  </p>
                  <div className="mt-5 pt-3 border-t border-neutral-border/60 dark:border-slate-700/60">
                    <a
                      href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition"
                    >
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      <span>Watch on YouTube</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY GRID (Brand Blue Palette) */}
      <section className="bg-brand-600 dark:bg-brand-700 py-16 sm:py-20 text-white transition-colors border-t border-brand-500/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold !text-white sm:text-4xl">
              {t("stories.moreFromCommunity")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/90">
              {t("stories.moreSubtitle")}
            </p>
          </div>

          {rest.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((s) => (
                <article
                  key={s.key}
                  className="flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-sm transition hover:border-white/50 hover:bg-white/15 hover:shadow-lg group"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-brand-700/60">
                    <SmartImage
                      src={s.image}
                      alt={`${s.name}${s.role ? ` · ${s.role}` : ""}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 text-white">
                    {s.program && (
                      <p className="text-xs font-bold uppercase tracking-wider text-brand-100">
                        {s.program}
                      </p>
                    )}
                    <h3 className="mt-2 font-display text-lg font-bold !text-white group-hover:text-brand-100 transition">
                      <Link to={s.href}>
                        {s.name}
                      </Link>
                    </h3>
                    {s.role && (
                      <p className="mt-1 text-xs text-brand-100">{s.role}</p>
                    )}
                    <p className="mt-3 flex-1 text-sm text-white/90 line-clamp-3 leading-relaxed">{s.excerpt}</p>
                    <div className="mt-4 pt-3 border-t border-white/15">
                      <Link
                        to={s.href}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white group-hover:text-brand-100 transition"
                      >
                        <span>{t("stories.readStory")}</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            !featured && (
              <p className="mt-10 rounded-xl border border-dashed border-white/30 bg-white/10 p-10 text-center text-sm text-white/80">
                {t("stories.empty")}
              </p>
            )
          )}
        </div>
      </section>

      {/* SHARE A STORY CTA (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl rounded-2xl border border-neutral-border dark:border-slate-700 bg-brand-50/50 dark:bg-slate-800/50 p-10 text-center shadow-sm">
          <h2 className="font-display text-2xl font-bold text-neutral-heading dark:text-slate-50 sm:text-3xl">
            {t("stories.shareTitle")}
          </h2>
          <p className="mt-3 text-neutral-body dark:text-slate-300">{t("stories.shareBody")}</p>
          <a
            href={`mailto:${SITE.email}?subject=Story%20submission`}
            className="mt-6 inline-block rounded-lg bg-brand-600 dark:bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700 dark:hover:bg-brand-400 transition"
          >
            {t("stories.submitStory")}
          </a>
        </div>
      </Section>
    </div>
  );
}
