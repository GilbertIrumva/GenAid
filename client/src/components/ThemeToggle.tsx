import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme, type Theme } from "@/components/ThemeProvider";

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const { t } = useTranslation();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options: Array<{ value: Theme; label: string; icon: React.ReactNode }> = [
    {
      value: "light",
      label: t("common.lightMode", "Light"),
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ),
    },
    {
      value: "dark",
      label: t("common.darkMode", "Dark"),
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3c.5 0 .78.57.45.95A7 7 0 0 0 20.05 12c.38-.33.95-.05.95.45Z" />
        </svg>
      ),
    },
    {
      value: "system",
      label: t("common.systemMode", "System"),
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
  ];

  const currentOption = options.find((o) => o.value === theme) ?? options[0];

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`${t("common.theme", "Theme")}: ${currentOption.label}`}
        title={`${t("common.theme", "Theme")}: ${currentOption.label}`}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 text-xs font-semibold text-neutral-heading dark:text-slate-100 hover:border-brand-600 dark:hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition shadow-sm"
      >
        <span className="text-brand-600 dark:text-brand-400">
          {resolvedTheme === "dark" ? options[1].icon : options[0].icon}
        </span>
        <span className="hidden sm:inline">{currentOption.label}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={t("common.theme", "Theme")}
          className="absolute right-0 z-50 mt-1.5 w-32 origin-top-right rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-1 shadow-lg ring-1 ring-black/5"
        >
          {options.map((opt) => {
            const isSelected = theme === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setTheme(opt.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                  isSelected
                    ? "bg-brand-50 dark:bg-slate-700/80 text-brand-600 dark:text-brand-400 font-semibold"
                    : "text-neutral-heading dark:text-slate-200 hover:bg-neutral-white dark:hover:bg-slate-700/50 hover:text-brand-600 dark:hover:text-brand-400"
                }`}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
                {isSelected && (
                  <span className="ml-auto text-brand-600 dark:text-brand-400">✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
