import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";
import { news, type NewsItem } from "@/data/news";

function formatDate(iso: string, locale?: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(locale ?? undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Source · date · category meta line shared by every card. */
function Meta({
  item,
  locale,
  className = "",
}: {
  item: NewsItem;
  locale: string;
  className?: string;
}) {
  return (
    <div
      className={
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium uppercase tracking-wide " +
        className
      }
    >
      <span className="text-brand-red-600">{item.source}</span>
      <span aria-hidden>•</span>
      <time dateTime={item.date}>{formatDate(item.date, locale)}</time>
      {item.category && (
        <>
          <span aria-hidden>•</span>
          <span>{item.category}</span>
        </>
      )}
    </div>
  );
}

/** Optional outer <a> wrapper that turns a card into a link when `url` exists. */
function Linkable({ item, children }: { item: NewsItem; children: React.ReactNode }) {
  if (!item.url) return <>{children}</>;
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      {children}
    </a>
  );
}

/** Big editorial hero card — image left, headline + summary right on desktop. */
function LeadCard({ item, locale }: { item: NewsItem; locale: string }) {
  const { t } = useTranslation();
  return (
    <Linkable item={item}>
      <article className="group grid overflow-hidden rounded-2xl border border-line bg-surface transition hover:shadow-lg lg:grid-cols-[1.4fr_1fr]">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-primary-50 lg:aspect-auto">
          <SmartImage
            src={item.image}
            alt={item.title}
            fallbackLabel={item.source}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-sm bg-brand-red-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            {t("news.latestLabel", "Top story")}
          </span>
        </div>
        <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
          <Meta item={item} locale={locale} className="text-muted" />
          <h2 className="font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">
            {item.title}
          </h2>
          <p className="text-sm leading-relaxed text-muted sm:text-base">{item.summary}</p>
          {item.url ? (
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:text-primary-700">
              {t("news.readArticle", "Read the article")}
              <span aria-hidden>→</span>
            </span>
          ) : (
            <span className="mt-2 inline-flex w-fit items-center rounded-md bg-bg px-2 py-1 text-xs font-medium text-muted">
              {t("news.linkComingSoon", "Link coming soon")}
            </span>
          )}
        </div>
      </article>
    </Linkable>
  );
}

/** Mid-size card used in the "More headlines" row. Image on top, text below. */
function FeaturedCard({ item, locale }: { item: NewsItem; locale: string }) {
  const { t } = useTranslation();
  return (
    <Linkable item={item}>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:shadow-md">
        <div className="aspect-[16/10] w-full overflow-hidden bg-primary-50">
          <SmartImage
            src={item.image}
            alt={item.title}
            fallbackLabel={item.source}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <Meta item={item} locale={locale} className="text-muted" />
          <h3 className="font-display text-lg font-semibold leading-snug text-ink">
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted">{item.summary}</p>
          {item.url ? (
            <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:text-primary-700">
              {t("news.readArticle", "Read the article")}
              <span aria-hidden>→</span>
            </span>
          ) : (
            <span className="mt-auto inline-flex w-fit items-center rounded-md bg-bg px-2 py-1 text-xs font-medium text-muted">
              {t("news.linkComingSoon", "Link coming soon")}
            </span>
          )}
        </div>
      </article>
    </Linkable>
  );
}

/** Compact row used in the dense list below. Square thumbnail on the left. */
function CompactRow({ item, locale }: { item: NewsItem; locale: string }) {
  return (
    <Linkable item={item}>
      <article className="group flex gap-4 border-b border-line pb-5 last:border-b-0 last:pb-0">
        <div className="aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-primary-50 sm:h-28 sm:w-28">
          <SmartImage
            src={item.image}
            alt={item.title}
            fallbackLabel={item.source}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <Meta item={item} locale={locale} className="text-muted" />
          <h4 className="font-display text-base font-semibold leading-snug text-ink group-hover:text-primary-600">
            {item.title}
          </h4>
          <p className="line-clamp-2 text-sm text-muted">{item.summary}</p>
        </div>
      </article>
    </Linkable>
  );
}

export default function News() {
  const { t, i18n } = useTranslation();
  useSEO({
    title: t("news.title", "In the news"),
    description: t(
      "news.description",
      "Press coverage, awards and public mentions of Generation Aid's refugee-led work in Kakuma."
    ),
  });

  // Most recent first. Split into a single lead, two featured, then the rest.
  const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date));
  const [lead, ...rest] = sorted;
  const featured = rest.slice(0, 2);
  const remaining = rest.slice(2);

  return (
    <>
      {/* HEADER (compact — the visual weight should sit on the stories) */}
      <Section className="bg-surface !py-10">
        <div className="mx-auto max-w-5xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-red-600">
            <span aria-hidden className="inline-block h-1.5 w-6 rounded-full bg-brand-red-500" />
            {t("news.eyebrow", "Press & media")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
            {t("news.title", "In the news")}
          </h1>
          <p className="mt-3 max-w-3xl text-base text-muted sm:text-lg">
            {t(
              "news.subtitle",
              "Articles, partnerships and public recognition that have spotlighted our refugee-led work in Kakuma."
            )}
          </p>
        </div>
      </Section>

      {/* LEAD STORY + FEATURED HEADLINES */}
      <Section className="!pt-2">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Lead */}
          {lead && <LeadCard item={lead} locale={i18n.language} />}

          {/* Stacked sidebar with the next two stories */}
          {featured.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="border-b-2 border-brand-red-500 pb-2 font-display text-sm font-bold uppercase tracking-widest text-ink">
                {t("news.moreHeadlines", "More headlines")}
              </h2>
              <div className="flex flex-col gap-6">
                {featured.map((item) => (
                  <FeaturedCard key={item.key} item={item} locale={i18n.language} />
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* DENSE LIST OF REMAINING COVERAGE */}
      {remaining.length > 0 && (
        <Section className="bg-surface">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 border-b-2 border-brand-red-500 pb-2 font-display text-sm font-bold uppercase tracking-widest text-ink">
              {t("news.allCoverage", "All coverage")}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {remaining.map((item) => (
                <CompactRow key={item.key} item={item} locale={i18n.language} />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* CONTACT CTA */}
      <Section>
        <div className="mx-auto max-w-3xl rounded-2xl border border-line bg-surface p-8 text-center">
          <h2 className="font-display text-2xl font-semibold text-ink">
            {t("news.contactTitle", "Media or press enquiries?")}
          </h2>
          <p className="mt-3 text-muted">
            {t(
              "news.contactBody",
              "We're happy to share interviews, photography and on-the-ground access for stories about refugee-led education and livelihoods."
            )}
          </p>
          <a
            href="/contact"
            className="mt-5 inline-flex rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
          >
            {t("news.contactCta", "Contact our team")}
          </a>
        </div>
      </Section>
    </>
  );
}
