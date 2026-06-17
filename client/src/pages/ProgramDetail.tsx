import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { SITE } from "@/data/site";
import { useSEO } from "@/utils/useSEO";

/**
 * Static catalogue of programs that can appear at /programs/:id.
 * `index` maps to the matching entry in the `programs.details` i18n array
 * (which already supplies title, body and a features list).
 */
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

interface DetailCard {
  title: string;
  body: string;
  features: string[];
}

export default function ProgramDetail() {
  const { id } = useParams();
  const { t } = useTranslation();

  const program = PROGRAMS.find((p) => p.id === id);
  const details = t("programs.details", { returnObjects: true }) as DetailCard[];
  const detail = program ? details[program.index] : undefined;

  useSEO({
    title: detail?.title ?? t("programDetail.notFound"),
    description: detail?.body?.slice(0, 160),
  });

  // Unknown program id — render a friendly fallback that still surfaces the
  // other programs so the visitor isn't dead-ended.
  if (!program || !detail) {
    return (
      <Section className="bg-bg">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            {t("programDetail.notFound")}
          </h1>
          <p className="mt-4 text-muted">{t("programDetail.notFoundBody")}</p>
          <Link
            to="/programs"
            className="mt-6 inline-block rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600"
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
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[55vh] items-center overflow-hidden">
        <SmartImage
          src={program.image}
          alt={detail.title}
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover dark:opacity-80"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b1729]/85 via-[#0b1729]/65 to-[#0b1729]/40 dark:from-black/90 dark:via-black/75 dark:to-black/55"
        />
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition hover:text-white"
            >
              {t("programDetail.backToPrograms")}
            </Link>
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
              <span
                aria-hidden
                className="inline-block h-1.5 w-6 rounded-full bg-brand-red-500"
              />
              {t("programs.programLabel", { n: program.index + 1 })}
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
              {detail.title}
            </h1>
          </div>
        </div>
      </section>

      {/* OVERVIEW + FEATURES */}
      <Section>
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              {t("programDetail.overviewTitle")}
            </span>
            <p className="mt-4 text-base leading-relaxed text-muted">{detail.body}</p>

            <div className="mt-10">
              <h2 className="font-display text-xl font-semibold text-ink">
                {t("programDetail.whatYoullGain")}
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {detail.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 rounded-xl border border-line bg-bg px-3 py-2 text-sm text-ink"
                  >
                    <svg
                      aria-hidden
                      viewBox="0 0 20 20"
                      fill="none"
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red-600"
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

          {/* Side panel: Who it's for + How to join */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
              <h3 className="font-display text-base font-semibold text-ink">
                {t("programDetail.forWhoTitle")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t("programDetail.forWhoBody")}
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
              <h3 className="font-display text-base font-semibold text-ink">
                {t("programDetail.howToJoinTitle")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t("programDetail.howToJoinBody")}
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700"
              >
                {t("programDetail.ctaContact")} →
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      {/* RELATED PROGRAMS */}
      <Section className="bg-surface">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              {t("programDetail.relatedTitle")}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {t("programDetail.relatedSubtitle")}
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/programs/${p.id}`}
                className="group overflow-hidden rounded-2xl border border-line bg-bg transition hover:border-primary-300 hover:shadow-md"
              >
                <div className="aspect-video w-full overflow-hidden bg-primary-50">
                  <SmartImage
                    src={p.image}
                    alt={p.title}
                    fallbackLabel={p.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted">{p.body}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-primary-600 text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {t("programDetail.ctaTitle")}
          </h2>
          <p className="max-w-xl text-sm text-primary-100">
            {t("programDetail.ctaSubtitle")}
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <a
              href={SITE.donateUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-brand-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-700"
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
              className="rounded-md border border-white/40 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
            >
              {t("programDetail.ctaContact")}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
