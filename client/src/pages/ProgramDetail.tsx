import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { SITE } from "@/data/site";
import { useSEO } from "@/utils/useSEO";
import { defaultPrograms, type DetailedProgram } from "@/data/programsData";

export default function ProgramDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const programIndex = defaultPrograms.findIndex(
    (p) => p.id === id || p.slug === id,
  );
  const detail: DetailedProgram | undefined =
    programIndex !== -1 ? defaultPrograms[programIndex] : undefined;

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

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      {/* HERO SECTION */}
      <section className="relative isolate flex min-h-[50vh] items-center overflow-hidden bg-brand-900 dark:bg-slate-950 text-white transition-colors">
        <SmartImage
          src={detail.image}
          alt={detail.title}
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/95 via-brand-900/85 to-brand-900/60 dark:from-slate-950/95 dark:via-slate-900/90 dark:to-slate-950/85"
        />
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-200 hover:text-white transition"
            >
              <span>←</span>
              <span>{t("programDetail.backToPrograms", "All Initiatives")}</span>
            </Link>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-600/60 dark:bg-brand-500/40 backdrop-blur border border-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {detail.category}
              </span>
              {detail.speaker && (
                <span className="rounded-full bg-brand-400/20 backdrop-blur border border-brand-300/30 px-3 py-1 text-xs font-semibold text-brand-100">
                  🎙️ {detail.speaker}
                </span>
              )}
              {detail.partner && (
                <span className="rounded-full bg-white/15 backdrop-blur border border-white/10 px-3 py-1 text-xs font-medium text-brand-100">
                  {detail.partner}
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl !text-white dark:!text-white">
              {detail.title}
            </h1>

            {detail.tagline && (
              <p className="mt-4 text-lg text-brand-100 max-w-2xl font-medium">
                {detail.tagline}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT + SIDEBAR */}
      <Section pattern="canvas">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_360px]">
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

            {/* Problem Statement Callout (if present) */}
            {detail.problemStatement && (
              <div className="rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/20 p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white font-bold">
                    !
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-amber-950 dark:text-amber-200">
                      The Challenge in Kakuma
                    </h3>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-amber-900/90 dark:text-amber-300/90">
                      {detail.problemStatement}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Why It Matters (if present) */}
            {detail.whyItMatters && (
              <div className="rounded-2xl border border-brand-100 dark:border-slate-800 bg-brand-50/50 dark:bg-slate-800/60 p-6 sm:p-8">
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
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
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

            {/* Project Components / Modules (if present) */}
            {detail.components && detail.components.length > 0 && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  Implementation Structure
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-neutral-heading dark:text-slate-50">
                  Core Modules & Components
                </h2>
                <div className="mt-6 space-y-4">
                  {detail.components.map((c, idx) => (
                    <div
                      key={c.title}
                      className="flex flex-col sm:flex-row items-start gap-4 rounded-xl border border-neutral-border dark:border-slate-800 bg-white dark:bg-slate-800 p-5 shadow-sm"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-slate-700 text-sm font-bold text-brand-600 dark:text-brand-300">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-display text-base font-bold text-neutral-heading dark:text-slate-100">
                          {c.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-neutral-body dark:text-slate-300">
                          {c.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Special Highlight (e.g. Senga Gallery) */}
            {detail.specialHighlight && (
              <div className="rounded-2xl border border-brand-200 dark:border-brand-900 bg-gradient-to-br from-brand-50 via-white to-brand-50/30 dark:from-slate-800 dark:via-slate-850 dark:to-slate-800 p-6 sm:p-8">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  Featured Space
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-neutral-heading dark:text-slate-50">
                  {detail.specialHighlight.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-body dark:text-slate-300">
                  {detail.specialHighlight.description}
                </p>
              </div>
            )}

            {/* Quote / Lived Experience Callout (if present) */}
            {detail.quote && (
              <figure className="rounded-2xl border-l-4 border-brand-600 dark:border-brand-400 bg-brand-50/70 dark:bg-slate-800/80 p-6 sm:p-8 shadow-sm">
                <blockquote className="text-base sm:text-lg font-medium leading-relaxed italic text-neutral-heading dark:text-slate-100">
                  “{detail.quote.text}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white font-bold text-sm">
                    {detail.quote.author.charAt(0)}
                  </div>
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

            {/* What Participants Gain */}
            <div>
              <h2 className="font-display text-2xl font-bold text-neutral-heading dark:text-slate-50">
                {t("programDetail.whatYoullGain", "Key Skills & Opportunities")}
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {(detail.gains && detail.gains.length > 0 ? detail.gains : detail.features).map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-3 rounded-xl border border-neutral-border dark:border-slate-800 bg-white dark:bg-slate-800 p-4 text-sm text-neutral-heading dark:text-slate-100 shadow-sm"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400">
                      ✓
                    </div>
                    <span className="font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>
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
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <h3 className="font-display text-base font-bold text-neutral-heading dark:text-slate-100">
                  {t("programDetail.howToJoinTitle", "How to Participate / Engage")}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">
                {detail.howToJoin ?? t("programDetail.howToJoinBody", "Reach out to our team or visit our learning hub in Kakuma to join the next intake.")}
              </p>
              {detail.ctaLink || detail.bookingUrl ? (
                <Link
                  to={detail.ctaLink || detail.bookingUrl || "/contact"}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 dark:bg-brand-500 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-brand-700 dark:hover:bg-brand-400"
                >
                  <span>{detail.ctaText ?? "Connect With Us"}</span>
                  <span>→</span>
                </Link>
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
              View all 6 programs →
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
            {t("programDetail.ctaTitle", "Support Refugee-Led Transformation")}
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

