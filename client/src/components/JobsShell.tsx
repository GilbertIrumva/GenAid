import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import SmartImage from "@/components/SmartImage";
import { getJobsContent } from "@/lib/sanity";

interface JobsShellProps {
  title: string;
  subtitle: string;
  eyebrow?: string;
  children: ReactNode;
}

export default function JobsShell({
  title,
  subtitle,
  eyebrow = "Generation Jobs",
  children,
}: JobsShellProps) {
  const { data: jobsContent } = useQuery({
    queryKey: ["jobs", "sanity", "content"],
    queryFn: getJobsContent,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      <section className="border-b border-neutral-border dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-neutral-border dark:border-slate-700 bg-brand-600 dark:bg-brand-500 p-0.5 shadow-sm">
              <SmartImage
                src={jobsContent?.jobsLogo || "/img/site/generation-jobs-mark.svg"}
                alt="Generation Jobs logo"
                className="h-full w-full object-cover"
                fallbackLabel="Jobs"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600 dark:text-brand-400">
                {eyebrow}
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-neutral-heading dark:text-slate-50 sm:text-3xl">
                {title}
              </h1>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-neutral-body dark:text-slate-300 sm:text-base">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {children}
    </>
  );
}
