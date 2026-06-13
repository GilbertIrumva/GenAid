import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/utils/cn";
import { SITE } from "@/data/site";
import { isAuthenticated } from "@/utils/auth";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "programs", label: "Programs" },
  { id: "causes", label: "Causes" },
  { id: "impact", label: "Impact" },
  { id: "team", label: "Team" },
  { id: "stories", label: "Stories" },
  { id: "videos", label: "Videos" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";
  const loggedIn = isAuthenticated();
  const portalHref = loggedIn ? "/admin/videos" : "/login";
  const portalLabel = loggedIn ? "Admin" : "Staff portal";

  function handleNavClick(id: string) {
    setOpen(false);
    if (onHome) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/#" + id);
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img
            src="/logo.jpg"
            alt="Generation Aid"
            className="h-10 w-10 rounded-md object-contain"
          />
          <span className="font-display text-xl font-semibold text-ink">Generation Aid</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-primary-600"
            >
              {item.label}
            </button>
          ))}
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              cn(
                "text-sm font-medium transition-colors hover:text-primary-600",
                isActive ? "text-primary-600" : "text-ink/80"
              )
            }
          >
            Blog
          </NavLink>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <NavLink
            to={portalHref}
            className={({ isActive }) =>
              cn(
                "text-sm font-medium transition-colors hover:text-primary-600",
                isActive ? "text-primary-600" : "text-ink/80"
              )
            }
          >
            {portalLabel}
          </NavLink>
          <a
            href={SITE.donateUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-ink shadow-sm transition hover:bg-accent-600 hover:text-white"
          >
            Donate
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="rounded-md p-2 text-ink lg:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-surface lg:hidden">
          <div className="space-y-1 px-4 py-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-ink/80 hover:bg-bg"
                )}
              >
                {item.label}
              </button>
            ))}
            <NavLink
              to="/blog"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "block rounded-md px-3 py-2 text-sm font-medium",
                  isActive ? "bg-primary-50 text-primary-600" : "text-ink/80 hover:bg-bg"
                )
              }
            >
              Blog
            </NavLink>
            <NavLink
              to={portalHref}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "block rounded-md px-3 py-2 text-sm font-medium",
                  isActive ? "bg-primary-50 text-primary-600" : "text-ink/80 hover:bg-bg"
                )
              }
            >
              {portalLabel}
            </NavLink>
            <a
              href={SITE.donateUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 block w-full rounded-md bg-accent-500 px-4 py-2 text-center text-sm font-semibold text-ink"
            >
              Donate
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
