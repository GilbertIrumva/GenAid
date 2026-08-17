import { Link } from "react-router-dom";
import { SITE } from "@/data/site";
import SocialLinks from "@/components/SocialLinks";

export default function JobsFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white transition-colors">
      {/* MAIN CONTENT GRID */}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        {/* BRAND COLUMN */}
        <div className="space-y-4">
          <Link to="/jobs" className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="Generation Jobs logo"
              className="h-10 w-10 shrink-0 rounded-xl border border-slate-700 object-cover shadow-sm"
            />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-400 leading-none">
                Generation Jobs
              </p>
              <p className="text-xs font-semibold text-slate-100 mt-0.5">
                Talent Placement Arm
              </p>
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-slate-300">
            Connecting global employers with vetted, remote-ready professionals trained and supported by Generation Aid in Kakuma Refugee Camp.
          </p>
          <SocialLinks
            className="pt-2"
            itemClassName="text-slate-300 hover:text-brand-400 transition"
          />
        </div>

        {/* JOBS NAVIGATION */}
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider !text-blue-400 dark:!text-blue-400">
            Generation Jobs
          </h4>
          <ul className="mt-3 space-y-2.5 text-sm">
            <li>
              <Link
                to="/jobs"
                className="text-slate-300 hover:text-brand-400 hover:underline underline-offset-4"
              >
                Overview & Initiative
              </Link>
            </li>
            <li>
              <Link
                to="/jobs/talent"
                className="text-slate-300 hover:text-brand-400 hover:underline underline-offset-4"
              >
                Talent & Vetting Model
              </Link>
            </li>
            <li>
              <Link
                to="/jobs/employers"
                className="text-slate-300 hover:text-brand-400 hover:underline underline-offset-4"
              >
                For Employers
              </Link>
            </li>
            <li>
              <Link
                to="/jobs/opportunities"
                className="text-slate-300 hover:text-brand-400 hover:underline underline-offset-4"
              >
                Services & Pricing
              </Link>
            </li>
          </ul>
        </div>

        {/* FOR EMPLOYERS & CANDIDATES */}
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider !text-blue-400 dark:!text-blue-400">
            Hire & Connect
          </h4>
          <ul className="mt-3 space-y-2.5 text-sm">
            <li>
              <Link
                to="/jobs/employers"
                className="text-slate-300 hover:text-brand-400 hover:underline underline-offset-4"
              >
                Hire Remote Talent
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-slate-300 hover:text-brand-400 hover:underline underline-offset-4"
              >
                Book Employer Consultation
              </Link>
            </li>
            <li>
              <a
                href={SITE.donateUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-300 hover:text-brand-400 hover:underline underline-offset-4"
              >
                Support Training Fund
              </a>
            </li>
            <li>
              <Link
                to="/"
                className="inline-flex items-center gap-1 text-brand-400 font-semibold hover:underline underline-offset-4 mt-1"
              >
                ← Back to Generation Aid Main Site
              </Link>
            </li>
          </ul>
        </div>

        {/* HUB & LOCATION INFO */}
        <div className="space-y-3">
          <h4 className="font-display text-sm font-bold uppercase tracking-wider !text-blue-400 dark:!text-blue-400">
            Kakuma Placement Hub
          </h4>
          <p className="text-sm leading-relaxed text-slate-300">
            Generation Aid & Jobs Hub<br />
            Kakuma Refugee Camp, Turkana West, Kenya
          </p>
          <div className="pt-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Direct Inquiries</p>
            <a
              href="mailto:hello@generationaid.org"
              className="text-sm font-semibold text-brand-400 hover:underline"
            >
              hello@generationaid.org
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM LEGAL STRIP */}
      <div className="border-t border-slate-800/80 bg-slate-950 py-6 text-xs text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p>© {currentYear} Generation Jobs by Generation Aid. Refugee-Led Innovation & Global Livelihoods.</p>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:text-slate-200 hover:underline">
              Contact & Inquiries
            </Link>
            <Link to="/" className="hover:text-slate-200 hover:underline">
              Generation Aid Main Site
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
