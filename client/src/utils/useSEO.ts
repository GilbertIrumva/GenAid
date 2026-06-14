import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description?: string;
  /** Absolute or path-only canonical URL. */
  canonical?: string;
  /** Absolute URL to share image for OG / Twitter. */
  image?: string;
  /** "website" | "article" | etc. */
  type?: string;
}

const DEFAULT_DESCRIPTION =
  "Generation Aid empowers refugee-led innovation, education, and economic opportunity in Kakuma.";
const DEFAULT_IMAGE = "/logo.jpg";
const SITE_NAME = "Generation Aid";

function upsertMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Sets per-page <title> and SEO/social meta tags. SPA-friendly — re-runs
 * whenever the options change and cleans nothing on unmount (next page sets
 * its own values, which is the correct behaviour for SEO crawlers).
 */
export function useSEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  image = DEFAULT_IMAGE,
  type = "website",
}: SEOOptions) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:image", image);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    const href =
      canonical ??
      (typeof window !== "undefined" ? window.location.href : "");
    if (href) {
      upsertLink("canonical", href);
      upsertMeta("property", "og:url", href);
    }
  }, [title, description, canonical, image, type]);
}
