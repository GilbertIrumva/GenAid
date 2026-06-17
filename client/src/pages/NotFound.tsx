import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";

export default function NotFound() {
  const { t } = useTranslation();

  /** Quick-jump destinations to help visitors recover from a dead link. */
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
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden">
        <SmartImage
          src="/img/heroes/not-found.jpg"
          alt="Sand dunes at sunset"
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover dark:opacity-80"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0b1729]/90 via-[#0b1729]/70 to-[#0b1729]/40 dark:from-black/95 dark:via-black/80 dark:to-black/55"
        />

        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-300 backdrop-blur">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-primary-300"
              />
              {t("notFound.error404")}
            </span>
            <p
              aria-hidden
              className="mt-6 font-display text-7xl font-bold leading-none text-primary-300 sm:text-8xl lg:text-9xl"
            >
              404
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              {t("notFound.wandered")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              {t("notFound.explainer")}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/"
                className="rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
              >
                {t("notFound.goHome")}
              </Link>
              <Link
                to="/contact"
                className="rounded-md border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                {t("notFound.reportLink")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HELPFUL LINKS */}
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              {t("notFound.tryInstead")}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {t("notFound.popularDestinations")}
            </p>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {helpfulLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-bg p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
                >
                  <span className="font-display text-base font-semibold text-ink group-hover:text-primary-600">
                    {l.label}
                  </span>
                  <span className="mt-2 flex-1 text-sm text-muted">
                    {l.description}
                  </span>
                  <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary-600">
                    {t("notFound.go")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
