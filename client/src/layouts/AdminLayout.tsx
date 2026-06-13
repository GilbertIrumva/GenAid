import { Link, Outlet, useNavigate } from "react-router-dom";
import { getUser, logout } from "@/utils/auth";

export default function AdminLayout() {
  const navigate = useNavigate();
  const user = getUser();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-display text-lg font-bold text-ink">
              Generation Aid <span className="text-primary-600">/ admin</span>
            </Link>
            <nav className="hidden gap-4 text-sm font-medium text-muted sm:flex">
              <Link to="/admin/videos" className="hover:text-primary-600">
                Videos
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm">
            {user && (
              <span className="hidden text-muted sm:inline">
                {user.name} <span className="text-line">·</span> {user.role}
              </span>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border border-line bg-bg px-3 py-1.5 text-xs font-semibold text-ink hover:border-primary-300 hover:text-primary-600"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
