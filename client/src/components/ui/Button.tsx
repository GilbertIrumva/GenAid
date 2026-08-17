import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "destructive"
    | "ghost"
    | "glow"
    | "aid"
    | "jobs";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary:
        "bg-brand-600 dark:bg-brand-500 text-white hover:bg-brand-700 dark:hover:bg-brand-400 active:bg-brand-800 shadow-sm border border-transparent",
      secondary:
        "bg-white dark:bg-slate-800 border border-brand-600 dark:border-brand-500 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-700 active:bg-brand-100 dark:active:bg-slate-600",
      outline:
        "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700",
      destructive:
        "bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-400 active:bg-red-800 shadow-sm border border-transparent",
      ghost:
        "bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
      glow: "bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:bg-emerald-500 hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] border border-emerald-400/30",
      aid: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-500/20 active:scale-[0.98] border border-emerald-400/30 font-bold",
      jobs: "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/20 active:scale-[0.98] border border-cyan-400/30 font-bold",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs font-semibold rounded-lg",
      md: "px-4 py-2 text-sm font-semibold rounded-xl",
      lg: "px-5 py-2.5 text-base font-bold rounded-xl",
      xl: "px-6 py-3.5 text-base font-bold rounded-2xl",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent shrink-0" />
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}
        <span>{children}</span>
        {!isLoading && rightIcon ? (
          <span className="shrink-0">{rightIcon}</span>
        ) : null}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;

