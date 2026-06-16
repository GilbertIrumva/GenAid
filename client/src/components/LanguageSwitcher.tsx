import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
] as const;

type LangCode = (typeof LANGS)[number]["code"];

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { i18n, t } = useTranslation();
  const current = (i18n.resolvedLanguage ?? i18n.language ?? "en").slice(0, 2) as LangCode;

  return (
    <div
      role="group"
      aria-label={t("common.language")}
      className={`inline-flex items-center rounded-md border border-line bg-bg p-0.5 text-xs font-semibold ${className}`}
    >
      {LANGS.map((lng) => {
        const active = current === lng.code;
        return (
          <button
            key={lng.code}
            type="button"
            onClick={() => void i18n.changeLanguage(lng.code)}
            aria-pressed={active}
            className={
              "rounded px-2 py-1 transition " +
              (active
                ? "bg-primary-500 text-white"
                : "text-ink/70 hover:text-primary-600")
            }
          >
            {lng.label}
          </button>
        );
      })}
    </div>
  );
}
