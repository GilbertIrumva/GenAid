import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export type SectionPattern = "canvas" | "soft" | "impact";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  pattern?: SectionPattern;
}

export default function Section({
  children,
  className,
  id,
  pattern = "canvas",
}: SectionProps) {
  const patternStyles: Record<SectionPattern, string> = {
    canvas: "bg-white dark:bg-slate-900 text-neutral-body dark:text-slate-300 transition-colors",
    soft: "bg-brand-50 dark:bg-slate-800/60 border-y border-brand-100/60 dark:border-slate-800 text-neutral-body dark:text-slate-300 transition-colors",
    impact: "bg-brand-600 dark:bg-slate-950 border-y border-brand-700 dark:border-slate-800 text-white transition-colors",
  };

  return (
    <section
      id={id}
      className={cn("py-16 sm:py-20", patternStyles[pattern], className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
