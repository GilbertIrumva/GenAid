import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isAuthenticated } from "@/utils/auth";
import { SITE } from "@/data/site";
import SocialLinks from "@/components/SocialLinks";
import SmartImage from "@/components/SmartImage";

export default function Footer() {
  const loggedIn = isAuthenticated();
  const { t } = useTranslation();

  return (
    <footer className="relative isolate overflow-hidden bg-[#0b1729] text-white/80">
      {/* Background photo — same treatment as the Impact hero.
          We darken the image further in dark mode so the gradient overlay
          doesn't get overpowered by the photo's highlights. */}
      <SmartImage
        src="/img/site/bg.jpg"
        alt=""
        fallbackLabel=""
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-90 dark:opacity-70"
      />
      {/* Wash overlay. Uses literal `#0b1729` (the light-mode `ink` color) so
          the dark backdrop stays dark when the user switches to dark mode —
          previously this used the semantic `ink` token which flips to a near-
          white tint in dark mode, blowing out the photo's exposure. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary-900/95 via-[#0b1729]/85 to-[#0b1729]/75 dark:from-black/90 dark:via-black/85 dark:to-black/80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle_at_top_right,theme(colors.primary.400),transparent_60%)] dark:opacity-15"
      />

      {/* MAIN GRID */}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-3" aria-label="Generation Aid home">
            <img
              src="/logo.jpg"
              alt="Generation Aid"
              className="h-12 w-12 rounded-md object-contain ring-1 ring-white/20"
            />
            <span className="font-display text-xl font-semibold text-white">
              Generation Aid
            </span>
          </Link>
          <p className="mt-4 text-sm text-white/70">
            {t("footer.tagline")}
          </p>
          <SocialLinks className="mt-5" />
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-200">
            {t("footer.explore")}
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/about" className="text-white/70 hover:text-white">{t("nav.about")}</Link></li>
            <li><Link to="/programs" className="text-white/70 hover:text-white">{t("nav.programs")}</Link></li>
            <li><Link to="/impact" className="text-white/70 hover:text-white">{t("nav.impact")}</Link></li>
            <li><Link to="/stories" className="text-white/70 hover:text-white">{t("nav.stories")}</Link></li>
            <li><Link to="/blog" className="text-white/70 hover:text-white">{t("nav.blog")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-200">
            {t("footer.getInvolved")}
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={SITE.donateUrl}
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-white"
              >
                {t("footer.donateGlobalGiving")}
              </a>
            </li>
            <li><Link to="/partners" className="text-white/70 hover:text-white">{t("nav.partners")}</Link></li>
            <li><Link to="/contact" className="text-white/70 hover:text-white">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-200">
            {t("footer.contact")}
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>{t("common.address", SITE.address)}</li>
            <li>
              <span className="font-semibold text-white">{t("footer.kenya")}</span>{" "}
              <a href={`tel:${SITE.phoneKenya.replace(/\s+/g, "")}`} className="hover:text-white">
                {SITE.phoneKenya}
              </a>
            </li>
            <li>
              <span className="font-semibold text-white">{t("footer.international")}</span>{" "}
              <a href={`tel:${SITE.phoneInternational.replace(/\s+/g, "")}`} className="hover:text-white">
                {SITE.phoneInternational}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-center text-xs text-white/60 sm:flex-row sm:px-6 lg:px-8">
          <span>
            &copy; {new Date().getFullYear()} Generation Aid. {t("footer.rights")}
          </span>
          <Link
            to={loggedIn ? "/admin" : "/login"}
            className="font-semibold text-white/70 hover:text-white"
          >
            {loggedIn ? t("footer.adminDashboard") : t("nav.staffPortal")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
