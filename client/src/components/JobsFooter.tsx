import { Link } from "react-router-dom";
import { SITE } from "@/data/site";
import SocialLinks from "@/components/SocialLinks";

export default function JobsFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-300 dark:border-slate-800 bg-slate-200 dark:bg-slate-900 text-black dark:text-slate-100 transition-colors">
      {/* MAIN CONTENT GRID */}
      <div className="mx-auto grid max-w-7xl gap-8 sm:gap-10 px-4 py-10 sm:py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        {/* BRAND COLUMN */}
        <div className="space-y-4">
          <Link to="/jobs" className="flex items-center gap-3 group">
            <img
              src="/logo.jpg"
              alt="Generation Jobs logo"
              className="h-10 w-10 shrink-0 rounded-xl border border-slate-300 object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-900 dark:text-brand-400 leading-none">
                Generation Jobs
              </p>
              <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                Talent Placement Arm
              </p>
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-slate-900 dark:text-slate-200">
            Connecting global employers with vetted, remote-ready professionals trained and supported by Generation Aid in Kakuma Refugee Camp.
          </p>
          <SocialLinks
            className="pt-2"
            itemClassName="text-slate-900 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          />
        </div>

        {/* JOBS NAVIGATION */}
        <div>
          <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-2 mb-4">
            Generation Jobs
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                to="/jobs"
                className="text-slate-900 dark:text-slate-200 font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors hover:translate-x-1 inline-block"
              >
                Overview & Initiative
              </Link>
            </li>
            <li>
              <Link
                to="/jobs/talent"
                className="text-slate-900 dark:text-slate-200 font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors hover:translate-x-1 inline-block"
              >
                Talent & Vetting Model
              </Link>
            </li>
            <li>
              <Link
                to="/jobs/employers"
                className="text-slate-900 dark:text-slate-200 font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors hover:translate-x-1 inline-block"
              >
                For Employers
              </Link>
            </li>
            <li>
              <Link
                to="/jobs/opportunities"
                className="text-slate-900 dark:text-slate-200 font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors hover:translate-x-1 inline-block"
              >
                Services & Pricing
              </Link>
            </li>
          </ul>
        </div>

        {/* FOR EMPLOYERS & CANDIDATES */}
        <div>
          <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-2 mb-4">
            Hire & Connect
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                to="/jobs/employers"
                className="text-slate-900 dark:text-slate-200 font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors hover:translate-x-1 inline-block"
              >
                Hire Remote Talent
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-slate-900 dark:text-slate-200 font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors hover:translate-x-1 inline-block"
              >
                Book Employer Consultation
              </Link>
            </li>
            <li>
              <a
                href={SITE.donateUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-900 dark:text-slate-200 font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors hover:translate-x-1 inline-block"
              >
                Support Training Fund
              </a>
            </li>
            <li className="pt-2">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-brand-700 dark:text-brand-400 font-bold hover:underline"
              >
                <span>← Back to Generation Aid Main Site</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* HUB & LOCATION INFO */}
        <div className="space-y-4">
          <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-2">
            Kakuma Placement Hub
          </h4>
          <p className="text-sm leading-relaxed text-slate-900 dark:text-slate-200 font-medium">
            Generation Aid & Jobs Hub<br />
            Kakuma Refugee Camp, Turkana West, Kenya
          </p>
          <div className="pt-1">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-400">Direct Inquiries</p>
            <a
              href="mailto:hello@generationaid.org"
              className="text-sm font-bold text-brand-700 dark:text-brand-400 hover:underline"
            >
              hello@generationaid.org
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM LEGAL STRIP */}
      <div className="border-t border-slate-300 dark:border-slate-800 bg-slate-300/80 dark:bg-slate-950 py-6 text-xs text-slate-900 dark:text-slate-300 font-medium">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:text-left sm:flex-row sm:px-6 lg:px-8">
          <p>© {currentYear} Generation Jobs by Generation Aid. Refugee-Led Innovation & Global Livelihoods.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 font-semibold">
            <Link to="/contact" className="hover:text-brand-700 dark:hover:text-white transition-colors">
              Contact & Inquiries
            </Link>
            <Link to="/" className="hover:text-brand-700 dark:hover:text-white transition-colors">
              Generation Aid Main Site
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

