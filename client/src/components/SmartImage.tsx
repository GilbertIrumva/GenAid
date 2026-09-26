import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Short label shown inside the fallback placeholder. */
  fallbackLabel?: string;
  /** Set to true for hero banners and above-the-fold images to load immediately */
  priority?: boolean;
  /** Optional callback fired when image loading fails */
  onError?: () => void;
};

/**
 * Image with a branded gradient fallback shown when the network request fails
 * (e.g. external CDN unreachable) OR when no `src` was supplied. Keeps layouts
 * intact even when images break or are missing.
 */
export default function SmartImage({
  src,
  alt,
  className = "",
  fallbackLabel,
  priority = false,
  onError,
}: Props) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const missing = !src || src.trim() === "";

  if (failed || missing) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={
          "flex items-center justify-center bg-gradient-to-br from-brand-100 via-brand-300 to-brand-600 dark:from-slate-800 dark:via-brand-900 dark:to-slate-950 text-white " +
          className
        }
      >
        <div className="px-4 text-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="mx-auto opacity-90"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="9" cy="11" r="1.6" />
            <path d="m21 17-5-5-9 9" />
          </svg>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider">
            {fallbackLabel ?? "Image unavailable"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-90"}`}
      onLoad={() => setLoaded(true)}
      onError={() => {
        setFailed(true);
        onError?.();
      }}
    />
  );
}
