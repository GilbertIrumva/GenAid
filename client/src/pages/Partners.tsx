import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";
import { SITE } from "@/data/site";
import {
  partners,
  partnershipBenefits,
  type Partner,
} from "@/data/partners";
import { getPartners, mapSanityPartnerToDisplayPartner } from "@/lib/sanity";



interface TierAccent {
  badgeBg: string;
  badgeText: string;
  border: string;
  bullet: string;
}

interface TierMeta {
  key: string;
  icon: string;
  accent: TierAccent;
  ctaSubject: string;
  featured?: boolean;
}

const tierMeta: TierMeta[] = [
  {
    key: "programme",
    icon: "\u25c7",
    accent: {
      badgeBg: "bg-brand-50 dark:bg-slate-800",
      badgeText: "text-brand-600 dark:text-brand-400",
      border: "border-neutral-border dark:border-slate-700",
      bullet: "text-brand-600 dark:text-brand-400",
    },
    ctaSubject: "Programme%20partnership%20enquiry",
  },
  {
    key: "hub",
    icon: "\u25c8",
    accent: {
      badgeBg: "bg-brand-600 dark:bg-brand-500",
      badgeText: "text-white",
      border: "border-brand-600 dark:border-brand-500",
      bullet: "text-brand-600 dark:text-brand-400",
    },
    ctaSubject: "Hub%20sponsorship%20enquiry",
    featured: true,
  },
  {
    key: "talent",
    icon: "\u25b3",
    accent: {
      badgeBg: "bg-brand-50 dark:bg-slate-800",
      badgeText: "text-brand-600 dark:text-brand-400",
      border: "border-neutral-border dark:border-slate-700",
      bullet: "text-brand-600 dark:text-brand-400",
    },
    ctaSubject: "Talent%20partnership%20enquiry",
  },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function PartnerCard({ partner }: { partner: Partner; key?: React.Key }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogo = Boolean(partner.logo) && !logoFailed;

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-white/80 transition hover:shadow-md">
      <div className="grid h-16 w-16 flex-shrink-0 place-items-center overflow-hidden rounded-xl bg-slate-50 p-2 ring-1 ring-neutral-200/70 shadow-xs">
        {showLogo ? (
          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
            loading="lazy"
            className="h-full w-full object-contain"
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <span className="bg-brand-50 text-brand-600 font-display text-base font-bold grid h-full w-full place-items-center">
            {initials(partner.name)}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display text-base font-bold text-neutral-heading leading-snug">
          {partner.name}
        </p>
      </div>
    </div>
  );
}

export default function Partners() {
  const { t } = useTranslation();
  const { data: sanityPartners = [] } = useQuery({
    queryKey: ["public", "sanity", "partners"],
    queryFn: getPartners,
    retry: false,
  });

  useSEO({
    title: "Partners",
    description:
      "NGOs, corporates and individuals partnering with Generation Aid to scale refugee-led impact in Kakuma.",
  });

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      {/* HERO (Pattern C: Solid Primary Blue Impact) */}
      <section className="relative isolate flex min-h-[55vh] items-center overflow-hidden bg-brand-900 dark:bg-slate-950 text-white transition-colors">
        <SmartImage
          src="/img/heroes/partners.jpg"
          alt="Partnership meeting in progress"
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
              {t("partners.hero.eyebrow")}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl !text-white dark:!text-white">
              {t("partners.hero.titleStart")}{" "}
              <span className="text-white">
                {t("partners.hero.titleHighlight")}
              </span>{" "}
              {t("partners.hero.titleEnd")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white">
              {t("partners.hero.subtitleAlt")}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#become-a-partner"
                className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-600 shadow-sm transition hover:bg-brand-50"
              >
                {t("partners.becomeAPartner")}
              </a>
              <a
                href={`mailto:${SITE.email}?subject=Partnership%20enquiry`}
                className="rounded-lg border border-white/70 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition"
              >
                {t("partners.emailPartnerships")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY PARTNER (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            {t("partners.whyPartner")}
          </h2>
          <p className="mt-3 text-neutral-body dark:text-slate-300">{t("partners.whyPartnerSubtitle")}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {partnershipBenefits.map((b) => (
            <div
              key={b.key}
              className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm"
            >
              <h3 className="font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                {t(`partners.benefits.${b.key}.title`, b.title)}
              </h3>
              <p className="mt-3 text-sm text-neutral-body dark:text-slate-300">
                {t(`partners.benefits.${b.key}.body`, b.body)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CURRENT PARTNERS (Brand Blue Palette) */}
      <section className="bg-brand-600 dark:bg-brand-700 py-16 sm:py-20 text-white transition-colors border-t border-brand-500/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-bold !text-white sm:text-4xl">
              {t("partners.currentPartners")}
            </h2>
            <p className="mt-2 text-white/90">
              {t("partners.currentPartnersSubtitle")}
            </p>
          </div>

          {(() => {
            const rawPartners =
              sanityPartners.length > 0
                ? sanityPartners.map(mapSanityPartnerToDisplayPartner)
                : partners;
            const displayedPartners = rawPartners.filter(
              (p) => !p.name.toLowerCase().includes("tawingo") && p.key !== "tawingo"
            );
            return (
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayedPartners.map((p) => (
                  <PartnerCard key={p.key || p.name} partner={p as Partner} />
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* TIERS (Pattern A: Canvas) */}
      <Section id="become-a-partner" pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            {t("partners.getInvolved")}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            {t("partners.threeWays")}
          </h2>
          <p className="mt-3 text-neutral-body dark:text-slate-300">{t("partners.threeWaysSubtitle")}</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3 md:items-stretch">
          {tierMeta.map((meta) => {
            const name = t(`partners.tiers.${meta.key}.name`);
            const tagline = t(`partners.tiers.${meta.key}.tagline`);
            const body = t(`partners.tiers.${meta.key}.body`);
            const from = t(`partners.tiers.${meta.key}.from`);
            const ctaLabel = t(`partners.tiers.${meta.key}.ctaLabel`);
            const features = t(`partners.tiers.${meta.key}.features`, {
              returnObjects: true,
            }) as string[];

            return (
              <div
                key={meta.key}
                className={`relative flex flex-col rounded-xl border bg-white dark:bg-slate-800 p-6 shadow-sm transition hover:shadow-md ${meta.accent.border} ${meta.featured
                  ? "ring-2 ring-brand-600 dark:ring-brand-500 md:-mt-4 md:mb-0 md:scale-[1.03] md:p-7 md:shadow-lg"
                  : ""
                  }`}
              >
                {meta.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 dark:bg-brand-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow">
                    {t("partners.mostPopular")}
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={`grid h-11 w-11 place-items-center rounded-xl text-xl ${meta.accent.badgeBg} ${meta.accent.badgeText}`}
                  >
                    {meta.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                      {name}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-body dark:text-slate-400">
                      {tagline}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-neutral-body dark:text-slate-300">
                  {body}
                </p>

                <ul className="mt-5 space-y-2 text-sm text-neutral-heading dark:text-slate-200">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className={`mt-0.5 flex-shrink-0 ${meta.accent.bullet}`}
                      >
                        <polyline points="4 12 10 18 20 6" />
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex-1" />
                <div className="border-t border-neutral-border dark:border-slate-700 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    {from}
                  </p>
                  <a
                    href={`mailto:${SITE.email}?subject=${meta.ctaSubject}`}
                    className={`mt-3 inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition ${meta.featured
                      ? "bg-brand-600 dark:bg-brand-500 text-white hover:bg-brand-700 dark:hover:bg-brand-400 shadow-sm"
                      : "border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-900 text-neutral-heading dark:text-slate-100 hover:border-brand-600 dark:hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-800"
                      }`}
                  >
                    {ctaLabel} →
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-brand-500/40 bg-brand-600 dark:bg-brand-700 p-8 sm:p-12 text-center text-white shadow-xl">
          <h2 className="font-display text-2xl font-bold !text-white sm:text-3xl">
            {t("partners.readyToTalk")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/90 max-w-xl mx-auto">
            {t("partners.readyToTalkBody")}
          </p>
          <div className="mt-6">
            <a
              href={`mailto:${SITE.email}?subject=Partnership%20enquiry`}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-brand-600 shadow-md transition hover:bg-brand-50 hover:shadow-lg"
            >
              <span>{t("partners.emailUs", { email: SITE.email })}</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
