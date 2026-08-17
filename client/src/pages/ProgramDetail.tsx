import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { SITE } from "@/data/site";
import { useSEO } from "@/utils/useSEO";
import { defaultPrograms, type DetailedProgram } from "@/data/programsData";

const PROGRAMS = [
  {
    id: "computer-literacy",
    index: 0,
    image: "/img/programs/computer-literacy.jpg",
  },
  {
    id: "tailoring",
    index: 1,
    image: "/img/programs/tailoring.jpg",
  },
  {
    id: "english",
    index: 2,
    image: "/img/programs/english.png",
  },
] as const;

export default function ProgramDetail() {
  const { id } = useParams();
  const { t } = useTranslation();

  const rawDetails = t("programs.details", { returnObjects: true });
  const details = (Array.isArray(rawDetails) && rawDetails.length > 0
    ? rawDetails
    : defaultPrograms) as DetailedProgram[];

  const program = PROGRAMS.find((p) => p.id === id);
  const detail = program ? details[program.index] || defaultPrograms[program.index] : undefined;

  useSEO({
    title: detail?.title ?? t("programDetail.notFound"),
    description: detail?.body?.slice(0, 160),
  });

  if (!program || !detail) {
    return (
      <Section pattern="canvas">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            {t("programDetail.notFound")}
          </h1>
          <p className="mt-4 text-neutral-body dark:text-slate-300">{t("programDetail.notFoundBody")}</p>
          <Link
            to="/programs"
            className="mt-6 inline-block rounded-lg bg-brand-600 dark:bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 dark:hover:bg-brand-400"
          >
            {t("programDetail.backToPrograms")}
          </Link>
        </div>
      </Section>
    );
  }

  const related = PROGRAMS.filter((p) => p.id !== program.id).map((p) => ({
    ...p,
    ...details[p.index],
  }));

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      {/* HERO (Pattern C: Solid Primary Blue Impact) */}
      <section className="relative isolate flex min-h-[50vh] items-center overflow-hidden bg-brand-900 dark:bg-slate-950 text-white transition-colors">
        <SmartImage
          src={program.image}
          alt={detail.title}
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/90 via-brand-900/75 to-brand-900/45 dark:from-slate-950/95 dark:via-slate-900/90 dark:to-slate-950/85"
        />
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-100 transition hover:text-white"
            >
              {t("programDetail.backToPrograms")}
            </Link>
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
              <span
                aria-hidden
                className="inline-block h-1.5 w-6 rounded-full bg-white"
              />
              {t("programs.programLabel", { n: program.index + 1 })}
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl !text-white dark:!text-white">
              {detail.title}
            </h1>
          </div>
        </div>
      </section>

      {/* OVERVIEW + FEATURES (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              {t("programDetail.overviewTitle")}
            </span>
            <p className="mt-4 text-base leading-relaxed text-neutral-body dark:text-slate-300">{detail.body}</p>

            <div className="mt-10">
              <h2 className="font-display text-xl font-semibold text-neutral-heading dark:text-slate-100">
                {t("programDetail.whatYoullGain")}
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {detail.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-sm text-neutral-heading dark:text-slate-100 shadow-sm"
                  >
                    <svg
                      aria-hidden
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

          <aside className="space-y-5">
            <div className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h3 className="font-display text-base font-semibold text-neutral-heading dark:text-slate-100">
                {t("programDetail.forWhoTitle")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-body dark:text-slate-300">
                {t("programDetail.forWhoBody")}
              </p>
            </div>
            <div className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h3 className="font-display text-base font-semibold text-neutral-heading dark:text-slate-100">
                {t("programDetail.howToJoinTitle")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-body dark:text-slate-300">
                {t("programDetail.howToJoinBody")}
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline underline-offset-4"
              >
                {t("programDetail.ctaContact")} →
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      {/* RELATED PROGRAMS (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-neutral-heading dark:text-slate-50 sm:text-3xl">
              {t("programDetail.relatedTitle")}
            </h2>
            <p className="mt-2 text-sm text-neutral-body dark:text-slate-300">
              {t("programDetail.relatedSubtitle")}
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/programs/${p.id}`}
                className="group overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
              >
                <div className="aspect-video w-full overflow-hidden bg-brand-50 dark:bg-slate-900">
                  <SmartImage
                    src={p.image}
                    alt={p.title}
                    fallbackLabel={p.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-neutral-body dark:text-slate-300">{p.body}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA (Pattern C: Neutral Dark Impact Surface) */}
      <Section pattern="impact">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
          <h2 className="font-display text-2xl font-bold sm:text-3xl text-white">
            {t("programDetail.ctaTitle")}
          </h2>
          <p className="max-w-xl text-sm text-slate-300">
            {t("programDetail.ctaSubtitle")}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a
              href={SITE.donateUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white dark:bg-brand-500 px-5 py-2.5 text-sm font-semibold text-brand-600 dark:text-white hover:bg-brand-50 dark:hover:bg-brand-400 transition shadow-sm"
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
              className="rounded-lg border border-white/70 dark:border-slate-700 bg-white/10 dark:bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 dark:hover:bg-slate-700 transition"
            >
              {t("programDetail.ctaContact")}
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
