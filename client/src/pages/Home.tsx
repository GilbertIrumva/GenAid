import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { api } from "@/api/client";
import { posts } from "@/data/posts";
import { videos as fallbackVideos } from "@/data/videos";
import { causes } from "@/data/causes";
import { team } from "@/data/team";
import { testimonials } from "@/data/testimonials";
import { SITE } from "@/data/site";
import { useSEO } from "@/utils/useSEO";

interface ApiVideo {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  createdAt: string;
}

const objectives = [
  "Empower refugees with knowledge and skills — education, digital skills, livelihood and entrepreneurship — so they can earn a sustainable income through remote work.",
  "Equip refugees with the essential competencies to navigate the digital world, fostering creativity and problem-solving.",
  "Build sustainable community development through long-term initiatives in education, entrepreneurship and social support.",
];

const focusedPrograms = [
  {
    tag: "Digital Livelihood",
    title: "Computer Literacy Skills",
    body: "ICT and digital literacy training that prepares refugee youth for both online and offline careers.",
    image: "/img/team/programs.jpg",
  },
  {
    tag: "Youth Digital Skills",
    title: "Remote Work Bootcamp",
    body: "Graphic design, content writing and virtual assistance — connecting youth to global remote work.",
    image: "/img/causes/jobs.jpg",
  },
  {
    tag: "Creativity",
    title: "Kakuma Art Project",
    body: "A platform for refugee artists — workshops, materials and visibility through the Senga Gallery.",
    image: "/img/causes/artists.jpg",
  },
];

const impactStats = [
  { value: "2,400+", label: "Youth trained" },
  { value: "85%", label: "Employment rate" },
  { value: "60+", label: "Partner organisations" },
  { value: "12", label: "Active programs" },
];

interface ApiImpactMetric {
  _id: string;
  title: string;
  value: number;
  icon: string;
  order: number;
}

function formatMetric(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M+`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}k+`;
  return n.toLocaleString();
}

const values = [
  {
    title: "Refugee-led, community-driven",
    body: "We work as a group of passionate refugees and make sure youth voices in the community are heard.",
  },
  {
    title: "Accountability & Transparency",
    body: "We are answerable for our actions and conduct every activity with full transparency.",
  },
  {
    title: "Self-reliance",
    body: "We build self-sustaining pathways so the organisation can keep supporting the community.",
  },
];

const recentPosts = posts.slice(0, 3);

async function fetchVideos(): Promise<ApiVideo[]> {
  const { data } = await api.get<ApiVideo[]>("/videos");
  return data;
}

async function submitContact(payload: {
  name: string;
  email: string;
  message: string;
}) {
  const { data } = await api.post("/contact", payload);
  return data;
}

