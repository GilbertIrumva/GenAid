import type { ReactNode } from "react";
import SmartImage from "@/components/SmartImage";

interface JobsShellProps {
  title: string;
  subtitle: string;
  eyebrow?: string;
  heroImage?: string;
  customHero?: ReactNode;
  children: ReactNode;
}

export default function JobsShell({
  title,
  subtitle,
  eyebrow = "Generation Jobs",
  heroImage,
  customHero,
  children,
}: JobsShellProps) {
  const resolvedHeroImage = heroImage || "/gen jobs/home slide images (1).jpg";

  return (
    <>
      {customHero ? (
        customHero
      ) : (
        <section className="relative isolate flex min-h-[42vh] sm:min-h-[48vh] items-center overflow-hidden bg-brand-900 dark:bg-slate-950 text-white transition-colors">
          <SmartImage
            src={resolvedHeroImage}
            alt={title}
            fallbackLabel=""
            priority={true}
            className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_20%] brightness-105 sm:brightness-110 contrast-[1.04] saturate-[1.08] dark:brightness-100 dark:contrast-[1.08]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0d1b3e]/90 via-[#0d1b3e]/60 via-45% to-transparent dark:from-slate-950/95 dark:via-slate-950/70 dark:to-slate-950/20 pointer-events-none"
          />
          <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:py-20 sm:px-6 lg:px-8">
            <div className="max-w-2xl text-white space-y-3 sm:space-y-4">
              <span className="inline-block rounded-md bg-white/20 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white border border-white/30 backdrop-blur-sm">
                {eyebrow}
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl font-serif leading-[1.15] !text-white">
                {title}
              </h1>
              <div className="sir-callout-border border-l-white !my-2 sm:!my-3 !py-0 !pl-3 sm:!pl-4 !text-white">
                <p className="text-sm sm:text-base leading-relaxed text-white/95 font-medium">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {children}
    </>
  );
}


