import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/api/client";
import { cn } from "@/utils/cn";

interface Partner {
  _id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
}

interface PartnerForm {
  name: string;
  logo: string;
  website: string;
  description: string;
}

const EMPTY: PartnerForm = { name: "", logo: "", website: "", description: "" };

function getErrorMessage(err: unknown, fallback: string): string {
  const e = err as { response?: { data?: { error?: string } }; message?: string };
  return e.response?.data?.error ?? e.message ?? fallback;
}

export default function AdminPartners() {
  const qc = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PartnerForm>(EMPTY);
  const [search, setSearch] = useState("");

  const { data: partners = [], isLoading } = useQuery<Partner[]>({
    queryKey: ["admin", "partners"],
    queryFn: async () => {
      const { data } = await api.get<Partner[]>("/partners");
      return data;
    },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return partners;
    return partners.filter((p) => p.name.toLowerCase().includes(q));
  }, [partners, search]);

  useEffect(() => {
    if (!editingId) {
      setForm(EMPTY);
      return;
    }
    const p = partners.find((x) => x._id === editingId);
    if (p) {
      setForm({
        name: p.name,
        logo: p.logo ?? "",
        website: p.website ?? "",
        description: p.description ?? "",
      });
    }
  }, [editingId, partners]);

  function invalidate() {
    qc.invalidateQueries({ queryKey: ["admin", "partners"] });
    qc.invalidateQueries({ queryKey: ["public", "partners"] });
  }

  const create = useMutation({
    mutationFn: async (payload: PartnerForm) => {
      const { data } = await api.post<Partner>("/partners", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Partner added");
      setForm(EMPTY);
      invalidate();
    },
    onError: (err) => toast.error(getErrorMessage(err, "Create failed")),
  });

  const update = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: PartnerForm }) => {
      const { data } = await api.put<Partner>(`/partners/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Partner updated");
      setEditingId(null);
      invalidate();
    },
    onError: (err) => toast.error(getErrorMessage(err, "Update failed")),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/partners/${id}`);
    },
    onSuccess: () => {
      toast.success("Partner deleted");
      if (editingId) setEditingId(null);
      invalidate();
    },
    onError: (err) => toast.error(getErrorMessage(err, "Delete failed")),
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
        <h1 className="font-display text-3xl font-bold text-ink">Partners</h1>
        <p className="mt-1 text-sm text-muted">
          Organisations that fund, collaborate with, or champion our work.
        </p>
      </header>

      {/* FORM */}
      <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">
            {isEditing ? "Edit partner" : "Add a new partner"}
          </h2>
          {isEditing && (
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="text-xs font-semibold text-muted hover:text-ink"
            >
              Cancel edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-5 md:grid-cols-2">
          <label>
            <span className="block text-sm font-semibold text-ink">Name</span>
            <input
              required
              minLength={2}
              maxLength={160}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label>
            <span className="block text-sm font-semibold text-ink">
              Website <span className="font-normal text-muted">(optional)</span>
            </span>
            <input
              type="url"
              value={form.website}
              onChange={(e) =>
                setForm((f) => ({ ...f, website: e.target.value }))
              }
              placeholder="https://…"
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label className="md:col-span-2">
            <span className="block text-sm font-semibold text-ink">
              Logo URL <span className="font-normal text-muted">(optional)</span>
            </span>
            <input
              type="url"
              value={form.logo}
              onChange={(e) => setForm((f) => ({ ...f, logo: e.target.value }))}
              placeholder="https://…/logo.svg"
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label className="md:col-span-2">
            <span className="block text-sm font-semibold text-ink">
              Description <span className="font-normal text-muted">(optional)</span>
            </span>
            <textarea
              rows={4}
              maxLength={1000}
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
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
                ? "Saving…"
                : isEditing
                ? "Save changes"
                : "Add partner"}
            </button>
          </div>
        </form>
      </section>

      {/* LIST */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-lg font-semibold text-ink">
            Existing partners
          </h2>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-primary-500 sm:w-64"
          />
        </div>

        {isLoading ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-32 animate-pulse rounded-2xl border border-line bg-surface" />
            <div className="h-32 animate-pulse rounded-2xl border border-line bg-surface" />
            <div className="h-32 animate-pulse rounded-2xl border border-line bg-surface" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No partners yet.</p>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <li
                key={p._id}
                className={cn(
                  "flex flex-col rounded-2xl border bg-surface p-5 shadow-sm",
                  editingId === p._id ? "border-primary-400" : "border-line"
                )}
              >
                <div className="flex items-start gap-3">
                  {p.logo ? (
                    <img
                      src={p.logo}
                      alt=""
                      className="h-14 w-14 rounded-md border border-line object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-bg text-[10px] text-muted">
                      No logo
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-display text-sm font-semibold text-ink">
                      {p.name}
                    </h3>
                    {p.website && (
                      <a
                        href={p.website}
                        target="_blank"
                        rel="noreferrer"
                        className="truncate text-xs text-primary-600 hover:text-primary-700"
                      >
                        {p.website}
                      </a>
                    )}
                  </div>
                </div>
                {p.description && (
                  <p className="mt-3 line-clamp-3 text-xs text-muted">
                    {p.description}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setEditingId(p._id)}
                    className="rounded-md border border-line bg-surface px-3 py-1 font-semibold text-ink hover:border-primary-300 hover:text-primary-600"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete "${p.name}"?`)) remove.mutate(p._id);
                    }}
                    disabled={remove.isPending}
                    className="font-semibold text-red-600 hover:text-red-700"
                  >
                    Delete
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
