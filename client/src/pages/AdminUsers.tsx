import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { api } from "@/api/client";
import { getUser } from "@/utils/auth";
import { cn } from "@/utils/cn";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  approved: boolean;
  createdAt: string;
}

function getErrorMessage(err: unknown, fallback: string): string {
  const e = err as { response?: { data?: { error?: string } }; message?: string };
  return e.response?.data?.error ?? e.message ?? fallback;
}

export default function AdminUsers() {
  const qc = useQueryClient();
  const me = getUser();
  const { t } = useTranslation();
  const [search, setSearch] = useState("");

  const { data: users = [], isLoading } = useQuery<AdminUser[]>({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const { data } = await api.get<AdminUser[]>("/admin/users");
      return data;
    },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
  }, [users, search]);

  function invalidate() {
    qc.invalidateQueries({ queryKey: ["admin", "users"] });
    qc.invalidateQueries({ queryKey: ["admin", "stats"] });
    qc.invalidateQueries({ queryKey: ["admin", "stats-badges"] });
  }

  const update = useMutation({
    mutationFn: async ({
      id,
      patch,
    }: {
      id: string;
      patch: Partial<Pick<AdminUser, "role" | "approved" | "name">>;
    }) => {
      const { data } = await api.patch<AdminUser>(`/admin/users/${id}`, patch);
      return data;
    },
    onSuccess: () => {
      toast.success(t("admin.users.userUpdated"));
      invalidate();
    },
    onError: (err) => toast.error(getErrorMessage(err, t("admin.users.updateFailed"))),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/users/${id}`);
    },
    onSuccess: () => {
      toast.success(t("admin.users.userDeleted"));
      invalidate();
    },
    onError: (err) => toast.error(getErrorMessage(err, t("admin.users.deleteFailed"))),
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-bold text-ink">{t("admin.users.title")}</h1>
        <p className="mt-1 text-sm text-muted">
          {t("admin.users.pageSubtitle")}
        </p>
      </header>

      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t("admin.users.searchPlaceholder")}
        className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-primary-500 sm:max-w-md"
      />

      <section className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
        {isLoading ? (
          <div className="space-y-px p-4">
            <div className="h-12 animate-pulse rounded-md bg-bg" />
            <div className="h-12 animate-pulse rounded-md bg-bg" />
            <div className="h-12 animate-pulse rounded-md bg-bg" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted">{t("admin.users.noUsersFound")}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-bg/60 text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">{t("admin.users.colName")}</th>
                  <th className="px-4 py-3 font-semibold">{t("admin.users.colEmail")}</th>
                  <th className="px-4 py-3 font-semibold">{t("admin.users.colRole")}</th>
                  <th className="px-4 py-3 font-semibold">{t("admin.users.colStatus")}</th>
                  <th className="px-4 py-3 font-semibold">{t("admin.users.colJoined")}</th>
                  <th className="px-4 py-3 font-semibold text-right">{t("admin.users.colActions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((u) => {
                  const isSelf = me?.id === u._id;
                  return (
                    <tr key={u._id} className="hover:bg-bg/40">
                      <td className="px-4 py-3 font-medium text-ink">
                        {u.name}
                        {isSelf && (
                          <span className="ml-2 rounded-full bg-primary-50 px-2 py-0.5 text-xs font-semibold text-primary-700">
                            {t("admin.users.you")}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted">{u.email}</td>
                      <td className="px-4 py-3">
                        <select
                          value={u.role}
                          onChange={(e) =>
                            update.mutate({
                              id: u._id,
                              patch: { role: e.target.value as "admin" | "editor" },
                            })
                          }
                          disabled={isSelf || update.isPending}
                          className="rounded-md border border-line bg-surface px-2 py-1 text-xs font-semibold uppercase outline-none focus:border-primary-500 disabled:opacity-60"
                        >
                          <option value="editor">{t("admin.users.editor")}</option>
                          <option value="admin">{t("admin.users.admin")}</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-semibold",
                            u.approved
                              ? "bg-green-50 text-green-700"
                              : "bg-amber-50 text-amber-700"
                          )}
                        >
                          {u.approved ? t("admin.users.approved") : t("admin.users.pendingShort")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          {!u.approved && (
                            <button
                              type="button"
                              onClick={() =>
                                update.mutate({
                                  id: u._id,
                                  patch: { approved: true },
                                })
                              }
                              disabled={update.isPending}
                              className="rounded-md bg-primary-500 px-3 py-1 text-xs font-semibold text-white hover:bg-primary-600"
                            >
                              {t("admin.users.approve")}
                            </button>
                          )}
                          {u.approved && (
                            <button
                              type="button"
                              onClick={() =>
                                update.mutate({
                                  id: u._id,
                                  patch: { approved: false },
                                })
                              }
                              disabled={isSelf || update.isPending}
                              className="rounded-md border border-line bg-surface px-3 py-1 text-xs font-semibold text-ink hover:border-amber-300 disabled:opacity-60"
                            >
                              {t("admin.users.suspend")}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              if (
                                confirm(
                                  t("admin.users.confirmDelete", { name: u.name })
                                )
                              ) {
                                remove.mutate(u._id);
                              }
                            }}
                            disabled={isSelf || remove.isPending}
                            className="rounded-md border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
                          >
                            {t("admin.common.delete")}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
