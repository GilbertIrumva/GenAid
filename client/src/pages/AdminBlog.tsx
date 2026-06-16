import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { api } from "@/api/client";
import { cn } from "@/utils/cn";
import ImageUploadField from "@/components/ImageUploadField";

interface Post {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  cover: string;
  slug?: string;
  published: boolean;
  publishedAt: string;
  createdAt: string;
}

interface PostForm {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  cover: string;
  slug: string;
  published: boolean;
  publishedAt: string;
}

const EMPTY: PostForm = {
  title: "",
  excerpt: "",
  content: "",
  author: "",
  cover: "",
  slug: "",
  published: true,
  publishedAt: new Date().toISOString().slice(0, 10),
};

function getErrorMessage(err: unknown, fallback: string): string {
  const e = err as { response?: { data?: { error?: string } }; message?: string };
  return e.response?.data?.error ?? e.message ?? fallback;
}

export default function AdminBlog() {
  const qc = useQueryClient();
  const { t, i18n } = useTranslation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PostForm>(EMPTY);
  const [search, setSearch] = useState("");

  const { data: posts = [], isLoading } = useQuery<Post[]>({
    queryKey: ["admin", "posts"],
    queryFn: async () => {
      // includeDrafts=true so editors can see unpublished work.
      const { data } = await api.get<Post[]>("/posts?includeDrafts=true");
      return data;
    },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)
    );
  }, [posts, search]);

  useEffect(() => {
    if (!editingId) {
      setForm(EMPTY);
      return;
    }
    const p = posts.find((x) => x._id === editingId);
    if (p) {
      setForm({
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        author: p.author,
        cover: p.cover ?? "",
        slug: p.slug ?? "",
        published: p.published,
        publishedAt: (p.publishedAt ?? p.createdAt).slice(0, 10),
      });
    }
  }, [editingId, posts]);

  function invalidate() {
    qc.invalidateQueries({ queryKey: ["admin", "posts"] });
    qc.invalidateQueries({ queryKey: ["public", "posts"] });
  }

  const create = useMutation({
    mutationFn: async (payload: PostForm) => {
      const { data } = await api.post<Post>("/posts", payload);
      return data;
    },
    onSuccess: () => {
      toast.success(t("admin.blog.created"));
      setForm(EMPTY);
      invalidate();
    },
    onError: (err) => toast.error(getErrorMessage(err, t("admin.blog.createFailed"))),
  });

  const update = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: PostForm }) => {
      const { data } = await api.put<Post>(`/posts/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      toast.success(t("admin.blog.updated"));
      setEditingId(null);
      invalidate();
    },
    onError: (err) => toast.error(getErrorMessage(err, t("admin.blog.updateFailed"))),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      toast.success(t("admin.blog.deleted"));
      if (editingId) setEditingId(null);
      invalidate();
    },
    onError: (err) => toast.error(getErrorMessage(err, t("admin.blog.deleteFailed"))),
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
        <h1 className="font-display text-3xl font-bold text-ink">{t("admin.blog.pageTitle")}</h1>
        <p className="mt-1 text-sm text-muted">
          {t("admin.blog.pageSubtitle")}
        </p>
      </header>

      {/* FORM */}
      <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">
            {isEditing ? t("admin.blog.editPost") : t("admin.blog.addNew")}
          </h2>
          {isEditing && (
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="text-xs font-semibold text-muted hover:text-ink"
            >
              {t("admin.blog.cancelEdit")}
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="md:col-span-2">
            <span className="block text-sm font-semibold text-ink">{t("admin.common.title")}</span>
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
            <span className="block text-sm font-semibold text-ink">{t("admin.common.author")}</span>
            <input
              required
              minLength={2}
              maxLength={120}
              value={form.author}
              onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label>
            <span className="block text-sm font-semibold text-ink">
              {t("admin.blog.publishDate")}
            </span>
            <input
              type="date"
              required
              value={form.publishedAt}
              onChange={(e) =>
                setForm((f) => ({ ...f, publishedAt: e.target.value }))
              }
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label>
            <span className="block text-sm font-semibold text-ink">
              {t("admin.blog.slug")} <span className="font-normal text-muted">({t("admin.common.optional")})</span>
            </span>
            <input
              maxLength={80}
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder={t("admin.blog.slugPlaceholder")}
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <div className="md:col-span-2">
            <ImageUploadField
              label={t("admin.blog.coverImage")}
              value={form.cover}
              onChange={(url) => setForm((f) => ({ ...f, cover: url }))}
              disabled={isPending}
              hint={t("admin.blog.coverHint")}
            />
          </div>

          <label className="md:col-span-2">
            <span className="block text-sm font-semibold text-ink">{t("admin.blog.excerpt")}</span>
            <textarea
              required
              minLength={10}
              maxLength={500}
              rows={2}
              value={form.excerpt}
              onChange={(e) =>
                setForm((f) => ({ ...f, excerpt: e.target.value }))
              }
              placeholder={t("admin.blog.excerptPlaceholder")}
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label className="md:col-span-2">
            <span className="block text-sm font-semibold text-ink">
              {t("admin.blog.fullContent")}
            </span>
            <textarea
              required
              minLength={20}
              rows={12}
              value={form.content}
              onChange={(e) =>
                setForm((f) => ({ ...f, content: e.target.value }))
              }
              placeholder={t("admin.blog.fullContentPlaceholder")}
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label className="md:col-span-2 flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) =>
                setForm((f) => ({ ...f, published: e.target.checked }))
              }
              className="h-4 w-4 rounded border-line text-primary-500"
            />
            <span className="text-sm text-ink">
              {t("admin.blog.publishedLabel")} <span className="text-muted">{t("admin.blog.uncheckDraft")}</span>
            </span>
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
                ? t("admin.blog.saveChanges")
                : form.published
                ? t("admin.blog.publishPost")
                : t("admin.blog.saveDraft")}
            </button>
          </div>
        </form>
      </section>

      {/* LIST */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-lg font-semibold text-ink">
            {t("admin.blog.existing")}
          </h2>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("admin.blog.searchPlaceholder")}
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
          <p className="mt-4 text-sm text-muted">{t("admin.blog.noPosts")}</p>
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
                {p.cover ? (
                  <img
                    src={p.cover}
                    alt=""
                    className="aspect-video w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-bg text-xs text-muted">
                    {t("admin.blog.noCover")}
                  </div>
                )}
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center gap-2">
                    {!p.published && (
                      <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-yellow-800">
                        {t("admin.blog.draft")}
                      </span>
                    )}
                    <p className="text-xs uppercase tracking-wide text-primary-600">
                      {p.author}
                    </p>
                  </div>
                  <h3 className="mt-2 font-display text-sm font-semibold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    {new Date(p.publishedAt ?? p.createdAt).toLocaleDateString(
                      i18n.language,
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </p>
                  <p className="mt-2 line-clamp-3 flex-1 text-xs text-muted">
                    {p.excerpt}
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
                        if (confirm(t("admin.blog.confirmDelete", { title: p.title }))) remove.mutate(p._id);
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
