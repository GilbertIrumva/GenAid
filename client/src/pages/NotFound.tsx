import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SmartImage from "@/components/SmartImage";
import Section from "@/components/Section";
import { useSEO } from "@/utils/useSEO";

export default function NotFound() {
  const { t } = useTranslation();

  const helpfulLinks: { to: string; label: string; description: string }[] = [
    {
      to: "/programs",
      label: t("notFound.linkPrograms"),
      description: t("notFound.linkProgramsDesc"),
    },
    {
      to: "/stories",
      label: t("notFound.linkStories"),
      description: t("notFound.linkStoriesDesc"),
    },
    {
      to: "/impact",
      label: t("notFound.linkImpact"),
      description: t("notFound.linkImpactDesc"),
    },
    {
      to: "/contact",
      label: t("notFound.linkContact"),
      description: t("notFound.linkContactDesc"),
    },
  ];

  useSEO({
    title: "Page not found",
    description: "The page you are looking for does not exist.",
  });

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      {/* HERO (Pattern C: Solid Primary Blue Impact) */}
      <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-slate-900 dark:bg-slate-950 text-white transition-colors">
        <SmartImage
          src="/img/heroes/not-found.jpg"
          alt="Sand dunes at sunset"
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950/85 via-slate-900/70 to-slate-900/40 dark:from-slate-950/95 dark:via-slate-900/90 dark:to-slate-950/85"
        />

        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-white"
              />
              {t("notFound.error404")}
            </span>
            <p
              aria-hidden
              className="mt-6 font-display text-7xl font-bold leading-none text-brand-100 sm:text-8xl lg:text-9xl"
            >
              404
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl text-white">
              {t("notFound.wandered")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-brand-100">
              {t("notFound.explainer")}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/"
                className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-600 shadow-sm transition hover:bg-brand-50"
              >
                {t("notFound.goHome")}
              </Link>
              <Link
                to="/contact"
                className="rounded-lg border border-white/70 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition"
              >
                {t("notFound.reportLink")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HELPFUL LINKS (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-neutral-heading dark:text-slate-50 sm:text-3xl">
            {t("notFound.tryInstead")}
          </h2>
          <p className="mt-2 text-sm text-neutral-body dark:text-slate-300">
            {t("notFound.popularDestinations")}
          </p>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {helpfulLinks.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="group flex h-full flex-col rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
              >
                <span className="font-display text-base font-semibold text-neutral-heading dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                  {l.label}
                </span>
                <span className="mt-2 flex-1 text-sm text-neutral-body dark:text-slate-300">
                  {l.description}
                </span>
                <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {t("notFound.go")} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
