import { useState } from "react";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";
import { SITE } from "@/data/site";
import {
  partners,
  partnershipBenefits,
  type Partner,
  type PartnerCategory,
} from "@/data/partners";

const categories: PartnerCategory[] = [
  "Strategic",
  "Funding",
  "Implementation",
  "Corporate",
];

interface TierAccent {
  /** Background for the tier badge circle. */
  badgeBg: string;
  /** Text color for the badge. */
  badgeText: string;
  /** Outer card border + ring colors. */
  border: string;
  /** Color of the bullet checkmarks. */
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
      badgeBg: "bg-emerald-50",
      badgeText: "text-emerald-600",
      border: "border-line",
      bullet: "text-emerald-500",
    },
    ctaSubject: "Programme%20partnership%20enquiry",
  },
  {
    key: "hub",
    icon: "\u25c8",
    accent: {
      badgeBg: "bg-primary-500",
      badgeText: "text-white",
      border: "border-primary-400",
      bullet: "text-primary-600",
    },
    ctaSubject: "Hub%20sponsorship%20enquiry",
    featured: true,
  },
  {
    key: "talent",
    icon: "\u25b3",
    accent: {
      badgeBg: "bg-amber-50",
      badgeText: "text-amber-600",
      border: "border-line",
      bullet: "text-amber-500",
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

/**
 * Single partner card. Falls back from broken logo URLs to the initials avatar
 * so external logo CDN issues never leave a broken-image icon on the page.
 */
function PartnerCard({ partner }: { partner: Partner }) {
  const { t } = useTranslation();
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogo = Boolean(partner.logo) && !logoFailed;
  const description = t(`partners.list.${partner.key}`, partner.description);

  return (
    <a
      href={partner.url ?? "#"}
      target={partner.url ? "_blank" : undefined}
      rel={partner.url ? "noreferrer" : undefined}
      className="flex gap-4 rounded-2xl border border-line bg-surface p-5 shadow-sm transition hover:border-primary-300 hover:shadow-md"
    >
      <div className="grid h-14 w-14 flex-shrink-0 place-items-center overflow-hidden rounded-xl bg-white font-display text-lg font-bold text-primary-600 ring-1 ring-line">
        {showLogo ? (
          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
            loading="lazy"
            className="h-12 w-12 object-contain"
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <span className="bg-primary-50 grid h-full w-full place-items-center">
            {initials(partner.name)}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="font-display text-base font-semibold text-ink">
          {partner.name}
        </p>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
    </a>
  );
}

export default function Partners() {
  const { t } = useTranslation();
  useSEO({
    title: "Partners",
    description:
      "NGOs, corporates and individuals partnering with Generation Aid to scale refugee-led impact in Kakuma.",
  });

  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[55vh] items-center overflow-hidden">
        {/* TODO: replace with real Generation Aid photo */}
        <SmartImage
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80"
          alt="Team collaborating around a table"
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/65 to-ink/40"
        />
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-300 backdrop-blur">
              {t("partners.hero.eyebrow")}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              {t("partners.hero.titleStart")}{" "}
              <span className="text-primary-300">{t("partners.hero.titleHighlight")}</span>{" "}
              {t("partners.hero.titleEnd")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              {t("partners.hero.subtitleAlt")}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#become-a-partner"
                className="rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
              >
                {t("partners.becomeAPartner")}
              </a>
              <a
                href={`mailto:${SITE.email}?subject=Partnership%20enquiry`}
                className="rounded-md border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                {t("partners.emailPartnerships")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <Section className="bg-surface">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            {t("partners.whyPartner")}
          </h2>
          <p className="mt-3 text-muted">{t("partners.whyPartnerSubtitle")}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {partnershipBenefits.map((b) => (
            <div
              key={b.key}
              className="rounded-2xl border border-line bg-bg p-6 shadow-sm"
            >
              <h3 className="font-display text-lg font-semibold text-ink">
                {t(`partners.benefits.${b.key}.title`, b.title)}
              </h3>
              <p className="mt-3 text-sm text-muted">
                {t(`partners.benefits.${b.key}.body`, b.body)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CURRENT PARTNERS */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              {t("partners.currentPartners")}
            </h2>
            <p className="mt-2 text-muted">
              {t("partners.currentPartnersSubtitle")}
            </p>
          </div>
        </div>

        {categories.map((cat) => {
          const inCat = partners.filter((p) => p.category === cat);
          if (inCat.length === 0) return null;
          return (
            <div key={cat} className="mt-10">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                {t(`partners.categories.${cat}`, cat)}
              </h3>
              <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {inCat.map((p) => (
                  <PartnerCard key={p.name} partner={p} />
                ))}
              </div>
            </div>
          );
        })}
      </Section>

      {/* TIERS */}
      <Section id="become-a-partner" className="bg-surface">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            {t("partners.getInvolved")}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            {t("partners.threeWays")}
          </h2>
          <p className="mt-3 text-muted">{t("partners.threeWaysSubtitle")}</p>
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
                className={`relative flex flex-col rounded-2xl border bg-bg p-6 shadow-sm transition hover:shadow-md ${meta.accent.border} ${
                  meta.featured
                    ? "ring-2 ring-primary-400/40 md:-mt-4 md:mb-0 md:scale-[1.03] md:p-7 md:shadow-lg"
                    : ""
                }`}
              >
                {meta.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow">
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
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {name}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {tagline}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted">{body}</p>

                <ul className="mt-5 space-y-2 text-sm text-ink">
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
                <div className="border-t border-line pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                    {from}
                  </p>
                  <a
                    href={`mailto:${SITE.email}?subject=${meta.ctaSubject}`}
                    className={`mt-3 inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition ${
                      meta.featured
                        ? "bg-primary-500 text-white hover:bg-primary-600"
                        : "border border-line bg-surface text-ink hover:border-primary-300 hover:text-primary-600"
                    }`}
                  >
                    {ctaLabel} →
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-line bg-bg p-10 text-center">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            {t("partners.readyToTalk")}
          </h2>
          <p className="mt-3 text-muted">
            {t("partners.readyToTalkBody")}
          </p>
          <a
            href={`mailto:${SITE.email}?subject=Partnership%20enquiry`}
            className="mt-6 inline-block rounded-md bg-primary-500 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-600"
          >
            {t("partners.emailUs", { email: SITE.email })}
          </a>
        </div>
      </Section>
    </>
  );
}
