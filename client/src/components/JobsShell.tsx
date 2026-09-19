import type { ReactNode } from "react";

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

  return (
    <>
      <section className="border-b border-blue-100 dark:border-blue-900 bg-brand-50/40 dark:bg-blue-950/60 sir-hero-bg transition-colors py-3 sm:py-4">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:py-8 sm:px-6 lg:px-8">
          <div>
            <span className="sir-tag text-[10px]">
              {eyebrow}
            </span>
            <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 font-serif break-words">
              {title}
            </h1>
            <div className="sir-callout-border !my-2 !py-0 !pl-3 sm:!pl-4">
              <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-medium break-words">
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


