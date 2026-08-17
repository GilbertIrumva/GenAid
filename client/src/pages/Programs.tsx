import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";
import { SITE } from "@/data/site";
import { useQuery } from "@tanstack/react-query";
import { getPrograms, mapSanityProgramToDisplayProgram } from "@/lib/sanity";
import { defaultPrograms, type DetailedProgram } from "@/data/programsData";

interface WhyCard {
  title: string;
  body: string;
}

export default function Programs() {
  const { t } = useTranslation();
  useSEO({
    title: "Programs",
    description:
      "Digital Livelihoods, Youth Digital Skills, and Kakuma Art Project — Generation Aid's core initiatives in Kakuma Refugee Camp.",
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
    const raw = t("programs.details", { returnObjects: true });
    if (Array.isArray(raw) && raw.length > 0) return raw as DetailedProgram[];
    return defaultPrograms;
  }, [t]);

  const whyCards = useMemo(() => {
    const raw = t("programs.kap.whyCards", { returnObjects: true });
    if (Array.isArray(raw) && raw.length > 0) return raw as WhyCard[];
    return [];
  }, [t]);

  const transComponents = {
    strong: <strong className="font-bold text-neutral-heading dark:text-slate-100" />,
    span: <span className="text-brand-600 dark:text-brand-400" />,
  };

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      {/* HERO (Pattern C: Solid Primary Blue Impact) */}
      <section className="relative isolate flex min-h-[55vh] items-center overflow-hidden bg-brand-900 dark:bg-slate-950 text-white transition-colors">
        <SmartImage
          src="/img/heroes/programs.jpg"
          alt="Learner in a vocational training session"
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/90 via-brand-900/75 to-brand-900/45 dark:from-slate-950/95 dark:via-slate-900/90 dark:to-slate-950/85"
        />
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
              {t("programs.hero.eyebrow", "Our Core Initiatives")}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl !text-white dark:!text-white">
              {t("programs.hero.title", "Refugee-Led Education & Livelihood Programs")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-brand-100">
              {t("programs.hero.subtitle", "Building practical digital, language, and vocational skills to unlock self-reliance.")}
            </p>
          </div>
        </div>
      </section>

      {/* OVERVIEW CARDS (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayPrograms.map((p) => (
            <article
              key={p.title}
              className="overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
            >
              <div className="aspect-video w-full overflow-hidden bg-brand-50 dark:bg-slate-900">
                <SmartImage
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-body dark:text-slate-300">{p.body}</p>
                {"slug" in p && p.slug ? (
                  <Link
                    to={`/programs/${p.slug}`}
                    className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    View program details →
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* DETAILED SECTIONS */}
      {programDetails.map((p, i) => {
        const imageFirst = i % 2 === 1;
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
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {t("programs.programLabel", { n: i + 1 })}
                </span>
                <h2 className="mt-4 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
                  {p.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-neutral-body dark:text-slate-300">
                  {p.body}
                </p>

                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
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
              </div>
            </div>
          </Section>
        );
      })}

      {/* YOUTH DIGITAL SKILLS HERO (Pattern B: Soft Contrast) */}
      <Section pattern="soft" className="!pb-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            {t("programs.youthDigital.tag")}
          </span>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-neutral-heading dark:text-slate-50 sm:text-5xl">
            {t("programs.youthDigital.title")}
          </h2>
          <p className="mt-6 text-lg text-neutral-body dark:text-slate-300">
            {t("programs.youthDigital.subtitle")}
          </p>
        </div>
      </Section>

      {/* REMOTE WORK / BPO MODEL (Pattern A: Canvas) */}
      <Section pattern="canvas" className="!pt-0">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              {t("programs.bpo.eyebrow")}
            </span>
            <h3 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
              {t("programs.bpo.title")}
            </h3>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-neutral-body dark:text-slate-300">
              <p>
                <Trans i18nKey="programs.bpo.p1" components={transComponents} />
              </p>
              <p>
                <Trans i18nKey="programs.bpo.p2" components={transComponents} />
              </p>
            </div>
          </div>
          <figure className="overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
            <SmartImage
              src="/img/programs/bpo.jpg"
              alt="Refugee youth at the Remote Work Bootcamp"
              className="h-full w-full object-cover"
            />
          </figure>
        </div>
      </Section>

      {/* CODING & WEB DEV ACADEMY (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[2fr_3fr]">
          <figure className="overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
            <SmartImage
              src="/img/programs/coding-academy.jpg"
              alt="Coding & Web Development Academy"
              className="h-full w-full object-cover"
            />
          </figure>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              {t("programs.coding.eyebrow")}
            </span>
            <h3 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
              {t("programs.coding.title")}
            </h3>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-neutral-body dark:text-slate-300">
              <p>
                <Trans
                  i18nKey="programs.coding.p1"
                  components={transComponents}
                />
              </p>
              <p>
                <Trans
                  i18nKey="programs.coding.p2"
                  components={transComponents}
                />
              </p>
              <p>
                <Trans
                  i18nKey="programs.coding.p3"
                  components={transComponents}
                />
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CREATIVITY HERO (Pattern A: Canvas) */}
      <Section pattern="canvas" className="!pb-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            {t("programs.creativity.tag")}
          </span>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-neutral-heading dark:text-slate-50 sm:text-5xl">
            {t("programs.creativity.title")}
          </h2>
          <p className="mt-6 text-lg text-neutral-body dark:text-slate-300">
            {t("programs.creativity.subtitle")}
          </p>
        </div>
      </Section>

      {/* HOW IT BEGAN (Pattern A: Canvas continued) */}
      <Section pattern="canvas" className="!pt-0">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            {t("programs.kap.howEyebrow")}
          </span>
          <h3 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            {t("programs.kap.howTitle")}
          </h3>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-neutral-body dark:text-slate-300">
            <p>
              <Trans
                i18nKey="programs.kap.howP1"
                components={transComponents}
              />
            </p>
            <p>{t("programs.kap.howP2")}</p>
            <p>
              <Trans
                i18nKey="programs.kap.howP3"
                components={transComponents}
              />
            </p>
          </div>

          <blockquote className="mt-8 rounded-xl border-l-4 border-brand-600 dark:border-brand-400 bg-brand-50 dark:bg-slate-800 p-6 italic text-neutral-heading dark:text-slate-100 shadow-sm">
            &ldquo;{t("programs.kap.quote")}&rdquo;
            <footer className="mt-3 text-sm font-semibold not-italic text-neutral-body dark:text-slate-300">
              <Trans
                i18nKey="programs.kap.quoteAttr"
                components={transComponents}
              />
            </footer>
          </blockquote>

          <figure className="mt-10 overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
            <SmartImage
              src="/img/programs/kap-hero.png"
              alt="Kakuma Art Project — early workshops"
              className="h-full w-full object-cover"
            />
          </figure>
        </div>
      </Section>

      {/* BEAUTY OF THE PROGRAMS (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              {t("programs.kap.beautyEyebrow")}
            </span>
            <h3 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
              {t("programs.kap.beautyTitle")}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-neutral-body dark:text-slate-300">
              <Trans
                i18nKey="programs.kap.beautyBody"
                components={transComponents}
              />
            </p>
          </div>
          <figure className="overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 shadow-sm">
            <SmartImage
              src="/img/programs/kap-1.png"
              alt="Artists at work in a Kakuma Art Project workshop"
              className="h-full w-full object-cover"
            />
          </figure>
        </div>
      </Section>

      {/* PAINTING HOME FROM AFAR (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[2fr_3fr]">
          <figure className="overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
            <SmartImage
              src="/img/programs/kap-2.png"
              alt="Mwangi, artist at Kakuma Refugee Camp"
              className="h-full w-full object-cover"
            />
          </figure>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              {t("programs.kap.paintingEyebrow")}
            </span>
            <h3 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
              <Trans
                i18nKey="programs.kap.paintingTitle"
                components={transComponents}
              />
            </h3>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-neutral-body dark:text-slate-300">
              <p>{t("programs.kap.paintingP1")}</p>
              <p>{t("programs.kap.paintingP2")}</p>
              <p>{t("programs.kap.paintingP3")}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ACTIVITIES (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            {t("programs.kap.activitiesEyebrow")}
          </span>
          <h3 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            {t("programs.kap.activitiesTitle")}
          </h3>

          <figure className="mt-8 overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
            <SmartImage
              src="/img/programs/kap-3.png"
              alt="Refugee artisan cooperative at work"
              className="h-full w-full object-cover"
            />
          </figure>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-neutral-body dark:text-slate-300">
            <p>
              <Trans
                i18nKey="programs.kap.activitiesP1"
                components={transComponents}
              />
            </p>
          </div>

          <figure className="mt-8 overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
            <SmartImage
              src="/img/programs/artists-painting.jpg"
              alt="Handicraft training session"
              className="h-full w-full object-cover"
            />
          </figure>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-neutral-body dark:text-slate-300">
            <p>{t("programs.kap.activitiesP2")}</p>
          </div>
        </div>
      </Section>

      {/* CELEBRATING OUR TALENTS (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              {t("programs.kap.celebratingEyebrow")}
            </span>
            <h3 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
              {t("programs.kap.celebratingTitle")}
            </h3>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-neutral-body dark:text-slate-300">
              <p>
                <Trans
                  i18nKey="programs.kap.celebratingP1"
                  components={transComponents}
                />
              </p>
              <p>
                <Trans
                  i18nKey="programs.kap.celebratingP2"
                  components={transComponents}
                />
              </p>
            </div>
          </div>
          <figure className="overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
            <SmartImage
              src="/img/programs/art-portrait.jpg"
              alt="Celebrating refugee artisan talents"
              className="h-full w-full object-cover"
            />
          </figure>
        </div>
      </Section>

      {/* GALLERY HERO (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            {t("programs.kap.galleryEyebrow")}
          </span>
          <h3 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            {t("programs.kap.galleryTitle")}
          </h3>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-neutral-body dark:text-slate-300">
            <p>{t("programs.kap.galleryP1")}</p>
            <p>
              <Trans
                i18nKey="programs.kap.galleryP2"
                components={transComponents}
              />
            </p>
          </div>

          <figure className="mt-10 overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
            <SmartImage
              src="/img/programs/art-landscape.jpg"
              alt="Workshop promoting beauty and pride for refugees"
              className="h-full w-full object-cover"
            />
            <figcaption className="px-6 py-3 text-sm text-neutral-body dark:text-slate-400">
              {t("programs.kap.galleryCaption1")}
            </figcaption>
          </figure>

          <figure className="mt-6 overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
            <SmartImage
              src="/img/programs/artisan-1.jpg"
              alt="Community art workshop"
              className="h-full w-full object-cover"
            />
            <figcaption className="px-6 py-3 text-sm text-neutral-body dark:text-slate-400">
              {t("programs.kap.galleryCaption2")}
            </figcaption>
          </figure>

          <p className="mt-8 text-base leading-relaxed text-neutral-body dark:text-slate-300">
            {t("programs.kap.galleryP3")}
          </p>

          <figure className="mt-10 overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
            <SmartImage
              src="/img/programs/artisan-2.jpg"
              alt="The Senga Gallery — the first art gallery in Kakuma refugee camp"
              className="h-full w-full object-cover"
            />
            <figcaption className="px-6 py-3 text-sm text-neutral-body dark:text-slate-400">
              <Trans
                i18nKey="programs.kap.galleryCaption3"
                components={transComponents}
              />
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* WHY THIS GALLERY MATTERS (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            {t("programs.kap.whyTitle")}
          </h3>
          <p className="mt-3 text-neutral-body dark:text-slate-300">{t("programs.kap.whySubtitle")}</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
          {whyCards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border-l-4 border-brand-600 dark:border-brand-400 bg-white dark:bg-slate-800 p-6 shadow-sm border border-neutral-border dark:border-slate-700"
            >
              <h4 className="font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                {card.title}
              </h4>
              <p className="mt-3 text-sm text-neutral-body dark:text-slate-300">{card.body}</p>
            </div>
          ))}
        </div>

        <figure className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
          <SmartImage
            src="/img/programs/senga-gallery.jpg"
            alt="The Senga Gallery interior"
            className="h-full w-full object-cover"
          />
        </figure>
      </Section>

      {/* CTA (Pattern C: Neutral Dark Impact Surface) */}
      <Section pattern="impact">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl text-white">
            {t("programs.cta.title")}
          </h2>
          <p className="mt-3 text-slate-300">{t("programs.cta.subtitle")}</p>
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
              {t("common.donate")}
            </a>
            <Link
              to="/contact"
              className="rounded-lg border border-white/70 dark:border-slate-700 bg-white/10 dark:bg-slate-800 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 dark:hover:bg-slate-700 transition"
            >
              {t("common.getInTouch")}
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
