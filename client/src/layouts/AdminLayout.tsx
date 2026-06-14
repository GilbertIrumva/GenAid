import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { api } from "@/api/client";
import { getUser, logout } from "@/utils/auth";
import { cn } from "@/utils/cn";

interface AdminStats {
  unreadMessages: number;
  pendingUsers: number;
}

/**
 * Lightweight stats query used by the sidebar to show "unread" / "pending"
 * badges. Refetched every 60s so editors don't have to refresh manually.
 */
function useAdminBadges() {
  return useQuery<AdminStats>({
    queryKey: ["admin", "stats-badges"],
    queryFn: async () => {
      const { data } = await api.get<AdminStats>("/admin/stats");
      return data;
    },
    refetchInterval: 60_000,
  });
}

interface NavItem {
  to: string;
  label: string;
  icon: string;
  end?: boolean;
  badge?: number | undefined;
  adminOnly?: boolean;
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const user = getUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: stats } = useAdminBadges();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const nav: NavItem[] = [
    { to: "/admin", label: "Dashboard", icon: "▦", end: true },
    {
      to: "/admin/messages",
      label: "Messages",
      icon: "✉",
      badge: stats?.unreadMessages,
    },
    { to: "/admin/videos", label: "Videos", icon: "▶" },
    { to: "/admin/photos", label: "Photos", icon: "▤" },
    { to: "/admin/programs", label: "Programs", icon: "◇" },
    { to: "/admin/impact", label: "Impact", icon: "▲" },
    { to: "/admin/stories", label: "Stories", icon: "✎" },
    { to: "/admin/partners", label: "Partners", icon: "◈" },
    {
      to: "/admin/users",
      label: "Users",
      icon: "◉",
      badge: stats?.pendingUsers,
      adminOnly: true,
    },
  ];

  const visibleNav = nav.filter((n) => !n.adminOnly || user?.role === "admin");

  return (
    <div className="min-h-screen bg-bg text-ink">
      <Toaster position="top-right" richColors closeButton />

      {/* MOBILE TOP BAR */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-surface px-4 py-3 lg:hidden">
        <Link to="/admin" className="font-display text-base font-bold">
          Generation Aid <span className="text-primary-600">/ admin</span>
        </Link>
        <button
          type="button"
          aria-label="Open admin menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-md border border-line px-3 py-1.5 text-sm"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </header>

      <div className="flex">
        {/* SIDEBAR */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-20 w-64 transform border-r border-line bg-surface transition-transform lg:static lg:translate-x-0",
            mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <div className="hidden h-16 items-center border-b border-line px-6 lg:flex">
            <Link to="/admin" className="font-display text-lg font-bold">
              Generation Aid
              <span className="ml-1 text-primary-600">/ admin</span>
            </Link>
          </div>

          <nav className="space-y-1 p-4" aria-label="Admin">
            {visibleNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-ink/80 hover:bg-bg hover:text-primary-600"
                  )
                }
              >
                <span className="flex items-center gap-3">
                  <span aria-hidden className="text-base text-muted">
                    {item.icon}
                  </span>
                  {item.label}
                </span>
                {item.badge ? (
                  <span className="rounded-full bg-primary-500 px-2 py-0.5 text-xs font-semibold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 border-t border-line p-4">
            {user && (
              <div className="mb-3 text-xs text-muted">
                <div className="truncate font-semibold text-ink">{user.name}</div>
                <div className="truncate">
                  {user.email} <span className="text-line">·</span>{" "}
                  <span className="uppercase">{user.role}</span>
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <Link
                to="/"
                className="flex-1 rounded-md border border-line px-3 py-1.5 text-center text-xs font-semibold text-ink hover:border-primary-300 hover:text-primary-600"
              >
                View site
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink/90"
              >
                Sign out
              </button>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile drawer */}
        {mobileOpen && (
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-10 bg-ink/40 lg:hidden"
          />
        )}

        {/* MAIN */}
        <main className="min-h-screen flex-1 px-4 py-8 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
