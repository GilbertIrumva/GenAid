import { useTranslation } from "react-i18next";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === "dark";
  // The button switches *to* the opposite mode, so the label describes
  // the destination state (e.g. shown "Light mode" while currently dark).
  const label = isDark ? t("common.lightMode") : t("common.darkMode");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`inline-flex h-9 items-center gap-1.5 rounded-md border border-line bg-bg px-2.5 text-xs font-semibold text-ink/80 transition hover:border-primary-300 hover:bg-bg hover:text-primary-600 ${className}`}
    >
      {isDark ? (
        /* Sun icon — shown in dark mode to indicate "switch to light" */
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        /* Moon icon — shown in light mode to indicate "switch to dark" */
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
      <span>{label}</span>
    </button>
  );
}
