import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle" | "bordered";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default:
        "bg-white dark:bg-slate-800 border border-neutral-border dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow text-neutral-heading dark:text-slate-100",
      subtle:
        "bg-brand-50 dark:bg-slate-800/80 border border-brand-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow text-neutral-heading dark:text-slate-100",
      bordered:
        "bg-white dark:bg-slate-800 border-2 border-brand-100 dark:border-slate-700 hover:border-brand-600 dark:hover:border-brand-500 transition-colors shadow-sm text-neutral-heading dark:text-slate-100",
    };

    return (
      <div
        ref={ref}
        className={cn("rounded-xl p-6 transition-all", variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";
export default Card;
