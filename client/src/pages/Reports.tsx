import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import Section from "@/components/Section";
import { useSEO } from "@/utils/useSEO";
import { reports, type ReportItem, type ReportKind } from "@/data/reports";
import { getReports, mapSanityReportToDisplayReport } from "@/lib/sanity";

const KIND_STYLES: Record<ReportKind, { label: string; chip: string }> = {
  annual: {
    label: "Annual report",
    chip: "bg-brand-50 dark:bg-slate-800 text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-slate-700",
  },
  impact: {
    label: "Impact assessment",
    chip: "bg-brand-50 dark:bg-slate-800 text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-slate-700",
  },
  financial: {
    label: "Financial statement",
    chip: "bg-brand-50 dark:bg-slate-800 text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-slate-700",
  },
  brief: {
    label: "Policy brief",
    chip: "bg-brand-50 dark:bg-slate-800 text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-slate-700",
  },
};

function ReportCard({ item }: { item: ReportItem }) {
  const { t } = useTranslation();
  const kind = KIND_STYLES[item.kind];
  const kindLabel = t(`reports.kinds.${item.kind}`, kind.label);
  const isAvailable = Boolean(item.downloadUrl);

  return (
    <article className="flex h-full flex-col rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${kind.chip}`}
        >
          {kindLabel}
        </span>
        <span className="text-sm font-semibold text-neutral-body dark:text-slate-400">{item.year}</span>
      </div>

      <h2 className="mt-4 text-lg font-semibold text-neutral-heading dark:text-slate-100">{item.title}</h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-body dark:text-slate-300">
        {item.summary}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3">
        {item.pages && (
          <span className="text-xs text-neutral-body dark:text-slate-400">
            {t("reports.pages", "{{count}} pages", { count: item.pages })}
          </span>
        )}
        {isAvailable ? (
          <a
            href={item.downloadUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-lg bg-brand-600 dark:bg-brand-500 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 dark:hover:bg-brand-400 shadow-sm"
          >
            {t("reports.download", "Download PDF")}
            <span aria-hidden>↓</span>
          </a>
        ) : (
          <span className="inline-flex items-center rounded-md bg-brand-50 dark:bg-slate-700 px-2.5 py-1 text-xs font-medium text-neutral-body dark:text-slate-300 border border-brand-100 dark:border-slate-600">
            {t("reports.comingSoon", "Coming soon")}
          </span>
        )}
      </div>
    </article>
  );
}

export default function Reports() {
  const { t } = useTranslation();
  useSEO({
    title: t("reports.title", "Reports"),
    description: t(
      "reports.description",
      "Annual reports, impact assessments and financial statements from Generation Aid.",
    ),
  });

  const { data: sanityReports = [] } = useQuery({
    queryKey: ["public", "sanity", "reports"],
    queryFn: getReports,
    retry: false,
  });

  const feed: ReportItem[] =
    sanityReports.length > 0
      ? sanityReports.map((item) => mapSanityReportToDisplayReport(item))
      : reports;

  const items = [...feed].sort((a, b) => b.year - a.year);

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      {/* HEADER (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            {t("reports.eyebrow", "Transparency")}
          </p>
          <h1 className="mt-3 text-4xl font-bold text-neutral-heading dark:text-slate-50 sm:text-5xl">
            {t("reports.title", "Reports")}
          </h1>
          <p className="mt-4 text-lg text-neutral-body dark:text-slate-300">
            {t(
              "reports.subtitle",
              "Annual reports, impact assessments and financial statements — so you can see exactly what we deliver and how we spend.",
            )}
          </p>
        </div>
      </Section>

      {/* REPORT GRID (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ReportCard key={item.key} item={item} />
          ))}
        </div>
      </Section>

      {/* REQUEST INFO (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl rounded-xl border border-neutral-border dark:border-slate-700 bg-brand-50/50 dark:bg-slate-800/50 p-8 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-neutral-heading dark:text-slate-100">
            {t("reports.requestTitle", "Need a specific report or data set?")}
          </h2>
          <p className="mt-3 text-neutral-body dark:text-slate-300">
            {t(
              "reports.requestBody",
              "Funders, researchers and partners can request detailed programme data, programme cost breakdowns or methodology notes.",
            )}
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex rounded-lg bg-brand-600 dark:bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 dark:hover:bg-brand-400"
          >
            {t("reports.requestCta", "Request information")}
          </a>
        </div>
      </Section>
    </div>
  );
}
