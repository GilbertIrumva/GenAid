import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
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

interface DraftPost {
  _id: string;
  title: string;
  slug?: string;
  author: string;
  updatedAt?: string;
  createdAt: string;
}

interface ImpactMetric {
  _id: string;
  title: string;
  value: number;
  icon: string;
  order: number;
}

interface DashboardStats {
  totalUsers: number;
  pendingUsers: number;
  totalMessages: number;
  unreadMessages: number;
  messagesLast30: number;
  messagesPrev30: number;
  totalVideos: number;
  totalPhotos: number;
  totalPosts: number;
  draftPosts: number;
  totalStories: number;
  totalPrograms: number;
  totalPartners: number;
  impactMetrics: ImpactMetric[];
  recentMessages: RecentMessage[];
  draftPostsList: DraftPost[];
}

/**
 * Compact stat tile with optional href.
 */
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
    <div
      className={`rounded-2xl border ${toneClass} p-5 shadow-sm transition-shadow hover:shadow-md`}
    >
      <div className="text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </div>
      <div className="mt-2 font-display text-3xl font-bold text-ink">
        {value}
      </div>
      {hint && <div className="mt-1 text-xs text-muted">{hint}</div>}
    </div>
  );

  return href ? <Link to={href}>{inner}</Link> : inner;
}

function SkeletonCard() {
  return (
    <div className="h-32 animate-pulse rounded-2xl border border-line bg-surface" />
  );
}

/** Format a "time ago" string for recent activity timestamps. */
function timeAgo(
  input: string,
  t: (key: string, opts?: Record<string, unknown>) => string
): string {
  const then = new Date(input).getTime();
  if (Number.isNaN(then)) return "";
  const diffMs = Date.now() - then;
  const mins = Math.round(diffMs / 60_000);
  if (mins < 1) return t("admin.dashboard.justNow");
  if (mins < 60) return t("admin.dashboard.minAgo", { count: mins });
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return t("admin.dashboard.hrAgo", { count: hrs });
  const days = Math.round(hrs / 24);
  if (days < 7) return t("admin.dashboard.dAgo", { count: days });
  return new Date(input).toLocaleDateString();
}

