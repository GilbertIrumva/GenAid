import { useTranslation } from "react-i18next";

/**
 * Tiny inline-SVG flag for the United Kingdom — used to represent English.
 * We use SVG (not emoji) because emoji flags don't render on Windows and
 * not all OS fonts include them. The viewBox is a 60×30 (2:1) flag canvas.
 */
function FlagGB({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 30"
      aria-hidden
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <clipPath id="flag-gb-clip">
        <rect width="60" height="30" rx="2" ry="2" />
      </clipPath>
      <g clipPath="url(#flag-gb-clip)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          stroke="#C8102E"
          strokeWidth="4"
          clipPath="url(#flag-gb-clip)"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

/**
 * Tiny inline-SVG French tricolor flag.
 */
function FlagFR({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 30"
      aria-hidden
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <clipPath id="flag-fr-clip">
        <rect width="60" height="30" rx="2" ry="2" />
      </clipPath>
      <g clipPath="url(#flag-fr-clip)">
        <rect width="20" height="30" fill="#0055A4" />
        <rect x="20" width="20" height="30" fill="#fff" />
        <rect x="40" width="20" height="30" fill="#EF4135" />
      </g>
    </svg>
  );
}

const LANGS = [
  { code: "en", label: "English", short: "EN", Flag: FlagGB },
  { code: "fr", label: "Français", short: "FR", Flag: FlagFR },
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
      {LANGS.map(({ code, label, short, Flag }) => {
        const active = current === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => void i18n.changeLanguage(code)}
            aria-pressed={active}
            aria-label={label}
            title={label}
            className={
              "inline-flex items-center gap-1.5 rounded px-2 py-1 transition " +
              (active
                ? "bg-primary-500 text-white"
                : "text-ink/70 hover:text-primary-600")
            }
          >
            <Flag className="h-3.5 w-[18px] rounded-[2px] ring-1 ring-black/10" />
            <span>{short}</span>
          </button>
        );
      })}
    </div>
  );
}
