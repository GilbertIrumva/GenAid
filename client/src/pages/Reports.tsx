import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import { useSEO } from "@/utils/useSEO";
import { reports, type ReportItem, type ReportKind } from "@/data/reports";

const KIND_STYLES: Record<ReportKind, { label: string; chip: string }> = {
  annual: {
    label: "Annual report",
    chip: "bg-primary-50 text-primary-700",
  },
  impact: {
    label: "Impact assessment",
    chip: "bg-emerald-50 text-emerald-700",
  },
  financial: {
    label: "Financial statement",
    chip: "bg-amber-50 text-amber-700",
  },
  brief: {
    label: "Policy brief",
    chip: "bg-violet-50 text-violet-700",
  },
};

function ReportCard({ item }: { item: ReportItem }) {
  const { t } = useTranslation();
  const kind = KIND_STYLES[item.kind];
  const kindLabel = t(`reports.kinds.${item.kind}`, kind.label);
  const isAvailable = Boolean(item.downloadUrl);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${kind.chip}`}
        >
          {kindLabel}
        </span>
        <span className="text-sm font-semibold text-muted">{item.year}</span>
      </div>

      <h2 className="mt-4 text-lg font-semibold text-ink">{item.title}</h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.summary}</p>

      <div className="mt-5 flex items-center justify-between gap-3">
        {item.pages && (
          <span className="text-xs text-muted">
            {t("reports.pages", "{{count}} pages", { count: item.pages })}
          </span>
        )}
        {isAvailable ? (
          <a
            href={item.downloadUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-primary-700"
          >
            {t("reports.download", "Download PDF")}
            <span aria-hidden>↓</span>
          </a>
        ) : (
          <span className="inline-flex items-center rounded-md bg-bg px-2.5 py-1 text-xs font-medium text-muted">
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
      "Annual reports, impact assessments and financial statements from Generation Aid."
    ),
  });
  // Sort newest year first; group implicitly stays year-aligned for readers.
  const items = [...reports].sort((a, b) => b.year - a.year);

  return (
    <>
      <Section className="bg-surface">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">
            {t("reports.eyebrow", "Transparency")}
          </p>
          <h1 className="mt-3 text-4xl font-bold text-ink sm:text-5xl">
            {t("reports.title", "Reports")}
          </h1>
          <p className="mt-4 text-lg text-muted">
            {t(
              "reports.subtitle",
              "Annual reports, impact assessments and financial statements — so you can see exactly what we deliver and how we spend."
            )}
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ReportCard key={item.key} item={item} />
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="mx-auto max-w-3xl rounded-2xl border border-line bg-bg p-8 text-center">
          <h2 className="text-2xl font-semibold text-ink">
            {t("reports.requestTitle", "Need a specific report or data set?")}
          </h2>
          <p className="mt-3 text-muted">
            {t(
              "reports.requestBody",
              "Funders, researchers and partners can request detailed programme data, programme cost breakdowns or methodology notes."
            )}
          </p>
          <a
            href="/contact"
            className="mt-5 inline-flex rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
          >
            {t("reports.requestCta", "Request information")}
          </a>
        </div>
      </Section>
    </>
  );
}
