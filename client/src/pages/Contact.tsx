import { useState } from "react";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
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

/** Office hours shown beside the form. East Africa Time. */
const officeHours = [
  { key: "weekdays", days: "Monday \u2013 Friday", hours: "8:30 \u2013 17:00 EAT" },
  { key: "saturday", days: "Saturday", hours: "9:00 \u2013 13:00 EAT" },
  { key: "sunday", days: "Sunday & public holidays", hours: "Closed" },
];

const faqs = [
  {
    key: "donate",
    q: "How do I donate?",
    a: "Use the Donate button anywhere on the site — it links to our verified GlobalGiving page. For larger gifts or corporate matching, email info@generationaid.org and we'll arrange a direct transfer or invoice.",
  },
  {
    key: "volunteer",
    q: "Can I volunteer remotely?",
    a: "Yes. We work with remote mentors in design, writing, software, English language and career coaching. Send us a note with your skills and weekly availability via the form above.",
  },
  {
    key: "spend",
    q: "How are donations spent?",
    a: "Roughly 78% of every donation funds direct programme delivery (training, stipends, equipment, internet). 14% covers Hub operations, and 8% covers organisational overhead. Full breakdown in our annual report — request a copy via email.",
  },
  {
    key: "registered",
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
  const { t } = useTranslation();
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
    if (form.name.trim().length < 2) e.name = t("contact.errorName");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = t("contact.errorEmail");
    if (form.message.trim().length < 5)
      e.message = t("contact.errorMessage");
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
        e2.response?.data?.error ?? e2.message ?? t("contact.errorSendFailed")
      );
      setStatus("error");
    }
  }

  function resetForm() {
    setForm({ name: "", email: "", subject: subjects[0]!, message: "" });
    setErrors({});
    setServerError(null);
    setStatus("idle");
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
              {t("contact.hero.eyebrowAlt")}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              {t("contact.hero.titleAlt")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              {t("contact.hero.subtitleAlt")}
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
              {status === "sent" ? (
                <div className="flex flex-col items-start gap-5 text-left">
                  <span
                    aria-hidden
                    className="grid h-14 w-14 place-items-center rounded-full bg-primary-50 text-primary-600"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="28"
                      height="28"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="4 12 10 18 20 6" />
                    </svg>
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-ink">
                      {t("contact.messageSent")}
                    </h2>
                    <p className="mt-2 text-sm text-muted sm:text-base">
                      {t("contact.messageSentBody")}
                    </p>
                  </div>
                  <ul className="mt-2 grid w-full gap-3 sm:grid-cols-3">
                    <li className="rounded-xl border border-line bg-bg p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                        {t("contact.next")}
                      </p>
                      <p className="mt-1 text-sm text-ink">
                        {t("contact.nextBody")}
                      </p>
                    </li>
                    <li className="rounded-xl border border-line bg-bg p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                        {t("contact.replyWindow")}
                      </p>
                      <p className="mt-1 text-sm text-ink">
                        {t("contact.replyWindowBody")}
                      </p>
                    </li>
                    <li className="rounded-xl border border-line bg-bg p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                        {t("contact.needSooner")}
                      </p>
                      <p className="mt-1 text-sm text-ink">
                        Email{" "}
                        <a
                          href={`mailto:${SITE.email}`}
                          className="text-primary-600 hover:underline"
                        >
                          {SITE.email}
                        </a>
                        .
                      </p>
                    </li>
                  </ul>
                  <div className="mt-2 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
                    >
                      {t("contact.sendAnother")}
                    </button>
                    <a
                      href={SITE.donateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-line bg-bg px-5 py-2.5 text-sm font-semibold text-ink hover:border-primary-300 hover:text-primary-600"
                    >
                      {t("contact.supportOurWork")}
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-bold text-ink">
                    {t("contact.formTitle")}
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    {t("contact.allFieldsRequired")}
                  </p>

              <form onSubmit={handleSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-semibold text-ink"
                  >
                    {t("contact.yourName")}
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
                    {t("common.email")}
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
                    {t("contact.subjectLabel")}
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
                    {t("common.message")}
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
                    {status === "sending" ? t("common.sending") : t("contact.send")}
                  </button>
                </div>
              </form>
              </>
              )}
            </div>
          </div>

          {/* DETAILS */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
              <h3 className="font-display text-base font-semibold text-ink">
                {t("contact.office")}
              </h3>
              <p className="mt-2 text-sm text-muted">{t("common.address", SITE.address)}</p>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
              <h3 className="font-display text-base font-semibold text-ink">
                {t("contact.officeHours")}
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {officeHours.map((h) => (
                  <li
                    key={h.key}
                    className="flex items-baseline justify-between gap-3 border-b border-line pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-ink">
                      {t(`contact.hours.${h.key}.days`, h.days)}
                    </span>
                    <span className="text-muted">
                      {t(`contact.hours.${h.key}.hours`, h.hours)}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-muted">
                {t("contact.timesAreEAT")}
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
              <h3 className="font-display text-base font-semibold text-ink">
                {t("contact.phone")}
              </h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <span className="font-semibold text-ink">{t("footer.kenya")}</span>{" "}
                  <a
                    href={`tel:${SITE.phoneKenya.replace(/\s+/g, "")}`}
                    className="text-muted hover:text-primary-600"
                  >
                    {SITE.phoneKenya}
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-ink">{t("footer.international")}</span>{" "}
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
                {t("contact.emailHeading")}
              </h3>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-2 inline-block text-sm text-primary-600 hover:underline"
              >
                {SITE.email}
              </a>
            </div>
          </aside>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-surface">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
              {t("contact.faq")}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              {t("contact.faqTitle")}
            </h2>
          </div>

          <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-bg">
            {faqs.map((f) => (
              <details key={f.key} className="group p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <h3 className="font-display text-base font-semibold text-ink">
                    {t(`contact.faqs.${f.key}.q`, f.q)}
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
                <p className="mt-3 text-sm text-muted">
                  {t(`contact.faqs.${f.key}.a`, f.a)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
