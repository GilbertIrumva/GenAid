import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { SITE } from "@/data/site";
import { useSEO } from "@/utils/useSEO";
import { defaultPrograms, type DetailedProgram } from "@/data/programsData";
import { getPrograms, mapSanityProgramToDisplayProgram } from "@/lib/sanity";

export default function ProgramDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const { data: sanityPrograms = [] } = useQuery({
    queryKey: ["public", "sanity", "programs"],
    queryFn: getPrograms,
    retry: false,
  });

  const matchedSanity = useMemo(() => {
    return sanityPrograms.find(
      (p) => p.id === id || p.slug === id || p._id === id || p._id === `program-${id}`
    );
  }, [sanityPrograms, id]);

  const matchedDefault = useMemo(() => {
    return defaultPrograms.find((p) => p.id === id || p.slug === id);
  }, [id]);

  const detail: DetailedProgram | undefined = useMemo(() => {
    if (!matchedDefault && !matchedSanity) return undefined;
    if (!matchedSanity) return matchedDefault;

    const mapped = mapSanityProgramToDisplayProgram(matchedSanity) as unknown as Partial<DetailedProgram>;
    return {
      ...matchedDefault,
      ...mapped,
      id: mapped.id || mapped.slug || matchedDefault?.id || "",
      quote: mapped.quote?.text ? mapped.quote : matchedDefault?.quote,
      gainsTitle: mapped.gainsTitle || matchedDefault?.gainsTitle,
      gainsImage: mapped.gainsImage || matchedDefault?.gainsImage,
      whyItMattersImage: mapped.whyItMattersImage || matchedDefault?.whyItMattersImage,
      componentsImage: mapped.componentsImage || matchedDefault?.componentsImage,
      mediaVideos:
        mapped.mediaVideos && mapped.mediaVideos.length > 0
          ? mapped.mediaVideos
          : matchedDefault?.mediaVideos,
      connectLinks:
        mapped.connectLinks && mapped.connectLinks.length > 0
          ? mapped.connectLinks
          : matchedDefault?.connectLinks,
      features:
        Array.isArray(mapped.features) && mapped.features.length > 0
          ? mapped.features
          : matchedDefault?.features || [],
      gains:
        Array.isArray(mapped.gains) && mapped.gains.length > 0
          ? mapped.gains
          : matchedDefault?.gains || [],
      gallery:
        Array.isArray(mapped.gallery) && mapped.gallery.length > 0
          ? mapped.gallery
          : matchedDefault?.gallery || [],
    } as DetailedProgram;
  }, [matchedSanity, matchedDefault]);

  useSEO({
    title: detail?.title ?? t("programDetail.notFound", "Program Not Found"),
    description: detail?.body?.slice(0, 160),
  });

  if (!detail) {
    return (
      <Section pattern="canvas">
        <div className="mx-auto max-w-2xl text-center py-16">
          <span className="inline-block rounded-full bg-brand-100 dark:bg-brand-900/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            404
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            {t("programDetail.notFound", "Program Not Found")}
          </h1>
          <p className="mt-4 text-neutral-body dark:text-slate-300">
            {t("programDetail.notFoundBody", "The program you are looking for does not exist or may have been moved.")}
          </p>
          <Link
            to="/programs"
            className="mt-6 inline-block rounded-xl bg-brand-600 dark:bg-brand-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-700 dark:hover:bg-brand-400"
          >
            {t("programDetail.backToPrograms", "Back to all programs")}
          </Link>
        </div>
      </Section>
    );
  }

  const related = defaultPrograms.filter((p) => p.id !== detail.id).slice(0, 3);
  const gallery = detail.gallery && detail.gallery.length > 0 ? detail.gallery : [detail.image];
  const imgChallenge = gallery[0] || detail.image;
  const imgWhyItMatters = detail.whyItMattersImage || (gallery.length > 1 ? gallery[1] : undefined);
  const imgComponents = detail.componentsImage || (gallery.length > 2 ? gallery[2] : undefined);
  const imgHighlight = gallery.length > 3 ? gallery[3] : undefined;
  const imgGains =
    detail.gainsImage ||
    (gallery.length > 4
      ? gallery[4]
      : gallery.length > 3
        ? gallery[3]
        : gallery.length > 1
          ? gallery[1]
          : undefined);
  const imgQuote =
    gallery.length > 5
      ? gallery[5]
      : gallery.length > 3 && !detail.gains
        ? gallery[3]
        : undefined;

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      {/* HERO SECTION */}
      <section className="relative isolate flex min-h-[50vh] items-center overflow-hidden bg-brand-900 dark:bg-slate-950 text-white transition-colors">
        <SmartImage
          src={detail.heroImage || detail.image}
          alt={detail.title}
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_20%] brightness-105 sm:brightness-110 contrast-[1.04] dark:brightness-100 dark:contrast-[1.08]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/85 via-brand-900/50 via-50% to-transparent dark:from-slate-950/90 dark:via-slate-900/65 dark:to-slate-950/25"
        />
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-1.5 text-xs font-bold text-white transition backdrop-blur-sm"
            >
              <span>←</span>
              <span>{t("programDetail.backToPrograms", "Back to Programs")}</span>
            </Link>

            <h1 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl !text-white dark:!text-white font-serif">
              {detail.title}
            </h1>

            {detail.tagline && (
              <p className="mt-4 text-lg text-brand-100 max-w-2xl font-medium">
                {detail.tagline}
              </p>
            )}

            {detail.ctaLink && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {detail.ctaLink.startsWith("http") ? (
                  <a
                    href={detail.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 text-sm shadow-md transition transform hover:-translate-y-0.5"
                  >
                    <span>{detail.ctaText ?? "Support on GlobalGiving"}</span>
                    <span>↗</span>
                  </a>
                ) : (
                  <Link
                    to={detail.ctaLink}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 text-sm shadow-md transition"
                  >
                    <span>{detail.ctaText ?? "Learn More"}</span>
                    <span>→</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT + SIDEBAR */}
      <Section pattern="canvas">
        <div className="mx-auto grid max-w-7xl gap-8 lg:gap-10 lg:grid-cols-[1fr_320px]">
          {/* Main Column */}
          <div className="space-y-12">
            {/* Overview */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {t("programDetail.overviewTitle", "Overview")}
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-neutral-heading dark:text-slate-50 sm:text-3xl">
                About the Initiative
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-neutral-body dark:text-slate-300">
                {detail.body}
              </p>
            </div>

            {/* Problem Statement Callout with Integrated Visual */}
            {detail.problemStatement && (
              <div className="overflow-hidden rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/20 shadow-sm">
                <div className={`grid gap-6 sm:gap-8 ${imgChallenge ? "md:grid-cols-2" : ""} items-center p-6 sm:p-8`}>
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white font-bold">
                        !
                      </div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-amber-950 dark:text-amber-200">
                        The Challenge in Kakuma
                      </h3>
                    </div>
                    <p className="mt-4 text-sm sm:text-base leading-relaxed text-amber-900/90 dark:text-amber-300/90">
                      {detail.problemStatement}
                    </p>
                  </div>
                  {imgChallenge && (
                    <div className="overflow-hidden rounded-xl shadow-md aspect-[16/10] sm:aspect-[4/3] w-full min-h-[220px]">
                      <SmartImage
                        src={imgChallenge}
                        alt={`${detail.title} context in Kakuma`}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Why It Matters with Integrated Visual */}
            {detail.whyItMatters && (
              <div className="overflow-hidden rounded-2xl border border-brand-100 dark:border-slate-800 bg-brand-50/50 dark:bg-slate-800/60 p-6 sm:p-8 shadow-sm">
                <div className={`grid gap-6 sm:gap-8 ${imgWhyItMatters ? "md:grid-cols-2 items-center" : ""}`}>
                  {imgWhyItMatters && (
                    <div className="order-last md:order-first overflow-hidden rounded-xl shadow-sm aspect-[16/10] sm:aspect-[4/3] w-full min-h-[220px]">
                      <SmartImage
                        src={imgWhyItMatters}
                        alt={`${detail.title} impact in Kakuma`}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                      Impact Rationale
                    </span>
                    <h3 className="mt-2 font-display text-xl font-bold text-neutral-heading dark:text-slate-50">
                      Why this initiative matters
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-neutral-body dark:text-slate-300">
                      {detail.whyItMatters}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Project Goals Matrix (if present) */}
            {detail.goals && detail.goals.length > 0 && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  Objectives
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-neutral-heading dark:text-slate-50">
                  Project Goals
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {detail.goals.map((g, idx) => (
                    <div
                      key={g.title}
                      className="rounded-xl border border-neutral-border dark:border-slate-800 bg-white dark:bg-slate-800/80 p-5 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 dark:bg-brand-500 text-xs font-bold text-white">
                        0{idx + 1}
                      </div>
                      <h3 className="mt-3 font-display text-base font-bold text-neutral-heading dark:text-slate-100">
                        {g.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-body dark:text-slate-300">
                        {g.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Components / Modules with Integrated Visual */}
            {detail.components && detail.components.length > 0 && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  Implementation Structure
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-neutral-heading dark:text-slate-50">
                  Core Modules & Components
                </h2>

                {imgComponents && (
                  <div className="mt-6 overflow-hidden rounded-2xl shadow-md aspect-[16/8] sm:aspect-[16/7] md:aspect-[16/6] w-full block min-h-[220px] max-h-[340px]">
                    <SmartImage
                      src={imgComponents}
                      alt={`${detail.title} in action`}
                      className="h-full w-full object-cover object-[center_35%] transition duration-300 hover:scale-105"
                    />
                  </div>
                )}

                <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {detail.components.map((c, idx) => (
                    <div
                      key={c.title}
                      className="group flex flex-col justify-between rounded-xl border border-neutral-border dark:border-slate-800 bg-white dark:bg-slate-800 p-5 shadow-sm transition-all hover:shadow-md hover:border-brand-300 dark:hover:border-brand-500"
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-slate-700 text-sm font-bold text-brand-600 dark:text-brand-300">
                            {idx + 1}
                          </span>
                          <h3 className="font-display text-base font-bold text-neutral-heading dark:text-slate-100 leading-snug">
                            {c.url || c.title.toLowerCase().includes("curated exhibitions & senga gallery") ? (
                              <a
                                href={c.url || "https://www.bbc.com/news/articles/c87yg0rx4npo"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 underline decoration-brand-500/40 hover:decoration-brand-500 transition-colors"
                                title="Read the BBC News article on Senga Gallery"
                              >
                                <span>{c.title}</span>
                                <span className="text-xs" aria-hidden="true">↗</span>
                              </a>
                            ) : (
                              c.title
                            )}
                          </h3>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">
                          {c.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Special Highlight with Integrated Visual */}
            {detail.specialHighlight && (
              <div className="rounded-2xl border border-brand-200 dark:border-brand-900 bg-gradient-to-br from-brand-50/80 via-white to-brand-50/40 dark:from-slate-800 dark:via-slate-850 dark:to-slate-800 p-6 sm:p-8 shadow-sm">
                <div className={`grid gap-6 sm:gap-8 ${imgHighlight ? "md:grid-cols-2 items-center" : ""}`}>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                      Featured Highlight
                    </span>
                    <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-neutral-heading dark:text-slate-50">
                      {detail.specialHighlight.url || detail.specialHighlight.title.toLowerCase().includes("senga gallery") ? (
                        <a
                          href={detail.specialHighlight.url || "https://www.linkedin.com/posts/hubert-sengap_refugeeart-kakumavoices-thesengagallery-ugcPost-7330257466212958208-QMQX/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAClBGikBTHoy6JXtv7jQ2lbqFZPmPaoXmEA"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-brand-700 dark:text-brand-300 hover:text-brand-600 dark:hover:text-brand-200 underline decoration-brand-500/40 hover:decoration-brand-500 transition-colors"
                          title="Explore Senga Gallery on LinkedIn"
                        >
                          <span>{detail.specialHighlight.title}</span>
                          <span className="text-sm font-bold text-brand-600 dark:text-brand-400">↗</span>
                        </a>
                      ) : (
                        detail.specialHighlight.title
                      )}
                    </h3>

                    <p className="mt-4 text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-slate-200">
                      {detail.specialHighlight.description}
                    </p>
                  </div>
                  {imgHighlight && (
                    <div className="overflow-hidden rounded-xl shadow-sm aspect-[16/10] sm:aspect-[4/3] w-full min-h-[220px]">
                      <SmartImage
                        src={imgHighlight}
                        alt={detail.specialHighlight.title}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quote / Lived Experience Callout with Integrated Visual */}
            {detail.quote && (
              <figure className="rounded-2xl border-l-4 border-brand-600 dark:border-brand-400 bg-brand-50/70 dark:bg-slate-800/80 p-6 sm:p-8 shadow-sm">
                <div className={`grid gap-6 sm:gap-8 ${imgQuote ? "md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_340px] items-center" : ""}`}>
                  <div>
                    <blockquote className="text-base sm:text-lg font-medium leading-relaxed italic text-neutral-heading dark:text-slate-100">
                      “{detail.quote.text}”
                    </blockquote>
                    <figcaption className="mt-4 flex items-center gap-3">
                      {detail.quote.image || detail.quote.author.toLowerCase().includes("hubert") ? (
                        <SmartImage
                          src={detail.quote.image || "/img/team/Hubert Senga.jpg"}
                          alt={detail.quote.author}
                          className="h-11 w-11 shrink-0 rounded-full object-cover object-top border-2 border-brand-200 dark:border-brand-700 shadow-sm"
                          fallbackLabel={detail.quote.author.charAt(0)}
                        />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white font-bold text-sm">
                          {detail.quote.author.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-neutral-heading dark:text-slate-100">
                          {detail.quote.author}
                        </div>
                        {detail.quote.role && (
                          <div className="text-xs text-neutral-body dark:text-slate-400">
                            {detail.quote.role}
                          </div>
                        )}
                      </div>
                    </figcaption>
                  </div>
                  {imgQuote && (
                    <div className="overflow-hidden rounded-xl shadow-sm aspect-[16/10] sm:aspect-square w-full min-h-[200px]">
                      <SmartImage
                        src={imgQuote}
                        alt={detail.quote.author}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              </figure>
            )}

            {/* Vision Callout (if present) */}
            {detail.vision && (
              <div className="rounded-2xl bg-brand-900 dark:bg-slate-950 p-6 sm:p-8 text-white">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-300">
                  Our Long-Term Vision
                </span>
                <p className="mt-3 text-lg font-medium leading-relaxed italic text-white/95">
                  "{detail.vision}"
                </p>
              </div>
            )}

            {/* What Participants Gain or Connect with Speaker Section */}
            <div>
              <h2 className="font-display text-2xl font-bold text-neutral-heading dark:text-slate-50">
                {detail.gainsTitle || t("programDetail.whatYoullGain", "Key Skills & Opportunities")}
              </h2>

              {imgGains && (
                <div className="mt-6 overflow-hidden rounded-2xl shadow-md aspect-[16/8] sm:aspect-[16/7] md:aspect-[16/6] w-full block min-h-[220px] max-h-[340px]">
                  <SmartImage
                    src={imgGains}
                    alt={detail.gainsTitle || `${detail.title} community members`}
                    className="h-full w-full object-cover object-[center_35%] transition duration-300 hover:scale-105"
                  />
                </div>
              )}

              {/* Content: Connect Links (if present) OR 3 side by side Gains Cards */}
              <div className="mt-6">
                {detail.connectLinks && detail.connectLinks.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2 w-full">
                    {detail.connectLinks.map((link) => {
                      const isEmail = link.url.startsWith("mailto:") || link.icon === "email";
                      return (
                        <a
                          key={link.label}
                          href={link.url}
                          target={isEmail ? undefined : "_blank"}
                          rel={isEmail ? undefined : "noopener noreferrer"}
                          className="group flex items-center gap-3.5 rounded-xl border border-neutral-border dark:border-slate-800 bg-white dark:bg-slate-800 p-4 text-sm text-neutral-heading dark:text-slate-100 shadow-sm transition-all hover:shadow-md hover:border-brand-500 hover:-translate-y-0.5"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-slate-700/80 transition-colors group-hover:bg-brand-50 dark:group-hover:bg-brand-900/40">
                            {link.icon === "linkedin" || link.label.toLowerCase().includes("linkedin") ? (
                              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#0A66C2]">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.64 1.64 0 0 0-1.66 1.63 1.65 1.65 0 0 0 1.66 1.65 1.65 1.65 0 0 0 1.66-1.65 1.64 1.64 0 0 0-1.66-1.63" />
                              </svg>
                            ) : link.icon === "facebook" || link.label.toLowerCase().includes("facebook") ? (
                              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#1877F2]">
                                <path d="M22 12a10 10 0 1 0-11.6 9.9V14.9H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5V12h2.7l-.4 2.9h-2.3v6.9A10 10 0 0 0 22 12z" />
                              </svg>
                            ) : link.icon === "instagram" || link.label.toLowerCase().includes("instagram") ? (
                              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#E4405F]">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                              </svg>
                            ) : link.icon === "email" || link.label.toLowerCase().includes("gmail") || link.label.toLowerCase().includes("mail") ? (
                              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#EA4335]">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-brand-600 dark:text-brand-400">
                                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                                <path d="M6 6h10" />
                                <path d="M6 10h10" />
                              </svg>
                            )}
                          </div>
                          <div className="flex flex-col flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white truncate">
                                {link.label === "Gmail" ? "Email Me" : link.label}
                              </span>
                              {(link.icon === "email" || link.label.toLowerCase().includes("email") || link.label.toLowerCase().includes("gmail")) && (
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#EA4335] shrink-0" aria-label="Email logo">
                                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                              )}
                              {(link.icon === "article" || link.label.toLowerCase().includes("article")) && (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0" aria-label="Article logo">
                                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                                  <path d="M6 6h10" />
                                  <path d="M6 10h10" />
                                </svg>
                              )}
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-slate-300 group-hover:text-brand-600 dark:group-hover:text-brand-400 truncate mt-0.5 transition-colors">
                              {link.url.replace(/^mailto:/, "")}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-neutral-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                            ↗
                          </span>
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {(detail.gains && detail.gains.length > 0 ? detail.gains : detail.features).map((f) => (
                      <div
                        key={f}
                        className="group flex items-start gap-3 rounded-xl border border-neutral-border dark:border-slate-800 bg-white dark:bg-slate-800 p-4.5 shadow-sm transition-all hover:shadow-md hover:border-brand-300 dark:hover:border-brand-500"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 text-xs font-bold mt-0.5">
                          ✓
                        </div>
                        <span className="text-sm sm:text-base leading-relaxed font-medium text-neutral-heading dark:text-slate-100">
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Media Features & Success Story Videos */}
            {detail.mediaVideos && detail.mediaVideos.length > 0 && (
              <div className="pt-4 border-t border-neutral-border/80 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 dark:bg-red-950/60 px-3 py-1 text-xs font-bold text-red-600 dark:text-red-400">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    {detail.id === "advocacy"
                      ? "International Media Coverage"
                      : "Program Success Story & Spotlight"}
                  </span>
                </div>
                <h2 className="mt-2 font-display text-2xl font-bold text-neutral-heading dark:text-slate-50">
                  {detail.id === "advocacy"
                    ? "Broadcast Features & Video Interviews"
                    : "Success Story & Video Feature"}
                </h2>
                <p className="mt-2 text-sm text-neutral-body dark:text-slate-300">
                  {detail.id === "advocacy"
                    ? "Watch international television and broadcast reporting on refugee resilience, foreign aid budget cuts, and digital self-reliance featuring Hubert Senga and Generation Aid."
                    : "Watch inspirational stories and real-world transformations from refugee learners in Kakuma unlocking new educational and economic pathways."}
                </p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {detail.mediaVideos.map((mv) => (
                    <div
                      key={mv.url}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-border dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm transition hover:shadow-md hover:border-brand-300 dark:hover:border-brand-500"
                    >
                      <div className="relative aspect-video w-full overflow-hidden bg-black">
                        {mv.youtubeId ? (
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${mv.youtubeId}`}
                            title={mv.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="h-full w-full border-0"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-slate-900 text-white">
                            <span>Video Player</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="rounded-md bg-brand-50 dark:bg-slate-700/80 px-2.5 py-1 text-xs font-bold text-brand-700 dark:text-brand-300">
                            {mv.outlet}
                          </span>
                          <a
                            href={mv.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                          >
                            <span>Watch on YouTube</span>
                            <span>↗</span>
                          </a>
                        </div>
                        <h3 className="mt-3 font-display text-base font-bold text-neutral-heading dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">
                          {mv.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-body dark:text-slate-300">
                          {mv.description}
                        </p>
                        <div className="mt-4 pt-3 border-t border-neutral-border/60 dark:border-slate-700/60">
                          <a
                            href={mv.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition"
                          >
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                            <span>Open in YouTube ({mv.outlet})</span>
                            <span>↗</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Target Audience */}
            <div className="rounded-2xl border border-neutral-border dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-600 dark:bg-brand-400" />
                <h3 className="font-display text-base font-bold text-neutral-heading dark:text-slate-100">
                  {t("programDetail.forWhoTitle", "Who It's For")}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">
                {detail.targetAudience ?? t("programDetail.forWhoBody", "Open to refugee youth, women, and community members in Kakuma.")}
              </p>
            </div>

            {/* How to Join / Apply / Engage */}
            <div className="rounded-2xl border border-brand-200 dark:border-brand-900/60 bg-brand-50/50 dark:bg-slate-800 p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                <h3 className="font-display text-base font-bold text-neutral-heading dark:text-slate-100">
                  {t("programDetail.howToJoinTitle", "How to Participate / Engage")}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">
                {detail.howToJoin ?? t("programDetail.howToJoinBody", "Reach out to our team or visit our learning hub in Kakuma to join the next intake.")}
              </p>
              {detail.ctaLink || detail.bookingUrl ? (
                (detail.ctaLink || detail.bookingUrl || "").startsWith("http") ? (
                  <a
                    href={detail.ctaLink || detail.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition"
                  >
                    <span>{detail.ctaText ?? "Support on GlobalGiving"}</span>
                    <span>↗</span>
                  </a>
                ) : (
                  <Link
                    to={detail.ctaLink || detail.bookingUrl || "/contact"}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 dark:bg-brand-500 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-brand-700 dark:hover:bg-brand-400"
                  >
                    <span>{detail.ctaText ?? "Connect With Us"}</span>
                    <span>→</span>
                  </Link>
                )
              ) : (
                <Link
                  to={`/contact?subject=${encodeURIComponent("Inquiry: " + detail.title)}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 dark:bg-brand-500 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-brand-700 dark:hover:bg-brand-400"
                >
                  <span>Express Interest / Inquire</span>
                  <span>→</span>
                </Link>
              )}
            </div>

            {/* Fast Facts Badge */}
            <div className="rounded-2xl border border-neutral-border dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-neutral-body dark:text-slate-400">
                Program Snapshot
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-xs text-neutral-body dark:text-slate-400">Location</dt>
                  <dd className="font-semibold text-neutral-heading dark:text-slate-100">Kakuma Refugee Camp & Kalobeyei, Kenya</dd>
                </div>
                {detail.partner && (
                  <div>
                    <dt className="text-xs text-neutral-body dark:text-slate-400">Partnership</dt>
                    <dd className="font-semibold text-neutral-heading dark:text-slate-100">{detail.partner}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs text-neutral-body dark:text-slate-400">Category</dt>
                  <dd className="font-semibold text-neutral-heading dark:text-slate-100">{detail.category}</dd>
                </div>
                {detail.mediaVideos && detail.mediaVideos.length > 0 && (
                  <div>
                    <dt className="text-xs text-neutral-body dark:text-slate-400">Media Features</dt>
                    <dd className="mt-1 flex flex-wrap gap-1.5 font-semibold text-neutral-heading dark:text-slate-100">
                      {detail.mediaVideos.map((mv) => (
                        <a
                          key={mv.url}
                          href={mv.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded bg-red-50 dark:bg-red-950/60 px-2 py-0.5 text-[11px] font-bold text-red-600 dark:text-red-400 hover:underline"
                        >
                          ▶ {mv.outlet} ↗
                        </a>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>
        </div>
      </Section>

      {/* RELATED INITIATIVES */}
      <Section pattern="soft">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Explore More
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-neutral-heading dark:text-slate-50 sm:text-3xl">
                {t("programDetail.relatedTitle", "Other Generation Aid Programs")}
              </h2>
            </div>
            <Link
              to="/programs"
              className="text-sm font-bold text-brand-600 dark:text-brand-400 hover:underline"
            >
              View all {defaultPrograms.length} programs →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/programs/${p.id}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-border dark:border-slate-800 bg-white dark:bg-slate-800 transition hover:border-brand-400 dark:hover:border-brand-500 hover:shadow-lg"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-brand-50 dark:bg-slate-900">
                  <SmartImage
                    src={p.image}
                    alt={p.title}
                    fallbackLabel={p.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    {p.category}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-neutral-heading dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">
                    {p.body}
                  </p>
                  <div className="mt-auto pt-4 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    Learn more →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA SECTION */}
      <Section pattern="impact">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            Support Our Work
          </span>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl !text-white">
            {t("programDetail.ctaTitle", "Support Refugee Led Transformation")}
          </h2>
          <p className="max-w-xl text-base text-white/90">
            {t(
              "programDetail.ctaSubtitle",
              "Partner with us, sponsor a classroom cohort, or donate to expand access to transformative skills for Kakuma's youth.",
            )}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <a
              href={SITE.donateUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-brand-600 hover:bg-brand-50 transition shadow-md"
            >
              <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21s-7-4.534-9.5-9.07C.94 8.94 2.4 5.5 5.6 5.5c1.74 0 3.41 1 4.4 2.5 1-1.5 2.66-2.5 4.4-2.5 3.2 0 4.66 3.44 3.1 6.43C19 16.466 12 21 12 21z" />
              </svg>
              <span>{t("common.donate", "Donate to This Program")}</span>
            </a>
            <Link
              to="/contact"
              className="rounded-xl border border-white/70 bg-white/10 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/20 transition"
            >
              {t("programDetail.ctaContact", "Partner With Us")}
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

