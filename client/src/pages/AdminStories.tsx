import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/api/client";
import { cn } from "@/utils/cn";

interface Story {
  _id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  createdAt: string;
}

interface StoryForm {
  title: string;
  summary: string;
  content: string;
  image: string;
  author: string;
}

const EMPTY: StoryForm = {
  title: "",
  summary: "",
  content: "",
  image: "",
  author: "",
};

function getErrorMessage(err: unknown, fallback: string): string {
  const e = err as { response?: { data?: { error?: string } }; message?: string };
  return e.response?.data?.error ?? e.message ?? fallback;
}

export default function AdminStories() {
  const qc = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<StoryForm>(EMPTY);
  const [search, setSearch] = useState("");

  const { data: stories = [], isLoading } = useQuery<Story[]>({
    queryKey: ["admin", "stories"],
    queryFn: async () => {
      const { data } = await api.get<Story[]>("/stories");
      return data;
    },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return stories;
    return stories.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.author.toLowerCase().includes(q)
    );
  }, [stories, search]);

  useEffect(() => {
    if (!editingId) {
      setForm(EMPTY);
      return;
    }
    const s = stories.find((x) => x._id === editingId);
    if (s) {
      setForm({
        title: s.title,
        summary: s.summary,
        content: s.content,
        image: s.image ?? "",
        author: s.author,
      });
    }
  }, [editingId, stories]);

  function invalidate() {
    qc.invalidateQueries({ queryKey: ["admin", "stories"] });
    qc.invalidateQueries({ queryKey: ["public", "stories"] });
  }

  const create = useMutation({
    mutationFn: async (payload: StoryForm) => {
      const { data } = await api.post<Story>("/stories", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Story created");
      setForm(EMPTY);
      invalidate();
    },
    onError: (err) => toast.error(getErrorMessage(err, "Create failed")),
  });

  const update = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: StoryForm }) => {
      const { data } = await api.put<Story>(`/stories/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Story updated");
      setEditingId(null);
      invalidate();
    },
    onError: (err) => toast.error(getErrorMessage(err, "Update failed")),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/stories/${id}`);
    },
    onSuccess: () => {
      toast.success("Story deleted");
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
        <h1 className="font-display text-3xl font-bold text-ink">Stories</h1>
        <p className="mt-1 text-sm text-muted">
          Personal stories from program participants and alumni.
        </p>
      </header>

      {/* FORM */}
      <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">
            {isEditing ? "Edit story" : "Add a new story"}
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
          <label className="md:col-span-2">
            <span className="block text-sm font-semibold text-ink">Title</span>
            <input
              required
              minLength={2}
              maxLength={200}
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label>
            <span className="block text-sm font-semibold text-ink">Author</span>
            <input
              required
              minLength={2}
              maxLength={120}
              value={form.author}
              onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
              placeholder="Name of the person whose story this is"
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label>
            <span className="block text-sm font-semibold text-ink">
              Image URL <span className="font-normal text-muted">(optional)</span>
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
            <span className="block text-sm font-semibold text-ink">Summary</span>
            <textarea
              required
              minLength={10}
              maxLength={500}
              rows={2}
              value={form.summary}
              onChange={(e) =>
                setForm((f) => ({ ...f, summary: e.target.value }))
              }
              placeholder="One or two sentences shown on cards and previews."
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label className="md:col-span-2">
            <span className="block text-sm font-semibold text-ink">
              Full story
            </span>
            <textarea
              required
              minLength={20}
              rows={10}
              value={form.content}
              onChange={(e) =>
                setForm((f) => ({ ...f, content: e.target.value }))
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
                : "Publish story"}
            </button>
          </div>
        </form>
      </section>

      {/* LIST */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-lg font-semibold text-ink">
            Existing stories
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
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="h-44 animate-pulse rounded-2xl border border-line bg-surface" />
            <div className="h-44 animate-pulse rounded-2xl border border-line bg-surface" />
            <div className="h-44 animate-pulse rounded-2xl border border-line bg-surface" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No stories yet.</p>
        ) : (
          <ul className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <li
                key={s._id}
                className={cn(
                  "flex flex-col overflow-hidden rounded-2xl border bg-surface shadow-sm",
                  editingId === s._id ? "border-primary-400" : "border-line"
                )}
              >
                {s.image ? (
                  <img
                    src={s.image}
                    alt=""
                    className="aspect-video w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-bg text-xs text-muted">
                    No image
                  </div>
                )}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-sm font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-wide text-primary-600">
                    {s.author}
                  </p>
                  <p className="mt-2 line-clamp-3 flex-1 text-xs text-muted">
                    {s.summary}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setEditingId(s._id)}
                      className="rounded-md border border-line bg-surface px-3 py-1 font-semibold text-ink hover:border-primary-300 hover:text-primary-600"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete "${s.title}"?`)) remove.mutate(s._id);
                      }}
                      disabled={remove.isPending}
                      className="font-semibold text-red-600 hover:text-red-700"
                    >
                      Delete
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
