import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const { t } = useTranslation();
  const { setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const label = isDark
    ? t("common.switchToLight", "Switch to light mode")
    : t("common.switchToDark", "Switch to dark mode");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 text-neutral-heading dark:text-slate-100 hover:border-brand-600 dark:hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition shadow-sm ${className}`}
    >
      {isDark ? (
        // Sun icon for dark mode (to switch to light)
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="text-amber-400 transition-transform duration-200 hover:rotate-45"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        // Moon icon for light mode (to switch to dark)
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="text-slate-700 dark:text-slate-200 transition-transform duration-200 hover:-rotate-12"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3c.5 0 .78.57.45.95A7 7 0 0 0 20.05 12c.38-.33.95-.05.95.45Z" />
        </svg>
      )}
    </button>
  );
}

