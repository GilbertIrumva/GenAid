import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";
import { SITE } from "@/data/site";
import { useQuery } from "@tanstack/react-query";
import { getPrograms, mapSanityProgramToDisplayProgram } from "@/lib/sanity";
import { defaultPrograms, type DetailedProgram } from "@/data/programsData";

export default function Programs() {
  const { t } = useTranslation();
  useSEO({
    title: "Programs",
    description:
      "Explore Generation Aid's core refugee led programs in Kakuma: Learning Through Play, Women in AI, Storytelling, Creative Arts, Climate Action, Social and Emotional Learning, Global Advocacy, English Literacy, and Computer Literacy.",
  });

  const { data: sanityPrograms = [] } = useQuery({
    queryKey: ["public", "sanity", "programs"],
    queryFn: getPrograms,
    retry: false,
  });

  const cmsPrograms = useMemo(
    () => sanityPrograms.map((item) => mapSanityProgramToDisplayProgram(item)),
    [sanityPrograms],
  );

  const displayPrograms = useMemo(() => {
    if (cmsPrograms && cmsPrograms.length > 0) return cmsPrograms;
    return defaultPrograms;
  }, [cmsPrograms]);

  const programDetails = useMemo(() => {
    return displayPrograms as DetailedProgram[];
  }, [displayPrograms]);

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      {/* HERO (Pattern C: Solid Primary Blue Impact) */}
      <section className="relative isolate flex min-h-[55vh] items-center overflow-hidden bg-brand-900 dark:bg-slate-950 text-white transition-colors">
        <SmartImage
          src="/all-programs.jpg"
          alt="Generation Aid center in Kakuma"
          fallbackLabel=""
          priority={true}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/80 via-brand-900/60 to-brand-900/35 dark:from-slate-950/85 dark:via-slate-900/70 dark:to-slate-950/50"
        />
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
              {t("programs.hero.eyebrow", "Our Core Initiatives")}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl !text-white dark:!text-white">
              {t("programs.hero.title", "Refugee Led Education & Livelihood Programs")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white">
              {t("programs.hero.subtitle", "Building practical digital, language, and vocational skills to unlock self reliance.")}
            </p>
          </div>
        </div>
      </section>

      {/* OVERVIEW CARDS (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayPrograms.map((p) => {
            const targetId = ("slug" in p && p.slug) || ("id" in p && p.id) || "";
            return (
              <article
                key={p.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
              >
                <div className="aspect-video w-full overflow-hidden bg-brand-50 dark:bg-slate-900">
                  <SmartImage
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {"category" in p && p.category && (
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                      {p.category}
                    </span>
                  )}
                  <h3 className="mt-1 font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-neutral-body dark:text-slate-300">{p.body}</p>
                  {targetId ? (
                    <div className="mt-auto pt-4">
                      <Link
                        to={`/programs/${targetId}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 hover:underline"
                      >
                        <span>View program details</span>
                        <span>→</span>
                      </Link>
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* DETAILED SECTIONS */}
      {programDetails.map((p, i) => {
        const imageFirst = i % 2 === 1;
        const targetId = p.slug || p.id;
        return (
          <Section
            key={p.id}
            id={p.id}
            pattern={i % 2 === 0 ? "soft" : "canvas"}
          >
            <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
              <figure
                className={`overflow-hidden rounded-2xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm ${imageFirst ? "lg:order-1" : "lg:order-2"}`}
              >
                <SmartImage
                  src={p.image}
                  alt={p.title}
                  fallbackLabel={p.title}
                  className="aspect-[4/3] w-full object-cover"
                />
              </figure>
              <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    {t("programs.programLabel", { n: i + 1 })}
                  </span>
                  {p.category && (
                    <span className="rounded-full bg-brand-50 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-slate-700">
                      {p.category}
                    </span>
                  )}
                </div>
                <h2 className="mt-3 text-2xl font-bold text-neutral-heading dark:text-slate-50 sm:text-3xl">
                  {p.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-body dark:text-slate-300">
                  {p.body}
                </p>

                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-neutral-heading dark:text-slate-100"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600 dark:text-brand-400"
                      >
                        <path
                          d="M4 10.5l3.5 3.5L16 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {targetId && (
                  <div className="mt-6">
                    <Link
                      to={`/programs/${targetId}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-brand-600 dark:bg-brand-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-brand-700 dark:hover:bg-brand-400"
                    >
                      <span>Explore Full Curriculum & Details</span>
                      <span>→</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </Section>
        );
      })}

      {/* CTA (Pattern C: Neutral Dark Impact Surface) */}
      <Section pattern="impact">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl !text-white">
            {t("programs.cta.title", "Help us reach more refugee youth & children.")}
          </h2>
          <p className="mt-3 text-white">
            {t(
              "programs.cta.subtitle",
              "Sponsor a program cohort, donate equipment, or partner with us to expand refugee led opportunities.",
            )}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={SITE.donateUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white dark:bg-brand-500 px-5 py-3 text-sm font-semibold text-brand-600 dark:text-white hover:bg-brand-50 dark:hover:bg-brand-400 transition shadow-sm"
            >
              <svg
                aria-hidden
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21s-7-4.534-9.5-9.07C.94 8.94 2.4 5.5 5.6 5.5c1.74 0 3.41 1 4.4 2.5 1-1.5 2.66-2.5 4.4-2.5 3.2 0 4.66 3.44 3.1 6.43C19 16.466 12 21 12 21z" />
              </svg>
              {t("common.donate", "Donate Now")}
            </a>
            <Link
              to="/contact"
              className="rounded-lg border border-white/70 dark:border-slate-700 bg-white/10 dark:bg-slate-800 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 dark:hover:bg-slate-700 transition"
            >
              {t("common.contactUs", "Get in Touch")}
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
