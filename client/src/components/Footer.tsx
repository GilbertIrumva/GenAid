import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SITE } from "@/data/site";
import SocialLinks from "@/components/SocialLinks";
import { GenerationAidLogo } from "@/components/Logo";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-300 dark:border-slate-800 bg-slate-200 dark:bg-slate-900 text-black dark:text-slate-100 transition-colors">
      {/* MAIN GRID */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-3"
            aria-label="Generation Aid home"
          >
            <GenerationAidLogo textClassName="text-slate-900 dark:text-white" />
          </Link>
          <p className="text-sm leading-relaxed text-slate-900 dark:text-slate-200">{t("footer.tagline")}</p>
          <SocialLinks className="pt-2" itemClassName="text-slate-900 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" />
        </div>

        <div>
          <h4 className="font-serif text-xs font-extrabold uppercase tracking-widest text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-2 mb-4">
            {t("footer.explore")}
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/about" className="text-slate-900 dark:text-slate-200 font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors hover:translate-x-1 inline-block">
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link
                to="/programs"
                className="text-slate-900 dark:text-slate-200 font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors hover:translate-x-1 inline-block"
              >
                {t("nav.programs")}
              </Link>
            </li>
            <li>
              <Link to="/impact" className="text-slate-900 dark:text-slate-200 font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors hover:translate-x-1 inline-block">
                {t("nav.impact")}
              </Link>
            </li>
            <li>
              <Link to="/stories" className="text-slate-900 dark:text-slate-200 font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors hover:translate-x-1 inline-block">
                {t("nav.stories")}
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-slate-900 dark:text-slate-200 font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors hover:translate-x-1 inline-block">
                {t("nav.blog")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-xs font-extrabold uppercase tracking-widest text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-2 mb-4">
            {t("footer.getInvolved")}
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                to="/volunteer"
                className="text-slate-900 dark:text-slate-200 font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors hover:translate-x-1 inline-block"
              >
                Volunteer & Internship
              </Link>
            </li>
            <li>
              <Link
                to="/jobs/employers"
                className="text-slate-900 dark:text-slate-200 font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors hover:translate-x-1 inline-block"
              >
                Hire a Refugee
              </Link>
            </li>
            <li>
              <a
                href={SITE.donateUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-900 dark:text-slate-200 font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors hover:translate-x-1 inline-block"
              >
                {t("footer.donateGlobalGiving")}
              </a>
            </li>
            <li>
              <Link
                to="/partners"
                className="text-slate-900 dark:text-slate-200 font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors hover:translate-x-1 inline-block"
              >
                {t("nav.partners")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-2 mb-4">
            {t("footer.contact")}
          </h4>
          <ul className="space-y-2.5 text-sm text-slate-900 dark:text-slate-200">
            <li className="leading-relaxed font-medium">{t("common.address", SITE.address)}</li>
            <li>
              <span className="font-bold text-slate-900 dark:text-white">
                {t("footer.kenya")}
              </span>{" "}
              <a
                href={`tel:${SITE.phoneKenya.replace(/\s+/g, "")}`}
                className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium"
              >
                {SITE.phoneKenya}
              </a>
            </li>
            <li>
              <span className="font-bold text-slate-900 dark:text-white">
                {t("footer.international")}
              </span>{" "}
              <a
                href={`tel:${SITE.phoneInternational.replace(/\s+/g, "")}`}
                className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium"
              >
                {SITE.phoneInternational}
              </a>
            </li>
            <li className="pt-1">
              <a
                href={`mailto:${SITE.email}`}
                className="text-brand-700 dark:text-brand-400 font-bold hover:underline"
              >
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-300 dark:border-slate-800 bg-slate-300/80 dark:bg-slate-950 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center text-xs text-slate-900 dark:text-slate-300 font-medium sm:flex-row sm:px-6 lg:px-8">
          <span>
            &copy; {new Date().getFullYear()} Generation Aid.{" "}
            {t("footer.rights")}
          </span>
          <div className="flex gap-6 font-semibold">
            <Link to="/about" className="hover:text-brand-700 dark:hover:text-white transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-brand-700 dark:hover:text-white transition-colors">Contact</Link>
            <Link to="/jobs" className="hover:text-brand-700 dark:hover:text-white transition-colors">Generation Jobs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

