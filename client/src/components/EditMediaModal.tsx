import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export interface EditableItem {
  _id: string;
  title: string;
  description: string;
}

/**
 * Reusable modal for editing the `title` and `description` of a video or photo.
 * Render conditionally: pass `item` to open, `null` to close.
 */
export default function EditMediaModal({
  item,
  label,
  onClose,
  onSave,
  isSaving = false,
}: {
  item: EditableItem | null;
  /** What kind of thing is being edited, used in the heading ("video" / "photo"). */
  label: string;
  onClose: () => void;
  onSave: (patch: { title: string; description: string }) => void;
  isSaving?: boolean;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { t } = useTranslation();

  // Re-hydrate the form whenever a different item is opened.
  useEffect(() => {
    setTitle(item?.title ?? "");
    setDescription(item?.description ?? "");
  }, [item]);

  // Close on Escape.
  useEffect(() => {
    if (!item) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  if (!item) return null;

  const dirty =
    title.trim() !== item.title || description.trim() !== item.description;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ title: title.trim(), description: description.trim() });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-media-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label={t("admin.common.close")}
        onClick={onClose}
        className="absolute inset-0 bg-ink/60"
      />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-lg space-y-5 rounded-2xl bg-surface p-6 shadow-xl"
      >
        <header>
          <h2
            id="edit-media-title"
            className="font-display text-xl font-semibold text-ink"
          >
            {t("admin.common.edit")} {label}
          </h2>
          <p className="mt-1 text-xs text-muted">
            {t("admin.editModal.subtitle")}
          </p>
        </header>

        <label className="block">
          <span className="block text-sm font-semibold text-ink">{t("admin.common.title")}</span>
          <input
            required
            autoFocus
            minLength={2}
            maxLength={160}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
          />
        </label>

        <label className="block">
          <span className="block text-sm font-semibold text-ink">
            {t("admin.common.description")}
          </span>
          <textarea
            required
            rows={5}
            minLength={5}
            maxLength={5000}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
          />
        </label>

        <footer className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink hover:border-primary-300"
          >
            {t("admin.common.cancel")}
          </button>
          <button
            type="submit"
            disabled={!dirty || isSaving}
            className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-60"
          >
            {isSaving ? t("admin.common.saving") : t("admin.editModal.saveChanges")}
          </button>
        </footer>
      </form>
    </div>
  );
}
