import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { api } from "@/api/client";
import { cn } from "@/utils/cn";

interface ImpactMetric {
  _id: string;
  title: string;
  value: number;
  icon: string;
  order: number;
}

interface MetricForm {
  title: string;
  value: number;
  icon: string;
  order: number;
}

const EMPTY: MetricForm = { title: "", value: 0, icon: "", order: 0 };

function getErrorMessage(err: unknown, fallback: string): string {
  const e = err as { response?: { data?: { error?: string } }; message?: string };
  return e.response?.data?.error ?? e.message ?? fallback;
}

export default function AdminImpact() {
  const qc = useQueryClient();
  const { t } = useTranslation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<MetricForm>(EMPTY);
  const [search, setSearch] = useState("");

  const { data: metrics = [], isLoading } = useQuery<ImpactMetric[]>({
    queryKey: ["admin", "impact"],
    queryFn: async () => {
      const { data } = await api.get<ImpactMetric[]>("/impact");
      return data;
    },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return metrics;
    return metrics.filter((m) => m.title.toLowerCase().includes(q));
  }, [metrics, search]);

  useEffect(() => {
    if (!editingId) {
      setForm(EMPTY);
      return;
    }
    const m = metrics.find((x) => x._id === editingId);
    if (m) {
      setForm({
        title: m.title,
        value: m.value,
        icon: m.icon ?? "",
        order: m.order ?? 0,
      });
    }
  }, [editingId, metrics]);

  function invalidate() {
    qc.invalidateQueries({ queryKey: ["admin", "impact"] });
    qc.invalidateQueries({ queryKey: ["public", "impact"] });
  }

  const create = useMutation({
    mutationFn: async (payload: MetricForm) => {
      const { data } = await api.post<ImpactMetric>("/impact", payload);
      return data;
    },
    onSuccess: () => {
      toast.success(t("admin.impact.created"));
      setForm(EMPTY);
      invalidate();
    },
    onError: (err) => toast.error(getErrorMessage(err, t("admin.impact.createFailed"))),
  });

  const update = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: MetricForm }) => {
      const { data } = await api.put<ImpactMetric>(`/impact/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      toast.success(t("admin.impact.updated"));
      setEditingId(null);
      invalidate();
    },
    onError: (err) => toast.error(getErrorMessage(err, t("admin.impact.updateFailed"))),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/impact/${id}`);
    },
    onSuccess: () => {
      toast.success(t("admin.impact.deleted"));
      if (editingId) setEditingId(null);
      invalidate();
    },
    onError: (err) => toast.error(getErrorMessage(err, t("admin.impact.deleteFailed"))),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingId) update.mutate({ id: editingId, payload: form });
    else create.mutate(form);
  }

  const isEditing = Boolean(editingId);
  const isPending = create.isPending || update.isPending;

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-3xl font-bold text-ink">{t("admin.impact.title")}</h1>
        <p className="mt-1 text-sm text-muted">
          {t("admin.impact.pageSubtitle")}
        </p>
      </header>

      {/* FORM */}
      <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">
            {isEditing ? t("admin.impact.editMetric") : t("admin.impact.addNew")}
          </h2>
          {isEditing && (
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="text-xs font-semibold text-muted hover:text-ink"
            >
              {t("admin.impact.cancelEdit")}
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="md:col-span-2">
            <span className="block text-sm font-semibold text-ink">{t("admin.common.label")}</span>
            <input
              required
              minLength={2}
              maxLength={120}
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder={t("admin.impact.labelPlaceholder")}
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label>
            <span className="block text-sm font-semibold text-ink">{t("admin.impact.value")}</span>
            <input
              type="number"
              required
              min={0}
              value={form.value}
              onChange={(e) =>
                setForm((f) => ({ ...f, value: Number(e.target.value) }))
              }
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label>
            <span className="block text-sm font-semibold text-ink">
              {t("admin.impact.displayOrder")}
            </span>
            <input
              type="number"
              value={form.order}
              onChange={(e) =>
                setForm((f) => ({ ...f, order: Number(e.target.value) }))
              }
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label className="md:col-span-2">
            <span className="block text-sm font-semibold text-ink">
              {t("admin.impact.icon")} <span className="font-normal text-muted">({t("admin.common.optional")})</span>
            </span>
            <input
              maxLength={8}
              value={form.icon}
              onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
              placeholder={t("admin.impact.iconPlaceholder")}
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-60"
            >
              {isPending
                ? t("admin.common.saving")
                : isEditing
                ? t("admin.impact.saveChanges")
                : t("admin.impact.createMetric")}
            </button>
          </div>
        </form>
      </section>

      {/* LIST */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-lg font-semibold text-ink">
            {t("admin.impact.existing")}
          </h2>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("admin.impact.searchPlaceholder")}
            className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-primary-500 sm:w-64"
          />
        </div>

        {isLoading ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-2xl border border-line bg-surface"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="mt-4 text-sm text-muted">{t("admin.impact.noMetrics")}</p>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filtered
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((m) => (
                <li
                  key={m._id}
                  className={cn(
                    "flex flex-col rounded-2xl border bg-surface p-5 shadow-sm",
                    editingId === m._id ? "border-primary-400" : "border-line"
                  )}
                >
                  {m.icon && (
                    <div className="text-2xl" aria-hidden="true">
                      {m.icon}
                    </div>
                  )}
                  <div className="mt-2 font-display text-3xl font-bold text-brand-red-600">
                    {m.value.toLocaleString()}
                  </div>
                  <p className="mt-1 text-sm font-medium text-ink">{m.title}</p>
                  <p className="mt-1 text-xs text-muted">{t("admin.impact.orderLabel", { order: m.order })}</p>
                  <div className="mt-4 flex items-center justify-between gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setEditingId(m._id)}
                      className="rounded-md border border-line bg-surface px-3 py-1 font-semibold text-ink hover:border-primary-300 hover:text-primary-600"
                    >
                      {t("admin.common.edit")}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(t("admin.impact.confirmDelete", { title: m.title }))) remove.mutate(m._id);
                      }}
                      disabled={remove.isPending}
                      className="font-semibold text-red-600 hover:text-red-700"
                    >
                      {t("admin.common.delete")}
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
}
