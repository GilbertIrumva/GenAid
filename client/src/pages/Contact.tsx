import { useState } from "react";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import SocialLinks from "@/components/SocialLinks";
import { useSEO } from "@/utils/useSEO";
import { SITE } from "@/data/site";
import { api } from "@/api/client";

const subjects = [
  "General enquiry",
  "Partnership",
  "Donation question",
  "Volunteer",
  "Media / press",
  "Other",
];

const faqs = [
  {
    q: "How do I donate?",
    a: "Use the Donate button anywhere on the site — it links to our verified GlobalGiving page. For larger gifts or corporate matching, email info@generationaid.org and we'll arrange a direct transfer or invoice.",
  },
  {
    q: "Can I volunteer remotely?",
    a: "Yes. We work with remote mentors in design, writing, software, English language and career coaching. Send us a note with your skills and weekly availability via the form above.",
  },
  {
    q: "How are donations spent?",
    a: "Roughly 78% of every donation funds direct programme delivery (training, stipends, equipment, internet). 14% covers Hub operations, and 8% covers organisational overhead. Full breakdown in our annual report — request a copy via email.",
  },
  {
    q: "Are you a registered organisation?",
    a: "Yes. Generation Aid is a registered refugee-led organisation operating in the Kakuma camp under host-country regulations, with international fiscal sponsorship for donations.",
  },
];

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  useSEO({
    title: "Contact",
    description:
      "Get in touch with Generation Aid — partnerships, donations, volunteering, or media enquiries.",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: subjects[0],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email";
    if (form.message.trim().length < 5)
      e.message = "Please write a short message";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setStatus("sending");
    try {
      await api.post("/contact", form);
      setStatus("sent");
      setForm({ name: "", email: "", subject: subjects[0]!, message: "" });
    } catch (err) {
      const e2 = err as {
        response?: { data?: { error?: string } };
        message?: string;
      };
      setServerError(
        e2.response?.data?.error ?? e2.message ?? "Could not send message"
      );
      setStatus("error");
    }
  }

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as keyof FieldErrors]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
  }

  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[50vh] items-center overflow-hidden">
        {/* TODO: replace with real Generation Aid photo */}
        <SmartImage
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80"
          alt="People writing and corresponding"
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/65 to-ink/40"
        />
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-300 backdrop-blur">
              Contact
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              Let&apos;s talk.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              Whether you want to partner, donate, volunteer or just say hello
              &mdash; we read every message and reply within two business days.
            </p>
          </div>
        </div>
      </section>

      {/* FORM + DETAILS */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-3">
          {/* FORM */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-2xl font-bold text-ink">
                Send us a message
              </h2>
              <p className="mt-1 text-sm text-muted">
                All fields required unless marked optional.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-semibold text-ink"
                  >
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      className="mt-1 text-xs text-red-600"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-semibold text-ink"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      className="mt-1 text-xs text-red-600"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="contact-subject"
                    className="block text-sm font-semibold text-ink"
                  >
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold text-ink"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={6}
                    required
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                    className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      className="mt-1 text-xs text-red-600"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === "sent" && (
                  <p className="sm:col-span-2 rounded-md bg-primary-50 px-3 py-2 text-sm text-primary-700">
                    Thanks &mdash; your message is on its way. We&apos;ll be in
                    touch shortly.
                  </p>
                )}
                {status === "error" && serverError && (
                  <p className="sm:col-span-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                    {serverError}
                  </p>
                )}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* DETAILS */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
              <h3 className="font-display text-base font-semibold text-ink">
                Office
              </h3>
              <p className="mt-2 text-sm text-muted">{SITE.address}</p>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
              <h3 className="font-display text-base font-semibold text-ink">
                Phone
              </h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <span className="font-semibold text-ink">Kenya:</span>{" "}
                  <a
                    href={`tel:${SITE.phoneKenya.replace(/\s+/g, "")}`}
                    className="text-muted hover:text-primary-600"
                  >
                    {SITE.phoneKenya}
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-ink">International:</span>{" "}
                  <a
                    href={`tel:${SITE.phoneInternational.replace(/\s+/g, "")}`}
                    className="text-muted hover:text-primary-600"
                  >
                    {SITE.phoneInternational}
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
              <h3 className="font-display text-base font-semibold text-ink">
                Email
              </h3>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-2 inline-block text-sm text-primary-600 hover:underline"
              >
                {SITE.email}
              </a>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
              <h3 className="font-display text-base font-semibold text-ink">
                Follow us
              </h3>
              <SocialLinks className="mt-3" />
            </div>
          </aside>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-surface">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
              FAQ
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              Frequently asked
            </h2>
          </div>

          <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-bg">
            {faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <h3 className="font-display text-base font-semibold text-ink">
                    {f.q}
                  </h3>
                  <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-primary-50 text-primary-600 transition group-open:rotate-45">
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