export default function AdminDashboard() {
  const user = getUser();
  const { t } = useTranslation();

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
          {user
            ? t("admin.dashboard.welcomeBack", { name: user.name.split(" ")[0] })
            : t("admin.dashboard.welcome")}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {t("admin.dashboard.quickPeek")}
        </p>
      </header>

      {isError && (
        <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {t("admin.dashboard.failedStatsLoad", { error: (error as Error).message })}
        </div>
      )}

      {/* KPI ROW */}
      <section
        aria-label={t("admin.dashboard.keyMetrics")}
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
              label={t("admin.dashboard.unreadMessages")}
              value={data.unreadMessages}
              hint={t("admin.dashboard.totalDot30d", {
                total: data.totalMessages,
                last30: data.messagesLast30,
              })}
              href="/admin/messages"
              tone={data.unreadMessages > 0 ? "primary" : "default"}
            />
            <StatCard
              label={t("admin.dashboard.draftsInProgress")}
              value={data.draftPosts}
              hint={t("admin.dashboard.postsPublished", { count: data.totalPosts })}
              href="/admin/blog"
              tone={data.draftPosts > 0 ? "warning" : "default"}
            />
            <StatCard
              label={t("admin.dashboard.pendingApprovals")}
              value={data.pendingUsers}
              hint={t("admin.dashboard.totalAccounts", { count: data.totalUsers })}
              href={user?.role === "admin" ? "/admin/users" : undefined}
              tone={data.pendingUsers > 0 ? "warning" : "default"}
            />
            <StatCard
              label={t("admin.dashboard.storiesPublished")}
              value={data.totalStories}
              hint={t("admin.dashboard.programsPartners", {
                programs: data.totalPrograms,
                partners: data.totalPartners,
              })}
              href="/admin/stories"
            />
          </>
        )}
      </section>

      {/* CONTENT OVERVIEW */}
      {data && (
        <section aria-label={t("admin.dashboard.contentOverview")}>
          <h2 className="font-display text-lg font-semibold text-ink">
            {t("admin.dashboard.contentOverview")}
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { label: t("admin.dashboard.posts"), value: data.totalPosts, href: "/admin/blog" },
              { label: t("admin.dashboard.stories"), value: data.totalStories, href: "/admin/stories" },
              { label: t("admin.dashboard.programs"), value: data.totalPrograms, href: "/admin/programs" },
              { label: t("admin.dashboard.partners"), value: data.totalPartners, href: "/admin/partners" },
              { label: t("admin.dashboard.videos"), value: data.totalVideos, href: "/admin/videos" },
              { label: t("admin.dashboard.photos"), value: data.totalPhotos, href: "/admin/photos" },
            ].map((c) => (
              <Link
                key={c.label}
                to={c.href}
                className="rounded-xl border border-line bg-surface p-4 text-center transition hover:border-primary-300 hover:shadow-sm"
              >
                <div className="font-display text-2xl font-bold text-ink">
                  {c.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wide text-muted">
                  {c.label}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* RECENT MESSAGES + DRAFTS */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">
              {t("admin.dashboard.recentMessages")}
            </h2>
            <Link
              to="/admin/messages"
              className="text-xs font-semibold text-primary-600 hover:underline"
            >
              {t("admin.dashboard.viewAllArrow")}
            </Link>
          </div>

          {isLoading ? (
            <div className="mt-4 space-y-2">
              <div className="h-12 animate-pulse rounded-md bg-bg" />
              <div className="h-12 animate-pulse rounded-md bg-bg" />
              <div className="h-12 animate-pulse rounded-md bg-bg" />
            </div>
          ) : !data || data.recentMessages.length === 0 ? (
            <p className="mt-4 text-sm text-muted">{t("admin.dashboard.noMessages")}</p>
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
                        {timeAgo(m.createdAt, t)}
                      </time>
                    </div>
                    <p className="truncate text-sm text-muted">{m.subject}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">
              {t("admin.dashboard.draftsInProgress")}
            </h2>
            <Link
              to="/admin/blog"
              className="text-xs font-semibold text-primary-600 hover:underline"
            >
              {t("admin.dashboard.manageBlog")}
            </Link>
          </div>

          {isLoading ? (
            <div className="mt-4 space-y-2">
              <div className="h-12 animate-pulse rounded-md bg-bg" />
              <div className="h-12 animate-pulse rounded-md bg-bg" />
              <div className="h-12 animate-pulse rounded-md bg-bg" />
            </div>
          ) : !data || data.draftPostsList.length === 0 ? (
            <p className="mt-4 text-sm text-muted">
              {t("admin.dashboard.noDrafts")}
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-line">
              {data.draftPostsList.map((p) => (
                <li key={p._id} className="flex items-center gap-4 py-3">
                  <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-yellow-800">
                    {t("admin.dashboard.draftLabel")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink">{p.title}</p>
                    <p className="truncate text-xs text-muted">
                      {t("admin.dashboard.updatedAgo", {
                        author: p.author,
                        ago: timeAgo(p.updatedAt ?? p.createdAt, t),
                      })}
                    </p>
                  </div>
                  <Link
                    to="/admin/blog"
                    className="flex-none text-xs font-semibold text-primary-600 hover:underline"
                  >
                    {t("admin.dashboard.editArrow")}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* IMPACT METRICS AT A GLANCE */}
      {data && data.impactMetrics.length > 0 && (
        <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">
              {t("admin.dashboard.impactMetricsTitle")}
            </h2>
            <Link
              to="/admin/impact"
              className="text-xs font-semibold text-primary-600 hover:underline"
            >
              {t("admin.dashboard.manage")}
            </Link>
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.impactMetrics.map((m) => (
              <li
                key={m._id}
                className="rounded-xl border border-line bg-bg p-4"
              >
                <div className="font-display text-xl font-bold text-ink">
                  {m.value.toLocaleString()}
                </div>
                <div className="truncate text-xs uppercase tracking-wide text-muted">
                  {m.title}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
