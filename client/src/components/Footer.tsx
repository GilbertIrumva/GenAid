import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SITE } from "@/data/site";
import SocialLinks from "@/components/SocialLinks";
import { GenerationAidLogo } from "@/components/Logo";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-brand-800 dark:border-slate-800 bg-brand-900 dark:bg-slate-950 text-white transition-colors rounded-t-3xl sm:rounded-t-[2.5rem] overflow-hidden">
      {/* MAIN GRID */}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Link
            to="/"
            className="flex items-center gap-3"
            aria-label="Generation Aid home"
          >
            <GenerationAidLogo textClassName="text-white" />
          </Link>
          <p className="mt-4 text-sm text-brand-100 dark:text-slate-300">{t("footer.tagline")}</p>
          <SocialLinks className="mt-5" itemClassName="text-brand-100 dark:text-slate-300 hover:text-white dark:hover:text-brand-400 transition" />
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-blue-400 dark:text-blue-400">
            {t("footer.explore")}
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/about" className="text-brand-100 dark:text-slate-300 hover:text-white dark:hover:text-brand-400 hover:underline underline-offset-4">
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link
                to="/programs"
                className="text-brand-100 dark:text-slate-300 hover:text-white dark:hover:text-brand-400 hover:underline underline-offset-4"
              >
                {t("nav.programs")}
              </Link>
            </li>
            <li>
              <Link to="/impact" className="text-brand-100 dark:text-slate-300 hover:text-white dark:hover:text-brand-400 hover:underline underline-offset-4">
                {t("nav.impact")}
              </Link>
            </li>
            <li>
              <Link to="/stories" className="text-brand-100 dark:text-slate-300 hover:text-white dark:hover:text-brand-400 hover:underline underline-offset-4">
                {t("nav.stories")}
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-brand-100 dark:text-slate-300 hover:text-white dark:hover:text-brand-400 hover:underline underline-offset-4">
                {t("nav.blog")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-blue-400 dark:text-blue-400">
            {t("footer.getInvolved")}
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                to="/volunteer"
                className="text-brand-100 dark:text-slate-300 hover:text-white dark:hover:text-brand-400 hover:underline underline-offset-4"
              >
                Volunteer & Internship
              </Link>
            </li>
            <li>
              <Link
                to="/jobs/employers"
                className="text-brand-100 dark:text-slate-300 hover:text-white dark:hover:text-brand-400 hover:underline underline-offset-4"
              >
                Hire a Refugee
              </Link>
            </li>
            <li>
              <a
                href={SITE.donateUrl}
                target="_blank"
                rel="noreferrer"
                className="text-brand-100 dark:text-slate-300 hover:text-white dark:hover:text-brand-400 hover:underline underline-offset-4"
              >
                {t("footer.donateGlobalGiving")}
              </a>
            </li>
            <li>
              <Link
                to="/partners"
                className="text-brand-100 dark:text-slate-300 hover:text-white dark:hover:text-brand-400 hover:underline underline-offset-4"
              >
                {t("nav.partners")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-blue-400 dark:text-blue-400">
            {t("footer.contact")}
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-brand-100 dark:text-slate-300">
            <li>{t("common.address", SITE.address)}</li>
            <li>
              <span className="font-semibold text-white">
                {t("footer.kenya")}
              </span>{" "}
              <a
                href={`tel:${SITE.phoneKenya.replace(/\s+/g, "")}`}
                className="hover:text-white dark:hover:text-brand-400 hover:underline underline-offset-4"
              >
                {SITE.phoneKenya}
              </a>
            </li>
            <li>
              <span className="font-semibold text-white">
                {t("footer.international")}
              </span>{" "}
              <a
                href={`tel:${SITE.phoneInternational.replace(/\s+/g, "")}`}
                className="hover:text-white dark:hover:text-brand-400 hover:underline underline-offset-4"
              >
                {SITE.phoneInternational}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="hover:text-white dark:hover:text-brand-400 hover:underline underline-offset-4"
              >
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800 dark:border-slate-800 bg-brand-950/80 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-center text-xs text-brand-200 dark:text-slate-400 sm:flex-row sm:px-6 lg:px-8">
          <span>
            &copy; {new Date().getFullYear()} Generation Aid.{" "}
            {t("footer.rights")}
          </span>
        </div>
      </div>
    </footer>
  );
}
