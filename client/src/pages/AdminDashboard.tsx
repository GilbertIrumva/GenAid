import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import { getUser } from "@/utils/auth";

interface RecentMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  createdAt: string;
  read: boolean;
}

interface DashboardStats {
  totalUsers: number;
  pendingUsers: number;
  totalMessages: number;
  unreadMessages: number;
  totalVideos: number;
  recentMessages: RecentMessage[];
}

function StatCard({
  label,
  value,
  hint,
  href,
  tone = "default",
}: {
  label: string;
  value: number | string;
  hint?: string;
  href?: string;
  tone?: "default" | "warning" | "primary";
}) {
  const toneClass =
    tone === "warning"
      ? "border-amber-200 bg-amber-50"
      : tone === "primary"
      ? "border-primary-200 bg-primary-50"
      : "border-line bg-surface";

  const inner = (
    <div className={`rounded-2xl border ${toneClass} p-5 shadow-sm transition-shadow hover:shadow-md`}>
      <div className="text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </div>
      <div className="mt-2 font-display text-3xl font-bold text-ink">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted">{hint}</div>}
    </div>
  );

  return href ? <Link to={href}>{inner}</Link> : inner;
}

function SkeletonCard() {
  return (
    <div className="h-28 animate-pulse rounded-2xl border border-line bg-surface" />
  );
}

export default function AdminDashboard() {
  const user = getUser();

  const { data, isLoading, isError, error } = useQuery<DashboardStats>({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const { data } = await api.get<DashboardStats>("/admin/stats");
      return data;
    },
  });

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-3xl font-bold text-ink">
          Welcome back{user ? `, ${user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="mt-1 text-sm text-muted">
          A quick look at what's happening across the site.
        </p>
      </header>

      {isError && (
        <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          Failed to load stats: {(error as Error).message}
        </div>
      )}

      <section
        aria-label="Key metrics"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {isLoading || !data ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <StatCard
              label="Unread messages"
              value={data.unreadMessages}
              hint={`${data.totalMessages} total`}
              href="/admin/messages"
              tone={data.unreadMessages > 0 ? "primary" : "default"}
            />
            <StatCard
              label="Pending approvals"
              value={data.pendingUsers}
              hint={`${data.totalUsers} total accounts`}
              href={user?.role === "admin" ? "/admin/users" : undefined}
              tone={data.pendingUsers > 0 ? "warning" : "default"}
            />
            <StatCard
              label="Videos published"
              value={data.totalVideos}
              href="/admin/videos"
            />
            <StatCard
              label="Total staff"
              value={data.totalUsers}
              hint={`${data.totalUsers - data.pendingUsers} active`}
            />
          </>
        )}
      </section>

      <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">
            Recent messages
          </h2>
          <Link
            to="/admin/messages"
            className="text-xs font-semibold text-primary-600 hover:underline"
          >
            View all →
          </Link>
        </div>

        {isLoading ? (
          <div className="mt-4 space-y-2">
            <div className="h-12 animate-pulse rounded-md bg-bg" />
            <div className="h-12 animate-pulse rounded-md bg-bg" />
            <div className="h-12 animate-pulse rounded-md bg-bg" />
          </div>
        ) : !data || data.recentMessages.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No messages yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-line">
            {data.recentMessages.map((m) => (
              <li key={m._id} className="flex items-center gap-4 py-3">
                <span
                  aria-hidden
                  className={`h-2 w-2 flex-none rounded-full ${
                    m.read ? "bg-line" : "bg-primary-500"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="truncate font-semibold text-ink">{m.name}</p>
                    <time
                      dateTime={m.createdAt}
                      className="flex-none text-xs text-muted"
                    >
                      {new Date(m.createdAt).toLocaleDateString()}
                    </time>
                  </div>
                  <p className="truncate text-sm text-muted">{m.subject}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
