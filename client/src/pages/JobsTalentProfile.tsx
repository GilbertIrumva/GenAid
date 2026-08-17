import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import JobsShell from "@/components/JobsShell";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { talentProfiles as fallbackProfiles } from "@/data/talentProfiles";
import {
  createPlacementRequest,
  getTalentProfileBySlug,
  mapSanityTalentProfileToRecord,
} from "@/lib/sanity";
import { useSEO } from "@/utils/useSEO";

export default function JobsTalentProfile() {
  const { slug } = useParams();
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [company, setCompany] = useState("");
  const [roleType, setRoleType] = useState("Other");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const fallbackProfile = fallbackProfiles.find((item) => item.slug === slug);

  const { data: sanityProfile } = useQuery({
    queryKey: ["jobs", "sanity", "talent-profile", slug],
    queryFn: () =>
      slug ? getTalentProfileBySlug(slug) : Promise.resolve(null),
    enabled: Boolean(slug),
    retry: false,
  });

  const profile = useMemo(() => {
    if (sanityProfile) return mapSanityTalentProfileToRecord(sanityProfile);
    return fallbackProfile || null;
  }, [fallbackProfile, sanityProfile]);

  const placementMutation = useMutation({
    mutationFn: createPlacementRequest,
    onSuccess: () => {
      setSubmitMessage(
        "Request submitted successfully. Our placement team will contact you shortly.",
      );
      setSubject("");
      setMessage("");
    },
    onError: (error) => {
      const detail =
        error instanceof Error
          ? error.message
          : "Unable to submit request right now.";
      setSubmitMessage(detail);
    },
  });

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!profile) return;
    setSubmitMessage("");
    await placementMutation.mutateAsync({
      clientName,
      clientEmail,
      company,
      roleType,
      subject,
      message,
      talentProfileSlug: profile.slug,
      talentProfileName: profile.name,
    });
  };

  useSEO({
    title: profile
      ? `Generation Jobs | ${profile.name}`
      : "Generation Jobs | Talent Profile",
    description: profile
      ? `${profile.name} profile in the Generation Jobs talent ecosystem.`
      : "Talent profile details for the Generation Jobs placement pipeline.",
  });

  if (!profile) {
    return (
      <JobsShell
        eyebrow="Talent profile"
        title="Profile not found"
        subtitle="The profile may have moved or is not available yet."
      >
        <Section pattern="canvas">
          <div className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 text-center shadow-sm">
            <p className="text-neutral-body dark:text-slate-300">
              Please return to the talent page and select another profile.
            </p>
            <Link
              to="/jobs/talent"
              className="mt-4 inline-flex items-center rounded-lg bg-brand-600 dark:bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 dark:hover:bg-brand-400"
            >
              Back to Talent Model
            </Link>
          </div>
        </Section>
      </JobsShell>
    );
  }

  return (
    <JobsShell
      eyebrow="Talent profile"
      title={profile.name}
      subtitle={`${profile.title} · ${profile.location}`}
    >
      <Section pattern="canvas" className="!pt-6">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-4 border-b border-neutral-border dark:border-slate-700 pb-5">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-brand-500/20">
                <SmartImage
                  src={profile.image || ""}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                  fallbackLabel="Talent"
                />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-neutral-heading dark:text-slate-100">
                  {profile.name}
                </h2>
                <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                  {profile.title}
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Professional summary
            </span>
            <p className="mt-3 text-sm leading-relaxed text-neutral-body dark:text-slate-300">{profile.bio}</p>

            <h2 className="mt-6 font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
              Core expertise
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-neutral-body dark:text-slate-300">
              {profile.expertise.map((skill) => (
                <li key={skill} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-600 dark:bg-brand-400" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </article>

          <aside className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Profile status
            </span>
            <p className="mt-2 font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
              {profile.readiness}
            </p>

            <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-neutral-body dark:text-slate-400">
              Languages
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-body dark:text-slate-300">
              {profile.languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>

            <form onSubmit={submitRequest} className="mt-6 space-y-3 border-t border-neutral-border dark:border-slate-700 pt-5">
              <p className="text-sm font-semibold text-neutral-heading dark:text-slate-100">
                Request interview
              </p>
              <input
                type="text"
                value={clientName}
                onChange={(event) => setClientName(event.target.value)}
                placeholder="Your full name"
                required
                className="w-full rounded-lg border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-neutral-heading dark:text-slate-50 outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-1 focus:ring-brand-600 dark:focus:ring-brand-500"
              />
              <input
                type="email"
                value={clientEmail}
                onChange={(event) => setClientEmail(event.target.value)}
                placeholder="Work email"
                required
                className="w-full rounded-lg border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-neutral-heading dark:text-slate-50 outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-1 focus:ring-brand-600 dark:focus:ring-brand-500"
              />
              <input
                type="text"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                placeholder="Company (optional)"
                className="w-full rounded-lg border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-neutral-heading dark:text-slate-50 outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-1 focus:ring-brand-600 dark:focus:ring-brand-500"
              />
              <select
                value={roleType}
                onChange={(event) => setRoleType(event.target.value)}
                className="w-full rounded-lg border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-neutral-heading dark:text-slate-50 outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-1 focus:ring-brand-600 dark:focus:ring-brand-500"
              >
                <option value="Customer Support">Customer Support</option>
                <option value="Data Annotation">Data Annotation</option>
                <option value="Virtual Assistant">Virtual Assistant</option>
                <option value="Back Office">Back Office</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="Subject"
                required
                className="w-full rounded-lg border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-neutral-heading dark:text-slate-50 outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-1 focus:ring-brand-600 dark:focus:ring-brand-500"
              />
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell us what role and timeline you are hiring for"
                required
                rows={4}
                className="w-full rounded-lg border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-neutral-heading dark:text-slate-50 outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-1 focus:ring-brand-600 dark:focus:ring-brand-500"
              />

              <button
                type="submit"
                disabled={placementMutation.isPending}
                className="w-full rounded-lg bg-brand-600 dark:bg-brand-500 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition hover:bg-brand-700 dark:hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {placementMutation.isPending
                  ? "Submitting..."
                  : "Submit request"}
              </button>

              {submitMessage && (
                <p className="text-xs text-neutral-body dark:text-slate-400">{submitMessage}</p>
              )}
            </form>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/jobs/talent"
                className="inline-flex w-full justify-center items-center rounded-lg border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-heading dark:text-slate-100 transition hover:border-brand-600 dark:hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400"
              >
                More profiles
              </Link>
            </div>
          </aside>
        </div>
      </Section>
    </JobsShell>
  );
}