export default function Home() {
  const { t } = useTranslation();
  useSEO({
    title: "Generation Aid — Refugee-led innovation in Kakuma",
    description:
      "Generation Aid equips youth in Kakuma refugee camp with digital skills, entrepreneurship training and pathways to employment.",
  });

  const { data: apiVideos = [] } = useQuery({
    queryKey: ["public", "videos"],
    queryFn: fetchVideos,
  });

  const { data: apiMetrics = [] } = useQuery<ApiImpactMetric[]>({
    queryKey: ["public", "impact"],
    queryFn: async () => {
      const { data } = await api.get<ApiImpactMetric[]>("/impact");
      return data;
    },
  });

  const displayedStats =
    apiMetrics.length > 0
      ? apiMetrics
          .slice()
          .sort((a, b) => a.order - b.order)
          .slice(0, 4)
          .map((m) => ({ value: formatMetric(m.value), label: m.title }))
      : impactStats;

  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [contactState, setContactState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [contactError, setContactError] = useState<string | null>(null);

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setContactState("sending");
    setContactError(null);
    try {
      await submitContact(contact);
      setContactState("sent");
      setContact({ name: "", email: "", message: "" });
    } catch (err) {
      const e = err as { response?: { data?: { error?: string } }; message?: string };
      setContactError(e.response?.data?.error ?? e.message ?? "Could not send message");
      setContactState("error");
    }
  }

  return (
    <>
      {/* ============ HERO ============ */}
      <section
        id="home"
        className="relative isolate flex min-h-[80vh] items-center overflow-hidden"
      >
        {/* Background image */}
        <SmartImage
          src="/home.jpg"
          alt="Refugee youth in a Generation Aid training session in Kakuma"
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover dark:opacity-85"
        />
        {/* Dark gradient overlay so white text stays readable */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b1729]/80 via-[#0b1729]/60 to-[#0b1729]/30 dark:from-black/85 dark:via-black/70 dark:to-black/45"
        />

        <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-2xl text-white">
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
              <span aria-hidden className="inline-block h-1.5 w-6 rounded-full bg-brand-red-500" />
              {t("home.hero.eyebrow")}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {t("home.hero.titleStart")} <br />
              <span className="text-primary-400">{t("home.hero.titleHighlight")}</span>{" "}
              {t("home.hero.titleEnd")}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/90">
              {t("home.hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#programs"
                className="rounded-md bg-primary-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600"
              >
                {t("home.hero.ctaPrograms")}
              </a>
              <a
                href={SITE.donateUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-white/70 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {t("home.hero.ctaDonate")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <Section id="about" className="bg-surface">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* TODO: replace with real Generation Aid photo */}
          <div className="order-2 overflow-hidden rounded-3xl shadow-lg lg:order-1">
            <SmartImage
              src="/img/home/featured-banner.jpg"
              alt="Generation Aid staff and youth gathered together"
              fallbackLabel=""
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
              {t("home.about.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
              {t("home.about.title")}
            </h2>
            <p className="mt-5 text-lg text-muted">{t("home.about.body1")}</p>
            <p className="mt-4 text-muted">{t("home.about.body2")}</p>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-bg p-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              {t("home.about.ourVision")}
            </span>
            <h3 className="mt-3 text-2xl font-bold text-ink">{t("home.about.visionTitle")}</h3>
            <p className="mt-4 text-muted">{t("home.about.visionBody")}</p>
          </div>
          <div className="rounded-2xl border border-line bg-bg p-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              {t("home.about.ourMission")}
            </span>
            <h3 className="mt-3 text-2xl font-bold text-ink">{t("home.about.missionTitle")}</h3>
            <p className="mt-4 text-muted">{t("home.about.missionBody")}</p>
          </div>
        </div>

        <ol className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
          {objectives.map((o, i) => (
            <li key={i} className="rounded-2xl border border-line bg-bg p-6">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-500 font-display text-sm font-bold text-white">
                {i + 1}
              </span>
              <p className="mt-4 text-sm text-muted">{o}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <Link
            to="/about"
            className="inline-block text-sm font-semibold text-primary-600 hover:underline"
          >
            {t("home.about.readFullStory")}
          </Link>
        </div>
      </Section>

      {/* ============ PROGRAMS ============ */}
      <Section id="programs">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
              {t("home.programs.eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              {t("home.programs.title")}
            </h2>
            <p className="mt-2 text-muted">{t("home.programs.subtitle")}</p>
          </div>
          <Link
            to="/programs"
            className="text-sm font-semibold text-primary-600 hover:underline"
          >
            {t("home.programs.viewAll")}
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {focusedPrograms.map((p) => (
            <article
              key={p.title}
              className="group overflow-hidden rounded-2xl border border-line bg-surface transition hover:border-primary-300 hover:shadow-md"
            >
              <div className="aspect-video w-full overflow-hidden bg-primary-50">
                <SmartImage
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                  {p.tag}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ============ CAUSES ============ */}
      <Section id="causes" className="bg-surface">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
              {t("home.causes.eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              {t("home.causes.title")}
            </h2>
            <p className="mt-2 text-muted">{t("home.causes.subtitle")}</p>
          </div>
          <a
            href={SITE.donateUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-primary-600 hover:underline"
          >
            {t("home.causes.donateLink")}
          </a>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {causes.map((c) => {
            const pct = Math.min(100, Math.round((c.raised / c.goal) * 100));
            const title = t(`home.causes.items.${c.key}.title`, c.title);
            const description = t(
              `home.causes.items.${c.key}.description`,
              c.description,
            );
            return (
              <article
                key={c.key}
                className="overflow-hidden rounded-2xl border border-line bg-bg transition hover:border-primary-300 hover:shadow-md"
              >
                <div className="aspect-video w-full overflow-hidden bg-primary-50">
                  <SmartImage
                    src={c.image}
                    alt={title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{description}</p>

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-primary-600">
                        ${c.raised.toLocaleString()} {t("home.causes.raised")}
                      </span>
                      <span className="text-muted">
                        {t("home.causes.of")} ${c.goal.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-primary-50">
                      <div
                        className="h-full rounded-full bg-primary-500"
                        style={{ width: pct + "%" }}
                      />
                    </div>
                  </div>

                  <a
                    href={c.donateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-block rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600"
                  >
                    {t("home.causes.donateToCause")}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* ============ IMPACT ============ */}
      <Section id="impact" className="bg-surface">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            {t("home.impact.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            {t("home.impact.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">{t("home.impact.subtitle")}</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayedStats.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-line bg-bg p-6 text-center"
            >
              <p className="font-display text-4xl font-bold text-brand-red-600">
                {m.value}
              </p>
              <p className="mt-2 text-sm text-muted">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border-l-4 border-primary-500 bg-bg p-6 shadow-sm"
            >
              <h3 className="font-display text-lg font-semibold text-ink">{v.title}</h3>
              <p className="mt-3 text-sm text-muted">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ============ TEAM ============ */}
      <Section id="team">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            {t("home.team.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            {t("home.team.title")}
          </h2>
          <p className="mt-3 text-muted">{t("home.team.subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => {
            const name = t(`home.team.items.${m.key}.name`, m.name);
            const role = t(`home.team.items.${m.key}.role`, m.role);
            const bio = t(`home.team.items.${m.key}.bio`, m.bio);
            return (
              <article
                key={m.key}
                className="overflow-hidden rounded-2xl border border-line bg-surface text-center shadow-sm"
              >
                <div className="aspect-square w-full overflow-hidden bg-primary-50">
                  <SmartImage
                    src={m.image}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
                    {role}
                  </p>
                  <p className="mt-3 text-sm text-muted">{bio}</p>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block text-xs font-semibold text-primary-600 hover:underline"
                    >
                      {t("home.team.connectLinkedIn")}
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* ============ STORIES / BLOG ============ */}
      <Section id="stories">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
              {t("home.stories.eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              {t("home.stories.title")}
            </h2>
            <p className="mt-2 text-muted">{t("home.stories.subtitle")}</p>
          </div>
          <Link to="/blog" className="text-sm font-semibold text-primary-600 hover:underline">
            {t("home.stories.allArticles")}
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {recentPosts.map((p) => (
            <article
              key={p.slug}
              className="rounded-2xl border border-line bg-surface p-6 transition hover:border-primary-300 hover:shadow-md"
            >
              <time className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                {p.date}
              </time>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                <Link to={`/blog/${p.slug}`} className="hover:text-primary-600">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
              <Link
                to={`/blog/${p.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:underline"
              >
                {t("common.readMoreArrow")}
              </Link>
            </article>
          ))}
        </div>
      </Section>

      {/* ============ TESTIMONIALS ============ */}
      <Section id="testimonials" className="bg-surface">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            {t("home.testimonials.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            {t("home.testimonials.title")}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => {
            const quote = t(`home.testimonials.items.${item.key}.quote`, item.quote);
            const name = t(`home.testimonials.items.${item.key}.name`, item.name);
            const role = t(`home.testimonials.items.${item.key}.role`, item.role);
            return (
              <figure
                key={item.key}
                className="flex h-full flex-col rounded-2xl border border-line bg-bg p-6 shadow-sm"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-7 w-7 text-primary-300"
                  aria-hidden="true"
                >
                  <path d="M9.4 5.5C6.3 6.3 4 9.2 4 12.6V19h6.4v-6.4H7.3c0-2.1 1.4-3.8 3.4-4.4l-1.3-2.7zm10 0c-3.1.8-5.4 3.7-5.4 7.1V19h6.4v-6.4h-3.1c0-2.1 1.4-3.8 3.4-4.4l-1.3-2.7z" />
                </svg>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <p className="font-display text-sm font-semibold text-ink">{name}</p>
                  <p className="text-xs text-muted">{role}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Section>

      {/* ============ VIDEOS ============ */}
      <Section id="videos" className="bg-surface">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            {t("home.videos.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            {t("home.videos.title")}
          </h2>
          <p className="mt-3 text-muted">{t("home.videos.subtitle")}</p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {apiVideos.length > 0
            ? apiVideos.slice(0, 3).map((v) => (
                <article
                  key={v._id}
                  className="overflow-hidden rounded-2xl border border-line bg-bg transition hover:border-primary-300 hover:shadow-md"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-[#0b1729]">
                    <video
                      src={v.videoUrl}
                      poster={v.posterUrl || undefined}
                      controls
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{v.description}</p>
                  </div>
                </article>
              ))
            : fallbackVideos.map((v) => (
                <article
                  key={v.title}
                  className="overflow-hidden rounded-2xl border border-line bg-bg"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-[#0b1729]">
                    <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-primary-500/20 to-primary-900/40 text-white">
                      <div className="text-center">
                        <svg
                          width="56"
                          height="56"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="mx-auto"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-wider">
                          {t("common.comingSoon")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{v.description}</p>
                  </div>
                </article>
              ))}
        </div>
      </Section>

      {/* ============ DONATE / GET INVOLVED ============ */}
      <section
        id="donate"
        className="relative isolate overflow-hidden bg-primary-600 py-16 text-white sm:py-20"
      >
        {/* TODO: replace with real Generation Aid photo */}
        <SmartImage
          src="/img/heroes/about-team-cta.jpg"
          alt="Hands joining together in support"
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-700/90 via-primary-600/85 to-primary-500/80"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{t("home.donateBlock.title")}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-primary-100">{t("home.donateBlock.subtitle")}</p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
              <h3 className="font-display text-lg font-semibold">{t("home.donateBlock.give")}</h3>
              <p className="mt-2 text-sm text-primary-100">{t("home.donateBlock.giveBody")}</p>
              <a
                href={SITE.donateUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-brand-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-red-700"
              >
                <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.534-9.5-9.07C.94 8.94 2.4 5.5 5.6 5.5c1.74 0 3.41 1 4.4 2.5 1-1.5 2.66-2.5 4.4-2.5 3.2 0 4.66 3.44 3.1 6.43C19 16.466 12 21 12 21z" /></svg>
                {t("common.donateNow")}
              </a>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
              <h3 className="font-display text-lg font-semibold">{t("home.donateBlock.sponsor")}</h3>
              <p className="mt-2 text-sm text-primary-100">{t("home.donateBlock.sponsorBody")}</p>
              <a
                href="#programs"
                className="mt-5 inline-block rounded-md border border-white/40 px-4 py-2 text-sm font-semibold hover:bg-white/10"
              >
                {t("home.donateBlock.sponsorCta")}
              </a>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
              <h3 className="font-display text-lg font-semibold">{t("home.donateBlock.volunteer")}</h3>
              <p className="mt-2 text-sm text-primary-100">{t("home.donateBlock.volunteerBody")}</p>
              <a
                href="#contact"
                className="mt-5 inline-block rounded-md border border-white/40 px-4 py-2 text-sm font-semibold hover:bg-white/10"
              >
                {t("common.getInTouch")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <Section id="contact">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
              {t("home.contact.eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              {t("home.contact.title")}
            </h2>
            <p className="mt-4 text-muted">{t("home.contact.subtitle")}</p>

            <ul className="mt-8 space-y-3 text-sm text-muted">
              <li>
                <span className="font-semibold text-ink">{t("home.contact.locationLabel")}</span>{" "}
                {t("home.contact.locationValue")}
              </li>
              <li>
                <span className="font-semibold text-ink">{t("home.contact.emailLabel")}</span>{" "}
                <a href="mailto:hello@generationaid.org" className="text-primary-600 hover:underline">
                  hello@generationaid.org
                </a>
              </li>
            </ul>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="space-y-4 rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8"
          >
            <label className="block">
              <span className="block text-sm font-semibold text-ink">{t("common.name")}</span>
              <input
                required
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-semibold text-ink">{t("common.email")}</span>
              <input
                required
                type="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-semibold text-ink">{t("common.message")}</span>
              <textarea
                required
                rows={5}
                value={contact.message}
                onChange={(e) => setContact({ ...contact, message: e.target.value })}
                className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
              />
            </label>

            {contactState === "sent" && (
              <p className="rounded-md bg-primary-50 px-3 py-2 text-sm text-primary-700">
                {t("common.thanks")}
              </p>
            )}
            {contactState === "error" && contactError && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                {contactError}
              </p>
            )}

            <button
              type="submit"
              disabled={contactState === "sending"}
              className="w-full rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-60"
            >
              {contactState === "sending" ? t("common.sending") : t("common.sendMessage")}
            </button>
          </form>
        </div>
      </Section>
    </>
  );
}
