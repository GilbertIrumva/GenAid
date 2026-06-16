import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { api } from "@/api/client";

interface Props {
  /** Current value — relative URL like /uploads/photos/abc.jpg or external URL. */
  value: string;
  onChange: (url: string) => void;
  /** Label shown above the field. */
  label?: string;
  /** Optional helper text under the field. */
  hint?: string;
  /** Disables the file picker (e.g. during parent submit). */
  disabled?: boolean;
}

function getErrorMessage(err: unknown, fallback: string): string {
  const e = err as { response?: { data?: { error?: string } }; message?: string };
  return e.response?.data?.error ?? e.message ?? fallback;
}

/**
 * Image picker used by admin forms that store an image URL on the document
 * (Stories, Blog posts). Lets the editor either:
 *   - paste an external URL, or
 *   - pick a file → uploads to /api/uploads/image → URL fills in automatically.
 *
 * The component is controlled — parent owns the value.
 */
export default function ImageUploadField({
  value,
  onChange,
  label = "Image",
  hint,
  disabled,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  // Revoke object URLs to avoid leaks.
  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  async function handleFile(file: File) {
    if (localPreview) URL.revokeObjectURL(localPreview);
    setLocalPreview(URL.createObjectURL(file));
    setUploading(true);
    setProgress(0);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const { data } = await api.post<{ url: string }>("/uploads/image", fd, {
        onUploadProgress: (e) => {
          if (e.total) setProgress(Math.round((e.loaded / e.total) * 100));
        },
      });
      onChange(data.url);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(getErrorMessage(err, "Upload failed"));
      setLocalPreview(null);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function handleClear() {
    if (localPreview) URL.revokeObjectURL(localPreview);
    setLocalPreview(null);
    onChange("");
  }

  const previewSrc = localPreview ?? value;

  return (
    <div>
      <span className="block text-sm font-semibold text-ink">
        {label} <span className="font-normal text-muted">(optional)</span>
      </span>

      <div className="mt-2 flex flex-wrap items-start gap-4">
        {previewSrc ? (
          <div className="relative">
            <img
              src={previewSrc}
              alt="Image preview"
              className="h-28 w-40 rounded-md border border-line object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <button
              type="button"
              onClick={handleClear}
              disabled={disabled || uploading}
              className="absolute -right-2 -top-2 rounded-full bg-ink/80 px-1.5 py-0.5 text-[10px] font-semibold text-white hover:bg-ink"
              aria-label="Remove image"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="flex h-28 w-40 items-center justify-center rounded-md border border-dashed border-line bg-bg text-xs text-muted">
            No image
          </div>
        )}

        <div className="flex-1 space-y-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            disabled={disabled || uploading}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
            className="block w-full text-sm text-muted file:mr-3 file:rounded-md file:border-0 file:bg-primary-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
          />
          {uploading && (
            <div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary-50">
                <div
                  className="h-full bg-primary-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-muted">Uploading… {progress}%</p>
            </div>
          )}
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="…or paste an https://… URL"
            disabled={disabled || uploading}
            className="block w-full rounded-md border border-line bg-bg px-3 py-2 text-xs text-ink outline-none focus:border-primary-500"
          />
          {hint && <p className="text-xs text-muted">{hint}</p>}
        </div>
      </div>
    </div>
  );
}
