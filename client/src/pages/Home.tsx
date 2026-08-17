import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import Button from "@/components/ui/Button";
import { posts } from "@/data/posts";
import { videos as fallbackVideos } from "@/data/videos";
import { causes } from "@/data/causes";
import { team } from "@/data/team";
import { testimonials } from "@/data/testimonials";
import { SITE } from "@/data/site";
import { useSEO } from "@/utils/useSEO";
import { useQuery } from "@tanstack/react-query";
import {
  getTeamMembers,
  mapSanityTeamMemberToDisplayTeamMember,
} from "@/lib/sanity";

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

async function submitContact(payload: {
  name: string;
  email: string;
  message: string;
}) {
  await Promise.resolve();
  return { ok: true, message: "Thank you for reaching out!", payload };
}

function TeamSlider({ members }: { members: typeof team }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (members.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % members.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [members.length]);

  const trackOffset = activeIndex * 312;

  return (
    <div className="mx-auto mt-12 max-w-5xl overflow-hidden">
      <div
        className="flex gap-6 transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${trackOffset}px)` }}
      >
        {members.map((member) => {
          return (
            <article
              key={member.key}
              className="w-[288px] shrink-0 overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 text-center shadow-sm sm:w-[320px] lg:w-[340px]"
            >
              <div className="aspect-square w-full overflow-hidden bg-brand-50 dark:bg-slate-900">
                <SmartImage
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {member.role}
                </p>
                <p className="mt-3 text-sm text-neutral-body dark:text-slate-300">{member.bio}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation();
  useSEO({
    title: "Generation Aid — Refugee-led innovation in Kakuma",
    description:
      "Generation Aid equips youth in Kakuma refugee camp with digital skills, entrepreneurship training and pathways to employment.",
  });

  const displayedStats = impactStats;

  const { data: sanityTeam = [] } = useQuery({
    queryKey: ["public", "sanity", "teamMembers"],
    queryFn: getTeamMembers,
    retry: false,
  });

  const teamMembers =
    sanityTeam.length > 0
      ? sanityTeam.map(mapSanityTeamMemberToDisplayTeamMember)
      : team;

  const teamSourceLabel =
    sanityTeam.length > 0
      ? `Live from Studio · ${teamMembers.length} members`
      : `Static fallback · ${teamMembers.length} members`;

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
      const e = err as {
        response?: { data?: { error?: string } };
        message?: string;
      };
      setContactError(
        e.response?.data?.error ?? e.message ?? "Could not send message",
      );
      setContactState("error");
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      {/* ============ HERO SECTION (FULL VIEWPORT-WIDTH HERO BANNER) ============ */}
      <section id="home" className="relative w-full overflow-hidden min-h-[600px] sm:min-h-[650px] lg:min-h-[700px] flex items-center bg-slate-950">
        {/* Edge-to-Edge Full Width Swinging Image Background */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1.03, 1],
            rotate: [0, 1.5, -1.5, 0],
            x: [0, -20, 20, 0],
            y: [0, -10, 10, 0],
          }}
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] pointer-events-none"
        >
          <SmartImage
            src="/home.jpg"
            alt="Refugee youth in a Generation Aid training session in Kakuma"
            fallbackLabel=""
            className="h-full w-full object-cover contrast-[1.12] brightness-[0.92] saturate-[1.08]"
          />
        </motion.div>

        {/* High Contrast Gradient Overlay for Perfect Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/50 pointer-events-none" />

        {/* Hero Text Directly on Full-Width Image Background */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl text-white"
          >
            {/* White & Blue H1 Title */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl font-display leading-[1.15]">
              <span className="text-white">{t("home.hero.titleStart")}</span>{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                {t("home.hero.titleHighlight")}
              </span>{" "}
              <span className="text-white">{t("home.hero.titleEnd")}</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-200 max-w-xl">
              {t("home.hero.subtitle")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#programs">
                <Button variant="primary" size="xl" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  {t("home.hero.ctaPrograms")}
                </Button>
              </a>
              <a href={SITE.donateUrl} target="_blank" rel="noreferrer">
                <Button
                  size="xl"
                  variant="outline"
                  leftIcon={<Heart className="w-5 h-5 fill-blue-400 text-blue-400" />}
                  className="border-white/50 bg-white/10 hover:bg-white/20 text-white font-bold backdrop-blur-md dark:border-white/50 dark:text-white"
                >
                  {t("home.hero.ctaDonate")}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ ABOUT (Pattern A: Canvas) ============ */}
      <Section id="about" pattern="canvas">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            {t("home.about.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            {t("home.about.title")}
          </h2>
          <p className="mt-5 text-lg text-neutral-body dark:text-slate-300">{t("home.about.body1")}</p>
          <p className="mt-4 text-neutral-body dark:text-slate-300">{t("home.about.body2")}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              {t("home.about.ourVision")}
            </span>
            <h3 className="mt-3 text-2xl font-bold text-neutral-heading dark:text-slate-100">
              {t("home.about.visionTitle")}
            </h3>
            <p className="mt-4 text-neutral-body dark:text-slate-300">{t("home.about.visionBody")}</p>
          </div>
          <div className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              {t("home.about.ourMission")}
            </span>
            <h3 className="mt-3 text-2xl font-bold text-neutral-heading dark:text-slate-100">
              {t("home.about.missionTitle")}
            </h3>
            <p className="mt-4 text-neutral-body dark:text-slate-300">{t("home.about.missionBody")}</p>
          </div>
        </div>

        <ol className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
          {objectives.map((o, i) => (
            <li key={i} className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 dark:bg-brand-500 font-display text-sm font-bold text-white">
                {i + 1}
              </span>
              <p className="mt-4 text-sm text-neutral-body dark:text-slate-300">{o}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <Link
            to="/about"
            className="inline-block text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline underline-offset-4"
          >
            {t("home.about.readFullStory")}
          </Link>
        </div>
      </Section>

      {/* ============ PROGRAMS (Pattern C: Solid Primary Blue Impact) ============ */}
      <Section id="programs" pattern="impact">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              {t("home.programs.eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              {t("home.programs.title")}
            </h2>
            <p className="mt-2 text-brand-100">{t("home.programs.subtitle")}</p>
          </div>
          <Link
            to="/programs"
            className="text-sm font-semibold text-white hover:text-brand-100 hover:underline underline-offset-4"
          >
            {t("home.programs.viewAll")}
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {focusedPrograms.map((p) => (
            <article
              key={p.title}
              className="group overflow-hidden rounded-xl border border-white/20 bg-white dark:bg-slate-800 transition hover:border-white/40 hover:shadow-lg"
            >
              <div className="aspect-video w-full overflow-hidden bg-brand-50 dark:bg-slate-900">
                <SmartImage
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {p.tag}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-body dark:text-slate-300">{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ============ CAUSES (Pattern A: Canvas) ============ */}
      <Section id="causes" pattern="canvas">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
              {t("home.causes.eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
              {t("home.causes.title")}
            </h2>
            <p className="mt-2 text-neutral-body dark:text-slate-300">{t("home.causes.subtitle")}</p>
          </div>
          <a
            href={SITE.donateUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline underline-offset-4"
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
                className="overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
              >
                <div className="aspect-video w-full overflow-hidden bg-brand-50 dark:bg-slate-900">
                  <SmartImage
                    src={c.image}
                    alt={title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-body dark:text-slate-300">{description}</p>

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-brand-600 dark:text-brand-400">
                        ${c.raised.toLocaleString()} {t("home.causes.raised")}
                      </span>
                      <span className="text-neutral-body dark:text-slate-400">
                        {t("home.causes.of")} ${c.goal.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-brand-100 dark:bg-slate-700">
                      <div
                        className="h-full rounded-full bg-brand-600 dark:bg-brand-500"
                        style={{ width: pct + "%" }}
                      />
                    </div>
                  </div>

                  <a
                    href={c.donateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-block rounded-lg bg-brand-600 dark:bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 dark:hover:bg-brand-400 transition"
                  >
                    {t("home.causes.donateToCause")}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* ============ IMPACT (Pattern C: Solid Primary Blue Impact) ============ */}
      <Section id="impact" pattern="impact">
        <div className="text-center">
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            {t("home.impact.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {t("home.impact.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-brand-100">
            {t("home.impact.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayedStats.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur"
            >
              <p className="font-display text-4xl font-bold text-white">
                {m.value}
              </p>
              <p className="mt-2 text-sm text-brand-100">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3 text-neutral-body dark:text-slate-300">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-xl border-l-4 border-white dark:border-brand-400 bg-white dark:bg-slate-800 p-6 shadow-md"
            >
              <h3 className="font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                {v.title}
              </h3>
              <p className="mt-3 text-sm text-neutral-body dark:text-slate-300">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ============ TEAM (Pattern A: Canvas) ============ */}
      <Section id="team" pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            {t("home.team.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            {t("home.team.title")}
          </h2>
          <p className="mt-3 text-neutral-body dark:text-slate-300">{t("home.team.subtitle")}</p>
          <p className="mt-3 inline-flex rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            {teamSourceLabel}
          </p>
        </div>

        <TeamSlider members={teamMembers} />
      </Section>

      {/* ============ STORIES / BLOG (Pattern B: Soft Contrast) ============ */}
      <Section id="stories" pattern="soft">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
              {t("home.stories.eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
              {t("home.stories.title")}
            </h2>
            <p className="mt-2 text-neutral-body dark:text-slate-300">{t("home.stories.subtitle")}</p>
          </div>
          <Link
            to="/blog"
            className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline underline-offset-4"
          >
            {t("home.stories.allArticles")}
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {recentPosts.map((p) => (
            <article
              key={p.slug}
              className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 transition hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md"
            >
              <time className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {p.date}
              </time>
              <h3 className="mt-3 font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                <Link to={`/blog/${p.slug}`} className="hover:text-brand-600 dark:hover:text-brand-400">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-neutral-body dark:text-slate-300">{p.excerpt}</p>
              <Link
                to={`/blog/${p.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline underline-offset-4"
              >
                {t("common.readMoreArrow")}
              </Link>
            </article>
          ))}
        </div>
      </Section>

      {/* ============ TESTIMONIALS (Pattern A: Canvas) ============ */}
      <Section id="testimonials" pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            {t("home.testimonials.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            {t("home.testimonials.title")}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => {
            const quote = t(
              `home.testimonials.items.${item.key}.quote`,
              item.quote,
            );
            const name = t(
              `home.testimonials.items.${item.key}.name`,
              item.name,
            );
            const role = t(
              `home.testimonials.items.${item.key}.role`,
              item.role,
            );
            return (
              <figure
                key={item.key}
                className="flex h-full flex-col rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-7 w-7 text-brand-300 dark:text-brand-500"
                  aria-hidden="true"
                >
                  <path d="M9.4 5.5C6.3 6.3 4 9.2 4 12.6V19h6.4v-6.4H7.3c0-2.1 1.4-3.8 3.4-4.4l-1.3-2.7zm10 0c-3.1.8-5.4 3.7-5.4 7.1V19h6.4v-6.4h-3.1c0-2.1 1.4-3.8 3.4-4.4l-1.3-2.7z" />
                </svg>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-neutral-heading dark:text-slate-100">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-neutral-border dark:border-slate-700 pt-4">
                  <p className="font-display text-sm font-semibold text-neutral-heading dark:text-slate-100">
                    {name}
                  </p>
                  <p className="text-xs text-neutral-body dark:text-slate-400">{role}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Section>

      {/* ============ VIDEOS (Pattern B: Soft Contrast) ============ */}
      <Section id="videos" pattern="soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            {t("home.videos.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            {t("home.videos.title")}
          </h2>
          <p className="mt-3 text-neutral-body dark:text-slate-300">{t("home.videos.subtitle")}</p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {fallbackVideos.map((v) => (
            <article
              key={v.title}
              className="overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-brand-100 dark:bg-slate-900">
                <div className="absolute inset-0 grid place-items-center bg-brand-600/30 text-white">
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
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white">
                      {t("common.comingSoon")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-body dark:text-slate-300">{v.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ============ DONATE / GET INVOLVED ============ */}
      <section
        id="donate"
        className="relative isolate overflow-hidden bg-brand-600 dark:bg-brand-900 py-16 text-white sm:py-20 transition-colors border-y border-brand-700 dark:border-brand-800"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl font-display">
              {t("home.donateBlock.title")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-brand-100 text-base sm:text-lg">
              {t("home.donateBlock.subtitle")}
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {/* Card 1: Give */}
            <div className="flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-xl border border-slate-200/80 dark:border-slate-700/80">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  {t("home.donateBlock.give")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {t("home.donateBlock.giveBody")}
                </p>
              </div>
              <a
                href={SITE.donateUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 dark:bg-brand-500 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-brand-700 dark:hover:bg-brand-400 transition"
              >
                <svg
                  aria-hidden
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21s-7-4.534-9.5-9.07C.94 8.94 2.4 5.5 5.6 5.5c1.74 0 3.41 1 4.4 2.5 1-1.5 2.66-2.5 4.4-2.5 3.2 0 4.66 3.44 3.1 6.43C19 16.466 12 21 12 21z" />
                </svg>
                {t("common.donateNow")}
              </a>
            </div>

            {/* Card 2: Sponsor */}
            <div className="flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-xl border border-slate-200/80 dark:border-slate-700/80">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  {t("home.donateBlock.sponsor")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {t("home.donateBlock.sponsorBody")}
                </p>
              </div>
              <a
                href="#programs"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-50 dark:bg-slate-700/70 border border-brand-200 dark:border-slate-600 px-5 py-3 text-sm font-bold text-brand-700 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-slate-700 transition"
              >
                {t("home.donateBlock.sponsorCta")}
              </a>
            </div>

            {/* Card 3: Volunteer */}
            <div className="flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-xl border border-slate-200/80 dark:border-slate-700/80">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  {t("home.donateBlock.volunteer")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {t("home.donateBlock.volunteerBody")}
                </p>
              </div>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-50 dark:bg-slate-700/70 border border-brand-200 dark:border-slate-600 px-5 py-3 text-sm font-bold text-brand-700 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-slate-700 transition"
              >
                {t("common.contactUs", "Contact us")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT (Pattern A: Canvas) ============ */}
      <Section id="contact" pattern="canvas">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
              {t("home.contact.eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
              {t("home.contact.title")}
            </h2>
            <p className="mt-4 text-neutral-body dark:text-slate-300">{t("home.contact.subtitle")}</p>

            <ul className="mt-8 space-y-3 text-sm text-neutral-body dark:text-slate-300">
              <li>
                <span className="font-semibold text-neutral-heading dark:text-slate-200">
                  {t("home.contact.locationLabel")}
                </span>{" "}
                {t("home.contact.locationValue")}
              </li>
              <li>
                <span className="font-semibold text-neutral-heading dark:text-slate-200">
                  {t("home.contact.emailLabel")}
                </span>{" "}
                <a
                  href="mailto:hello@generationaid.org"
                  className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline underline-offset-4"
                >
                  hello@generationaid.org
                </a>
              </li>
            </ul>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="space-y-4 rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm sm:p-8"
          >
            <label className="block">
              <span className="block text-sm font-semibold text-neutral-heading dark:text-slate-200">
                {t("common.name")}
              </span>
              <input
                required
                value={contact.name}
                onChange={(e) =>
                  setContact({ ...contact, name: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-neutral-heading dark:text-slate-50 outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-1 focus:ring-brand-600 dark:focus:ring-brand-500"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-semibold text-neutral-heading dark:text-slate-200">
                {t("common.email")}
              </span>
              <input
                required
                type="email"
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-neutral-heading dark:text-slate-50 outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-1 focus:ring-brand-600 dark:focus:ring-brand-500"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-semibold text-neutral-heading dark:text-slate-200">
                {t("common.message")}
              </span>
              <textarea
                required
                rows={5}
                value={contact.message}
                onChange={(e) =>
                  setContact({ ...contact, message: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-neutral-heading dark:text-slate-50 outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-1 focus:ring-brand-600 dark:focus:ring-brand-500"
              />
            </label>

            {contactState === "sent" && (
              <p className="rounded-lg bg-brand-50 dark:bg-slate-700 px-3 py-2 text-sm font-medium text-brand-700 dark:text-brand-300">
                {t("common.thanks")}
              </p>
            )}
            {contactState === "error" && contactError && (
              <p className="rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 px-3 py-2 text-sm font-medium text-red-700 dark:text-red-300">
                {contactError}
              </p>
            )}

            <button
              type="submit"
              disabled={contactState === "sending"}
              className="w-full rounded-lg bg-brand-600 dark:bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 dark:hover:bg-brand-400 disabled:opacity-60 transition"
            >
              {contactState === "sending"
                ? t("common.sending")
                : t("common.sendMessage")}
            </button>
          </form>
        </div>
      </Section>
    </div>
  );
}
