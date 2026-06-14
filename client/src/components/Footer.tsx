import { Link } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";
import { SITE } from "@/data/site";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  const loggedIn = isAuthenticated();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <img
              src="/logo.jpg"
              alt="Generation Aid"
              className="h-10 w-10 rounded-md object-contain"
            />
            <span className="font-display text-xl font-semibold text-ink">Generation Aid</span>
          </div>
          <p className="mt-3 text-sm text-muted">
            Reskilling &amp; promoting education for refugees, creating quality job
            opportunities and bringing them into the global community.
          </p>
          <SocialLinks className="mt-5" />
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-ink">
            Explore
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/about" className="text-muted hover:text-primary-600">About</Link></li>
            <li><Link to="/programs" className="text-muted hover:text-primary-600">Programs</Link></li>
            <li><Link to="/impact" className="text-muted hover:text-primary-600">Impact</Link></li>
            <li><Link to="/stories" className="text-muted hover:text-primary-600">Stories</Link></li>
            <li><Link to="/blog" className="text-muted hover:text-primary-600">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-ink">
            Get involved
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={SITE.donateUrl}
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-primary-600"
              >
                Donate via GlobalGiving
              </a>
            </li>
            <li><Link to="/partners" className="text-muted hover:text-primary-600">Partners</Link></li>
            <li><Link to="/contact" className="text-muted hover:text-primary-600">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-ink">
            Contact
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>{SITE.address}</li>
            <li>
              <span className="font-semibold text-ink">Kenya:</span>{" "}
              <a href={`tel:${SITE.phoneKenya.replace(/\s+/g, "")}`} className="hover:text-primary-600">
                {SITE.phoneKenya}
              </a>
            </li>
            <li>
              <span className="font-semibold text-ink">International:</span>{" "}
              <a href={`tel:${SITE.phoneInternational.replace(/\s+/g, "")}`} className="hover:text-primary-600">
                {SITE.phoneInternational}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-primary-600">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-center text-xs text-muted sm:flex-row sm:px-6 lg:px-8">
          <span>
            &copy; {new Date().getFullYear()} Generation Aid. All rights reserved.
          </span>
          <Link
            to={loggedIn ? "/admin" : "/login"}
            className="font-semibold text-muted hover:text-primary-600"
          >
            {loggedIn ? "Admin dashboard" : "Staff portal"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
