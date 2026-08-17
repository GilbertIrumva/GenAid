import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";
import { news, type NewsItem } from "@/data/news";
import { getNews, mapSanityNewsToDisplayNews } from "@/lib/sanity";

function formatDate(iso: string, locale?: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(locale ?? undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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
      <span className="text-brand-600 dark:text-brand-400">{item.source}</span>
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

function Linkable({
  item,
  children,
}: {
  item: NewsItem;
  children: React.ReactNode;
}) {
  if (!item.url) return <>{children}</>;
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
    >
      {children}
    </a>
  );
}

function LeadCard({ item, locale }: { item: NewsItem; locale: string }) {
  const { t } = useTranslation();
  return (
    <Linkable item={item}>
      <article className="group grid overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md lg:grid-cols-[1.4fr_1fr]">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-50 dark:bg-slate-900 lg:aspect-auto">
          <SmartImage
            src={item.image}
            alt={item.title}
            fallbackLabel={item.source}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-md bg-brand-600 dark:bg-brand-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
            {t("news.latestLabel", "Top story")}
          </span>
        </div>
        <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
          <Meta item={item} locale={locale} className="text-neutral-body dark:text-slate-400" />
          <h2 className="font-display text-2xl font-bold leading-snug text-neutral-heading dark:text-slate-100 sm:text-3xl">
            {item.title}
          </h2>
          <p className="text-sm leading-relaxed text-neutral-body dark:text-slate-300 sm:text-base">
            {item.summary}
          </p>
          {item.url ? (
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 group-hover:text-brand-700 dark:group-hover:text-brand-300 group-hover:underline underline-offset-4">
              {t("news.readArticle", "Read the article")}
              <span aria-hidden>→</span>
            </span>
          ) : (
            <span className="mt-2 inline-flex w-fit items-center rounded-md bg-brand-50 dark:bg-slate-700 px-2.5 py-1 text-xs font-medium text-neutral-body dark:text-slate-300 border border-brand-100 dark:border-slate-600">
              {t("news.linkComingSoon", "Link coming soon")}
            </span>
          )}
        </div>
      </article>
    </Linkable>
  );
}

function FeaturedCard({ item, locale }: { item: NewsItem; locale: string }) {
  const { t } = useTranslation();
  return (
    <Linkable item={item}>
      <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md">
        <div className="aspect-[16/10] w-full overflow-hidden bg-brand-50 dark:bg-slate-900">
          <SmartImage
            src={item.image}
            alt={item.title}
            fallbackLabel={item.source}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <Meta item={item} locale={locale} className="text-neutral-body dark:text-slate-400" />
          <h3 className="font-display text-lg font-semibold leading-snug text-neutral-heading dark:text-slate-100">
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed text-neutral-body dark:text-slate-300">{item.summary}</p>
          {item.url ? (
            <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 group-hover:text-brand-700 dark:group-hover:text-brand-300 group-hover:underline underline-offset-4">
              {t("news.readArticle", "Read the article")}
              <span aria-hidden>→</span>
            </span>
          ) : (
            <span className="mt-auto inline-flex w-fit items-center rounded-md bg-brand-50 dark:bg-slate-700 px-2.5 py-1 text-xs font-medium text-neutral-body dark:text-slate-300 border border-brand-100 dark:border-slate-600">
              {t("news.linkComingSoon", "Link coming soon")}
            </span>
          )}
        </div>
      </article>
    </Linkable>
  );
}

function CompactRow({ item, locale }: { item: NewsItem; locale: string }) {
  return (
    <Linkable item={item}>
      <article className="group flex gap-4 border-b border-neutral-border dark:border-slate-700 pb-5 last:border-b-0 last:pb-0">
        <div className="aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-brand-50 dark:bg-slate-900 sm:h-28 sm:w-28">
          <SmartImage
            src={item.image}
            alt={item.title}
            fallbackLabel={item.source}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <Meta item={item} locale={locale} className="text-neutral-body dark:text-slate-400" />
          <h4 className="font-display text-base font-semibold leading-snug text-neutral-heading dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400">
            {item.title}
          </h4>
          <p className="line-clamp-2 text-sm text-neutral-body dark:text-slate-300">{item.summary}</p>
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
      "Press coverage, awards and public mentions of Generation Aid's refugee-led work in Kakuma.",
    ),
  });

  const { data: sanityNews = [] } = useQuery({
    queryKey: ["public", "sanity", "news"],
    queryFn: getNews,
    retry: false,
  });

  const feed: NewsItem[] =
    sanityNews.length > 0
      ? sanityNews.map((item) => mapSanityNewsToDisplayNews(item))
      : news;

  const sorted = [...feed].sort((a, b) => b.date.localeCompare(a.date));
  const [lead, ...rest] = sorted;
  const featured = rest.slice(0, 2);
  const remaining = rest.slice(2);

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      {/* HEADER (Pattern A: Canvas) */}
      <Section pattern="canvas" className="!py-12">
        <div className="mx-auto max-w-5xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
            <span
              aria-hidden
              className="inline-block h-1.5 w-6 rounded-full bg-brand-600 dark:bg-brand-500"
            />
            {t("news.eyebrow", "Press & media")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-neutral-heading dark:text-slate-50 sm:text-5xl">
            {t("news.title", "In the news")}
          </h1>
          <p className="mt-3 max-w-3xl text-base text-neutral-body dark:text-slate-300 sm:text-lg">
            {t(
              "news.subtitle",
              "Articles, partnerships and public recognition that have spotlighted our refugee-led work in Kakuma.",
            )}
          </p>
        </div>
      </Section>

      {/* LEAD STORY + FEATURED HEADLINES (Pattern B: Soft Contrast) */}
      <Section pattern="soft" className="!pt-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[2fr_1fr]">
          {lead && <LeadCard item={lead} locale={i18n.language} />}

          {featured.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="border-b-2 border-brand-600 dark:border-brand-500 pb-2 font-display text-sm font-bold uppercase tracking-widest text-neutral-heading dark:text-slate-100">
                {t("news.moreHeadlines", "More headlines")}
              </h2>
              <div className="flex flex-col gap-6">
                {featured.map((item) => (
                  <FeaturedCard
                    key={item.key}
                    item={item}
                    locale={i18n.language}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* DENSE LIST OF REMAINING COVERAGE (Pattern A: Canvas) */}
      {remaining.length > 0 && (
        <Section pattern="canvas">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 border-b-2 border-brand-600 dark:border-brand-500 pb-2 font-display text-sm font-bold uppercase tracking-widest text-neutral-heading dark:text-slate-100">
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

      {/* CONTACT CTA (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl rounded-xl border border-neutral-border dark:border-slate-700 bg-brand-50/50 dark:bg-slate-800/50 p-8 text-center shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-neutral-heading dark:text-slate-100">
            {t("news.contactTitle", "Media or press enquiries?")}
          </h2>
          <p className="mt-3 text-neutral-body dark:text-slate-300">
            {t(
              "news.contactBody",
              "We're happy to share interviews, photography and on-the-ground access for stories about refugee-led education and livelihoods.",
            )}
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex rounded-lg bg-brand-600 dark:bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 dark:hover:bg-brand-400"
          >
            {t("news.contactCta", "Contact our team")}
          </a>
        </div>
      </Section>
    </div>
  );
}
