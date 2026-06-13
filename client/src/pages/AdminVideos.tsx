import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";

interface VideoRecord {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  createdAt: string;
}

async function fetchVideos(): Promise<VideoRecord[]> {
  const { data } = await api.get<VideoRecord[]>("/videos");
  return data;
}

export default function AdminVideos() {
  const qc = useQueryClient();
  const { data: videos = [], isLoading } = useQuery({
    queryKey: ["admin", "videos"],
    queryFn: fetchVideos,
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  function resetForm() {
    setTitle("");
    setDescription("");
    setVideoFile(null);
    setPosterFile(null);
    setProgress(0);
  }

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!videoFile) throw new Error("Please choose a video file");

      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      fd.append("video", videoFile);
      if (posterFile) fd.append("poster", posterFile);

      const { data } = await api.post<VideoRecord>("/videos", fd, {
        onUploadProgress: (e) => {
          if (e.total) setProgress(Math.round((e.loaded / e.total) * 100));
        },
      });
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "videos"] });
      qc.invalidateQueries({ queryKey: ["public", "videos"] });
      resetForm();
    },
    onError: (err) => {
      const e = err as { response?: { data?: { error?: string } }; message?: string };
      setError(e.response?.data?.error ?? e.message ?? "Upload failed");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/videos/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "videos"] });
      qc.invalidateQueries({ queryKey: ["public", "videos"] });
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    uploadMutation.mutate();
  }

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-3xl font-bold text-ink">Videos</h1>
        <p className="mt-1 text-sm text-muted">
          Upload videos (with an optional poster image) to feature on the Blog page.
        </p>
      </header>

      {/* UPLOAD FORM */}
      <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-ink">Upload a new video</h2>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="md:col-span-2">
            <span className="block text-sm font-semibold text-ink">Title</span>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label className="md:col-span-2">
            <span className="block text-sm font-semibold text-ink">Description</span>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
            />
          </label>

          <label>
            <span className="block text-sm font-semibold text-ink">
              Video file <span className="text-red-600">*</span>
            </span>
            <input
              required
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
              className="mt-1 w-full text-sm text-muted file:mr-3 file:rounded-md file:border-0 file:bg-primary-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
            />
            <span className="mt-1 block text-xs text-muted">Max 200 MB. MP4 recommended.</span>
          </label>

          <label>
            <span className="block text-sm font-semibold text-ink">
              Poster image <span className="text-muted">(optional)</span>
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPosterFile(e.target.files?.[0] ?? null)}
              className="mt-1 w-full text-sm text-muted file:mr-3 file:rounded-md file:border-0 file:bg-primary-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
            />
          </label>

          {uploadMutation.isPending && (
            <div className="md:col-span-2">
              <div className="h-2 w-full overflow-hidden rounded-full bg-primary-50">
                <div
                  className="h-full bg-primary-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-muted">Uploading… {progress}%</p>
            </div>
          )}

          {error && (
            <p className="md:col-span-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={uploadMutation.isPending || !videoFile}
              className="rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-60"
            >
              {uploadMutation.isPending ? "Uploading…" : "Upload video"}
            </button>
          </div>
        </form>
      </section>

      {/* LIST */}
      <section>
        <h2 className="font-display text-lg font-semibold text-ink">Existing videos</h2>

        {isLoading ? (
          <p className="mt-4 text-sm text-muted">Loading…</p>
        ) : videos.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No videos uploaded yet.</p>
        ) : (
          <ul className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <li
                key={v._id}
                className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm"
              >
                <div className="aspect-video w-full overflow-hidden bg-ink">
                  <video
                    src={v.videoUrl}
                    poster={v.posterUrl || undefined}
                    controls
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm font-semibold text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted">{v.description}</p>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-muted">
                      {new Date(v.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete "${v.title}"?`)) deleteMutation.mutate(v._id);
                      }}
                      disabled={deleteMutation.isPending}
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
