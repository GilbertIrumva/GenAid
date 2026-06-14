import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/api/client";
import { cn } from "@/utils/cn";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

function getErrorMessage(err: unknown, fallback: string): string {
  const e = err as { response?: { data?: { error?: string } }; message?: string };
  return e.response?.data?.error ?? e.message ?? fallback;
}

export default function AdminMessages() {
  const qc = useQueryClient();
  const [onlyUnread, setOnlyUnread] = useState(false);
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const { data: messages = [], isLoading } = useQuery<ContactMessage[]>({
    queryKey: ["admin", "messages", { onlyUnread }],
    queryFn: async () => {
      const { data } = await api.get<ContactMessage[]>("/admin/messages", {
        params: onlyUnread ? { unread: "true" } : {},
      });
      return data;
    },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return messages;
    return messages.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
    );
  }, [messages, search]);

  function invalidate() {
    qc.invalidateQueries({ queryKey: ["admin", "messages"] });
    qc.invalidateQueries({ queryKey: ["admin", "stats"] });
    qc.invalidateQueries({ queryKey: ["admin", "stats-badges"] });
  }

  const toggleRead = useMutation({
    mutationFn: async ({ id, read }: { id: string; read: boolean }) => {
      const { data } = await api.patch<ContactMessage>(`/admin/messages/${id}`, {
        read,
      });
      return data;
    },
    onSuccess: (_, vars) => {
      toast.success(vars.read ? "Marked as read" : "Marked as unread");
      invalidate();
    },
    onError: (err) => toast.error(getErrorMessage(err, "Update failed")),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/messages/${id}`);
    },
    onSuccess: () => {
      toast.success("Message deleted");
      setOpenId(null);
      invalidate();
    },
    onError: (err) => toast.error(getErrorMessage(err, "Delete failed")),
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-bold text-ink">Messages</h1>
        <p className="mt-1 text-sm text-muted">
          Inbox of submissions from the public contact form.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, subject…"
          className="min-w-0 flex-1 rounded-md border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-primary-500"
        />
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={onlyUnread}
            onChange={(e) => setOnlyUnread(e.target.checked)}
            className="h-4 w-4 rounded border-line text-primary-600 focus:ring-primary-500"
          />
          Show only unread
        </label>
      </div>

      <section className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
        {isLoading ? (
          <div className="space-y-px p-4">
            <div className="h-14 animate-pulse rounded-md bg-bg" />
            <div className="h-14 animate-pulse rounded-md bg-bg" />
            <div className="h-14 animate-pulse rounded-md bg-bg" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted">No messages found.</p>
        ) : (
          <ul className="divide-y divide-line">
            {filtered.map((m) => {
              const isOpen = openId === m._id;
              return (
                <li key={m._id}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenId(isOpen ? null : m._id);
                      if (!m.read && !isOpen) {
                        toggleRead.mutate({ id: m._id, read: true });
                      }
                    }}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-bg"
                    aria-expanded={isOpen}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "h-2 w-2 flex-none rounded-full",
                        m.read ? "bg-line" : "bg-primary-500"
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3">
                        <span
                          className={cn(
                            "truncate text-sm",
                            m.read ? "font-medium text-ink/80" : "font-semibold text-ink"
                          )}
                        >
                          {m.name}
                        </span>
                        <span className="truncate text-xs text-muted">
                          {m.email}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-sm text-muted">
                        {m.subject}
                      </p>
                    </div>
                    <time
                      dateTime={m.createdAt}
                      className="flex-none text-xs text-muted"
                    >
                      {new Date(m.createdAt).toLocaleDateString()}
                    </time>
                  </button>

                  {isOpen && (
                    <div className="space-y-4 border-t border-line bg-bg/40 px-5 py-5">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">
                        {m.message}
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs">
                        <a
                          href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(
                            m.subject
                          )}`}
                          className="rounded-md bg-primary-500 px-3 py-1.5 font-semibold text-white hover:bg-primary-600"
                        >
                          Reply by email
                        </a>
                        <button
                          type="button"
                          onClick={() =>
                            toggleRead.mutate({ id: m._id, read: !m.read })
                          }
                          disabled={toggleRead.isPending}
                          className="rounded-md border border-line bg-surface px-3 py-1.5 font-semibold text-ink hover:border-primary-300"
                        >
                          Mark as {m.read ? "unread" : "read"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete message from ${m.name}?`)) {
                              remove.mutate(m._id);
                            }
                          }}
                          disabled={remove.isPending}
                          className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 font-semibold text-red-700 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
