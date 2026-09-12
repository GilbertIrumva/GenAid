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
    canvas: "bg-white dark:bg-blue-950 text-neutral-body dark:text-blue-100 transition-colors",
    soft: "bg-brand-50 dark:bg-blue-900/60 border-y border-brand-100/60 dark:border-blue-800 text-neutral-body dark:text-blue-100 transition-colors",
    impact: "bg-brand-600 dark:bg-blue-900 border-y border-brand-700 dark:border-blue-800 text-white transition-colors [&>div>div>h2]:!text-white [&>div>div>p]:text-white",
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
