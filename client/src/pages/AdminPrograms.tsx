import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { api } from "@/api/client";
import { cn } from "@/utils/cn";

interface Program {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  createdAt: string;
}

interface ProgramForm {
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
}

const EMPTY: ProgramForm = {
  title: "",
  description: "",
  image: "",
  category: "",
  featured: false,
};

function getErrorMessage(err: unknown, fallback: string): string {
  const e = err as { response?: { data?: { error?: string } }; message?: string };
  return e.response?.data?.error ?? e.message ?? fallback;
}

export default function AdminPrograms() {
  const qc = useQueryClient();
  const { t } = useTranslation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProgramForm>(EMPTY);
  const [search, setSearch] = useState("");

  const { data: programs = [], isLoading } = useQuery<Program[]>({
    queryKey: ["admin", "programs"],
    queryFn: async () => {
      const { data } = await api.get<Program[]>("/programs");
      return data;
    },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return programs;
    return programs.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [programs, search]);

  // Hydrate form when selecting a program to edit.
  useEffect(() => {
    if (!editingId) {
      setForm(EMPTY);
      return;
    }
    const p = programs.find((x) => x._id === editingId);
    if (p) {
      setForm({
        title: p.title,
        description: p.description,
        image: p.image ?? "",
        category: p.category,
        featured: Boolean(p.featured),
      });
    }
  }, [editingId, programs]);

  function invalidate() {
    qc.invalidateQueries({ queryKey: ["admin", "programs"] });
    qc.invalidateQueries({ queryKey: ["public", "programs"] });
  }

  const create = useMutation({
    mutationFn: async (payload: ProgramForm) => {
      const { data } = await api.post<Program>("/programs", payload);
      return data;
    },
    onSuccess: () => {
      toast.success(t("admin.programs.created"));
      setForm(EMPTY);
      invalidate();
    },
    onError: (err) => toast.error(getErrorMessage(err, t("admin.programs.createFailed"))),
  });

  const update = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: ProgramForm }) => {
      const { data } = await api.put<Program>(`/programs/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      toast.success(t("admin.programs.updated"));
      setEditingId(null);
      invalidate();
    },
    onError: (err) => toast.error(getErrorMessage(err, t("admin.programs.updateFailed"))),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/programs/${id}`);
    },
    onSuccess: () => {
      toast.success(t("admin.programs.deleted"));
      if (editingId) setEditingId(null);
      invalidate();
    },
    onError: (err) => toast.error(getErrorMessage(err, t("admin.programs.deleteFailed"))),
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
        <h1 className="font-display text-3xl font-bold text-ink">{t("admin.programs.title")}</h1>
        <p className="mt-1 text-sm text-muted">
          {t("admin.programs.pageSubtitle")}
        </p>
      </header>

      {/* FORM */}
      <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">
            {isEditing ? t("admin.programs.editProgram") : t("admin.programs.addNew")}
          </h2>
          {isEditing && (
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="text-xs font-semibold text-muted hover:text-ink"
            >
              {t("admin.programs.cancelEdit")}
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="md:col-span-2">
            <span className="block text-sm font-semibold text-ink">{t("admin.common.title")}</span>
            <input
              required
              minLength={2}
              maxLength={160}
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label>
            <span className="block text-sm font-semibold text-ink">{t("admin.common.category")}</span>
            <input
              required
              minLength={2}
              maxLength={80}
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value }))
              }
              placeholder={t("admin.programs.categoryPlaceholder")}
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label>
            <span className="block text-sm font-semibold text-ink">
              {t("admin.programs.imageUrl")} <span className="font-normal text-muted">({t("admin.common.optional")})</span>
            </span>
            <input
              type="url"
              value={form.image}
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              placeholder="https://…"
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label className="md:col-span-2">
            <span className="block text-sm font-semibold text-ink">{t("admin.common.description")}</span>
            <textarea
              required
              minLength={5}
              maxLength={5000}
              rows={5}
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label className="flex items-center gap-2 md:col-span-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                setForm((f) => ({ ...f, featured: e.target.checked }))
              }
              className="h-4 w-4 rounded border-line text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-ink">{t("admin.programs.featureOnHome")}</span>
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
                ? t("admin.programs.saveChanges")
                : t("admin.programs.createProgram")}
            </button>
          </div>
        </form>
      </section>

      {/* LIST */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-lg font-semibold text-ink">
            {t("admin.programs.existing")}
          </h2>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("admin.programs.searchPlaceholder")}
            className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-primary-500 sm:w-64"
          />
        </div>

        {isLoading ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="h-44 animate-pulse rounded-2xl border border-line bg-surface" />
            <div className="h-44 animate-pulse rounded-2xl border border-line bg-surface" />
            <div className="h-44 animate-pulse rounded-2xl border border-line bg-surface" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="mt-4 text-sm text-muted">{t("admin.programs.noPrograms")}</p>
        ) : (
          <ul className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <li
                key={p._id}
                className={cn(
                  "flex flex-col overflow-hidden rounded-2xl border bg-surface shadow-sm",
                  editingId === p._id ? "border-primary-400" : "border-line"
                )}
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt=""
                    className="aspect-video w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-bg text-xs text-muted">
                    {t("admin.programs.noImage")}
                  </div>
                )}
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-sm font-semibold text-ink">
                      {p.title}
                    </h3>
                    {p.featured && (
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                        {t("admin.programs.featuredBadge")}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-wide text-primary-600">
                    {p.category}
                  </p>
                  <p className="mt-2 line-clamp-3 flex-1 text-xs text-muted">
                    {p.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setEditingId(p._id)}
                      className="rounded-md border border-line bg-surface px-3 py-1 font-semibold text-ink hover:border-primary-300 hover:text-primary-600"
                    >
                      {t("admin.common.edit")}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(t("admin.programs.confirmDelete", { title: p.title }))) remove.mutate(p._id);
                      }}
                      disabled={remove.isPending}
                      className="font-semibold text-red-600 hover:text-red-700"
                    >
                      {t("admin.common.delete")}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
