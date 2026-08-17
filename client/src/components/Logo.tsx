import { cn } from "@/utils/cn";

interface LogoProps {
  className?: string;
  showText?: boolean;
  textClassName?: string;
  src?: string;
}

export function GenerationAidLogo({
  className = "",
  showText = true,
  textClassName = "",
  src = "/logo.jpg",
}: LogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 min-w-0", className)}>
      <img
        src={src || "/logo.jpg"}
        alt="Generation Aid Logo"
        className="h-9 w-9 shrink-0 rounded-lg border border-neutral-border dark:border-slate-700 object-contain sm:h-10 sm:w-10 shadow-xs"
      />
      {showText && (
        <span
          className={cn(
            "truncate font-display text-base font-bold text-neutral-heading dark:text-slate-50 sm:text-lg lg:text-xl",
            textClassName
          )}
        >
          Generation Aid
        </span>
      )}
    </div>
  );
}

export function GenerationJobsLogo({
  className = "",
  showText = true,
  textClassName = "",
}: LogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 min-w-0", className)}>
      <img
        src="/logo.jpg"
        alt="Generation Jobs Mark"
        className="h-9 w-9 shrink-0 rounded-lg border border-neutral-border dark:border-slate-700 object-cover shadow-xs"
      />
      {showText && (
        <span
          className={cn(
            "truncate font-display text-base font-bold text-neutral-heading dark:text-slate-50 sm:text-lg lg:text-xl",
            textClassName
          )}
        >
          Generation Jobs
        </span>
      )}
    </div>
  );
}

export default GenerationAidLogo;
