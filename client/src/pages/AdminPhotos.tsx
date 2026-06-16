import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { api } from "@/api/client";
import EditMediaModal from "@/components/EditMediaModal";

interface PhotoRecord {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

function getErrorMessage(err: unknown, fallback: string): string {
  const e = err as { response?: { data?: { error?: string } }; message?: string };
  return e.response?.data?.error ?? e.message ?? fallback;
}

function PhotoSkeleton() {
  return (
    <li className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="aspect-video w-full animate-pulse bg-bg" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-bg" />
        <div className="h-3 w-full animate-pulse rounded bg-bg" />
      </div>
    </li>
  );
}

export default function AdminPhotos() {
  const qc = useQueryClient();
  const { t } = useTranslation();
  const { data: photos = [], isLoading } = useQuery<PhotoRecord[]>({
    queryKey: ["admin", "photos"],
    queryFn: async () => {
      const { data } = await api.get<PhotoRecord[]>("/photos");
      return data;
    },
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<PhotoRecord | null>(null);

  function resetForm() {
    setTitle("");
    setDescription("");
    setImageFile(null);
    setPreview(null);
    setProgress(0);
    document
      .querySelectorAll<HTMLInputElement>('input[type="file"][data-admin-photo]')
      .forEach((el) => (el.value = ""));
  }

  function handleFile(file: File | null) {
    setImageFile(file);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!imageFile) throw new Error(t("admin.photos.chooseFile"));

      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      fd.append("image", imageFile);

      const { data } = await api.post<PhotoRecord>("/photos", fd, {
        onUploadProgress: (e) => {
          if (e.total) setProgress(Math.round((e.loaded / e.total) * 100));
        },
      });
      return data;
    },
    onSuccess: () => {
      toast.success(t("admin.photos.uploaded"));
      qc.invalidateQueries({ queryKey: ["admin", "photos"] });
      qc.invalidateQueries({ queryKey: ["public", "photos"] });
      qc.invalidateQueries({ queryKey: ["admin", "stats"] });
      resetForm();
    },
    onError: (err) => toast.error(getErrorMessage(err, t("admin.photos.uploadFailed"))),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/photos/${id}`);
    },
    onSuccess: () => {
      toast.success(t("admin.photos.deleted"));
      qc.invalidateQueries({ queryKey: ["admin", "photos"] });
      qc.invalidateQueries({ queryKey: ["public", "photos"] });
      qc.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
    onError: (err) => toast.error(getErrorMessage(err, t("admin.photos.deleteFailed"))),
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      patch,
    }: {
      id: string;
      patch: { title: string; description: string };
    }) => {
      const { data } = await api.patch<PhotoRecord>(`/photos/${id}`, patch);
      return data;
    },
    onSuccess: () => {
      toast.success(t("admin.photos.updated"));
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["admin", "photos"] });
      qc.invalidateQueries({ queryKey: ["public", "photos"] });
    },
    onError: (err) => toast.error(getErrorMessage(err, t("admin.photos.updateFailed"))),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    uploadMutation.mutate();
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return photos;
    return photos.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [photos, search]);

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-3xl font-bold text-ink">{t("admin.photos.title")}</h1>
        <p className="mt-1 text-sm text-muted">
          {t("admin.photos.pageSubtitle")}
        </p>
      </header>

      {/* UPLOAD FORM */}
      <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-ink">
          {t("admin.photos.uploadNew")}
        </h2>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="md:col-span-2">
            <span className="block text-sm font-semibold text-ink">
              {t("admin.photos.subjectTitle")}
            </span>
            <input
              required
              minLength={2}
              maxLength={160}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("admin.photos.subjectPlaceholder")}
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label className="md:col-span-2">
            <span className="block text-sm font-semibold text-ink">
              {t("admin.common.description")}
            </span>
            <textarea
              required
              rows={3}
              minLength={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("admin.photos.descPlaceholder")}
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label className="md:col-span-2">
            <span className="block text-sm font-semibold text-ink">
              {t("admin.photos.imageFile")} <span className="text-red-600">*</span>
            </span>
            <input
              required
              type="file"
              accept="image/*"
              data-admin-photo
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
              className="mt-1 w-full text-sm text-muted file:mr-3 file:rounded-md file:border-0 file:bg-primary-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
            />
            <span className="mt-1 block text-xs text-muted">
              {t("admin.photos.maxFileNote")}
            </span>
          </label>

          {preview && (
            <div className="md:col-span-2">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                {t("admin.photos.preview")}
              </p>
              <img
                src={preview}
                alt={t("admin.photos.previewAlt")}
                className="max-h-64 rounded-md border border-line object-contain"
              />
            </div>
          )}

          {uploadMutation.isPending && (
            <div className="md:col-span-2">
              <div className="h-2 w-full overflow-hidden rounded-full bg-primary-50">
                <div
                  className="h-full bg-primary-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-muted">{t("admin.photos.uploadingPct", { pct: progress })}</p>
            </div>
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={uploadMutation.isPending || !imageFile}
              className="rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-60"
            >
              {uploadMutation.isPending ? t("admin.common.uploading") : t("admin.photos.uploadButton")}
            </button>
          </div>
        </form>
      </section>

      {/* LIST */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-lg font-semibold text-ink">
            {t("admin.photos.existing")}
          </h2>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("admin.photos.searchPlaceholder")}
            className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-primary-500 sm:w-64"
          />
        </div>

        {isLoading ? (
          <ul className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <PhotoSkeleton />
            <PhotoSkeleton />
            <PhotoSkeleton />
          </ul>
        ) : filtered.length === 0 ? (
          <p className="mt-4 text-sm text-muted">{t("admin.photos.noPhotosYet")}</p>
        ) : (
          <ul className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <li
                key={p._id}
                className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm"
              >
                <div className="aspect-video w-full overflow-hidden bg-ink">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm font-semibold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted">
                    {p.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-muted">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setEditing(p)}
                        className="font-semibold text-primary-600 hover:text-primary-700"
                      >
                        {t("admin.common.edit")}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(t("admin.photos.confirmDelete", { title: p.title }))) {
                            deleteMutation.mutate(p._id);
                          }
                        }}
                        disabled={deleteMutation.isPending}
                        className="font-semibold text-red-600 hover:text-red-700"
                      >
                        {t("admin.common.delete")}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <EditMediaModal
        item={editing}
        label={t("admin.nav.photos").toLowerCase()}
        isSaving={updateMutation.isPending}
        onClose={() => setEditing(null)}
        onSave={(patch) =>
          editing && updateMutation.mutate({ id: editing._id, patch })
        }
      />
    </div>
  );
}
