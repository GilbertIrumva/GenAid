import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";

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
      {/* ============ HERO SECTION (SIR AFRICA STYLE HERO BANNER) ============ */}
      <section id="home" className="relative w-full overflow-hidden min-h-[600px] sm:min-h-[650px] lg:min-h-[700px] flex items-center bg-[#172554] gatsby-hero-bg">
        {/* Edge-to-Edge Full Width Image Background with Soft Parallax */}
        <motion.div
          animate={{
            scale: [1, 1.06, 1.02, 1],
            rotate: [0, 1, -1, 0],
            x: [0, -15, 15, 0],
          }}
          transition={{
            duration: 22,
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
            className="h-full w-full object-cover contrast-[1.15] brightness-[0.88] saturate-[1.1]"
          />
        </motion.div>

        {/* Deep Royal Blue Gradient Overlay (No Black) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#172554]/95 via-[#172554]/85 to-[#172554]/60 pointer-events-none" />


        {/* Hero Content Box */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-white space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              <span>Refugee-Led Innovation Hub</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl font-serif leading-[1.12] !text-white">
              <span className="!text-white">{t("home.hero.titleStart")}</span>{" "}
              <span className="!text-white italic font-normal">
                {t("home.hero.titleHighlight")}
              </span>{" "}
              <span className="!text-white">{t("home.hero.titleEnd")}</span>
            </h1>

            <div className="sir-callout-border border-l-white !text-white !my-4">
              <p className="text-base sm:text-lg leading-relaxed font-medium !text-white">
                {t("home.hero.subtitle")}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href="#programs" className="sir-btn-primary py-3.5 px-6 text-sm">
                <span>{t("home.hero.ctaPrograms")}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
              <a href={SITE.donateUrl} target="_blank" rel="noreferrer" className="sir-btn-secondary py-3 px-6 text-sm border-white/60 text-white hover:bg-white hover:text-slate-950 dark:border-white/60 dark:text-white">
                <Heart className="w-4 h-4 fill-brand-400 text-brand-400" />
                <span>{t("home.hero.ctaDonate")}</span>
              </a>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ============ ABOUT SECTION (SIR AFRICA STYLED CANVAS) ============ */}
      <Section id="about" pattern="canvas">
        <div className="mx-auto max-w-4xl text-center">
          <span className="sir-tag">

            {t("home.about.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-5xl font-serif">
            {t("home.about.title")}
          </h2>
          <div className="sir-callout-border mx-auto max-w-3xl text-left border-l-brand-600">
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">{t("home.about.body1")}</p>
            <p className="mt-3 text-slate-600 dark:text-slate-400">{t("home.about.body2")}</p>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
          <div className="sir-card-accent p-8">
            <span className="sir-tag">
              {t("home.about.ourVision")}
            </span>
            <h3 className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-serif">
              {t("home.about.visionTitle")}
            </h3>
            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300">{t("home.about.visionBody")}</p>
          </div>
          <div className="sir-card-accent p-8">
            <span className="sir-tag">
              {t("home.about.ourMission")}
            </span>
            <h3 className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-serif">
              {t("home.about.missionTitle")}
            </h3>
            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300">{t("home.about.missionBody")}</p>
          </div>
        </div>

        <ol className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
          {objectives.map((o, i) => (
            <li key={i} className="sir-card p-6 border-t-4 border-t-brand-600 dark:border-t-brand-500">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-brand-600 dark:bg-brand-500 font-extrabold text-sm text-white shadow-xs">
                0{i + 1}
              </span>
              <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-medium">{o}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <Link
            to="/about"
            className="sir-link-underline font-extrabold text-sm uppercase tracking-wider"
          >
            <span>{t("home.about.readFullStory")}</span>
            <span>→</span>
          </Link>
        </div>

      </Section>

      {/* ============ PROGRAMS SECTION (GATSBY DEEP BLUE IMPACT) ============ */}
      <Section id="programs" pattern="impact">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-block rounded-md bg-white/20 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-white border border-white/30">
              {t("home.programs.eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold !text-white sm:text-4xl lg:text-5xl">
              {t("home.programs.title")}
            </h2>
            <p className="mt-2 text-white text-base">{t("home.programs.subtitle")}</p>
          </div>
          <Link
            to="/programs"
            className="inline-flex items-center gap-1 text-sm font-extrabold text-white hover:text-brand-200 transition-colors uppercase tracking-wider"
          >
            <span>{t("home.programs.viewAll")}</span>
            <span>→</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {focusedPrograms.map((p) => (
            <article
              key={p.title}
              className="sir-card border-slate-200/40 bg-white dark:bg-slate-900"
            >
              <div className="aspect-video w-full overflow-hidden bg-brand-50 dark:bg-slate-950 relative">
                <SmartImage
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 sir-tag bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xs">
                  {p.tag}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-extrabold text-slate-900 dark:text-slate-100">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{p.body}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link to="/programs" className="sir-link-underline text-xs uppercase tracking-wider font-extrabold">
                    <span>Learn Program Details</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ============ CAUSES SECTION ============ */}
      <Section id="causes" pattern="canvas">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="sir-tag">
              {t("home.causes.eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-5xl font-serif">
              {t("home.causes.title")}
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{t("home.causes.subtitle")}</p>
          </div>
          <a
            href={SITE.donateUrl}
            target="_blank"
            rel="noreferrer"
            className="sir-link-underline text-xs uppercase tracking-wider font-extrabold"
          >
            <span>{t("home.causes.donateLink")}</span>
            <span>→</span>
          </a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                className="sir-card-accent"
              >
                <div className="aspect-video w-full overflow-hidden bg-brand-50 dark:bg-slate-950">
                  <SmartImage
                    src={c.image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-extrabold text-slate-900 dark:text-slate-100">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{description}</p>

                    <div className="mt-5">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-brand-600 dark:text-brand-400">
                          ${c.raised.toLocaleString()} {t("home.causes.raised")}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">
                          {t("home.causes.of")} ${c.goal.toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                          className="h-full rounded-full bg-brand-600 dark:bg-brand-500 transition-all duration-500"
                          style={{ width: pct + "%" }}
                        />
                      </div>
                    </div>
                  </div>

                  <a
                    href={c.donateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="sir-btn-primary mt-6 w-full py-2.5 text-xs uppercase tracking-wider"
                  >
                    <span>{t("home.causes.donateToCause")}</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </Section>


      {/* ============ IMPACT METRICS SECTION ============ */}
      <Section id="impact" pattern="impact">
        <div className="text-center">
          <span className="inline-block rounded-md bg-white/20 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-white border border-white/30">
            {t("home.impact.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold !text-white sm:text-4xl lg:text-5xl">
            {t("home.impact.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white text-base sm:text-lg">
            {t("home.impact.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayedStats.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-md"
            >
              <p className="font-display text-4xl sm:text-5xl font-extrabold !text-white tracking-tight">
                {m.value}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider !text-white">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="gatsby-quote-box my-0"
            >
              <h3 className="font-display text-lg font-extrabold text-slate-900 dark:text-slate-100 not-italic">
                {v.title}
              </h3>
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 not-italic font-normal">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ============ TEAM SECTION ============ */}
      <Section id="team" pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sir-tag">
            {t("home.team.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-5xl font-serif">
            {t("home.team.title")}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{t("home.team.subtitle")}</p>
          <p className="mt-3 inline-flex rounded-md bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-slate-700">
            {teamSourceLabel}
          </p>
        </div>

        <TeamSlider members={teamMembers} />
      </Section>

      {/* ============ STORIES / BLOG SECTION ============ */}
      <Section id="stories" pattern="soft">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="sir-tag">
              {t("home.stories.eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-5xl font-serif">
              {t("home.stories.title")}
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{t("home.stories.subtitle")}</p>
          </div>
          <Link
            to="/blog"
            className="sir-link-underline text-xs uppercase tracking-wider font-extrabold"
          >
            <span>{t("home.stories.allArticles")}</span>
            <span>→</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {recentPosts.map((p) => (
            <article
              key={p.slug}
              className="sir-card-accent p-6 flex flex-col justify-between"
            >
              <div>
                <time className="text-[11px] font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {p.date}
                </time>
                <h3 className="mt-3 font-serif text-lg font-extrabold text-slate-900 dark:text-slate-100">
                  <Link to={`/blog/${p.slug}`} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{p.excerpt}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  to={`/blog/${p.slug}`}
                  className="sir-link-underline text-xs uppercase tracking-wider font-extrabold"
                >
                  <span>{t("common.readMoreArrow")}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ============ TESTIMONIALS SECTION ============ */}
      <Section id="testimonials" pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sir-tag">
            {t("home.testimonials.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-5xl font-serif">
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
                className="sir-card p-6 flex flex-col justify-between"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8 text-brand-500 dark:text-brand-400"
                  aria-hidden="true"
                >
                  <path d="M9.4 5.5C6.3 6.3 4 9.2 4 12.6V19h6.4v-6.4H7.3c0-2.1 1.4-3.8 3.4-4.4l-1.3-2.7zm10 0c-3.1.8-5.4 3.7-5.4 7.1V19h6.4v-6.4h-3.1c0-2.1 1.4-3.8 3.4-4.4l-1.3-2.7z" />
                </svg>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-medium italic">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <p className="font-serif text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    {name}
                  </p>
                  <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-0.5">{role}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Section>

      {/* ============ VIDEOS SECTION ============ */}
      <Section id="videos" pattern="soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sir-tag">
            {t("home.videos.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-5xl font-serif">
            {t("home.videos.title")}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{t("home.videos.subtitle")}</p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {fallbackVideos.map((v) => (
            <article
              key={v.title}
              className="sir-card"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <div className="absolute inset-0 grid place-items-center bg-brand-900/40 text-white">
                  <div className="text-center">
                    <svg
                      width="56"
                      height="56"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mx-auto text-brand-400"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <p className="mt-2 text-xs font-extrabold uppercase tracking-wider text-white">
                      {t("common.comingSoon")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-extrabold text-slate-900 dark:text-slate-100">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{v.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ============ DONATE / GET INVOLVED (DEEP ROYAL BLUE BANNER) ============ */}
      <section
        id="donate"
        className="relative isolate overflow-hidden bg-brand-600 dark:bg-blue-900 py-16 text-white sm:py-20 transition-colors border-y border-brand-700 dark:border-blue-800"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-3">
            <span className="inline-block rounded-md bg-white/20 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-white border border-white/30 backdrop-blur-sm">
              Transform Futures
            </span>
            <h2 className="text-3xl font-extrabold !text-white dark:!text-white sm:text-4xl lg:text-5xl font-serif">
              {t("home.donateBlock.title")}
            </h2>
            <p className="mx-auto max-w-2xl text-blue-100 dark:text-blue-100 text-base sm:text-lg">
              {t("home.donateBlock.subtitle")}
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {/* Card 1: Give */}
            <div className="relative rounded-2xl bg-white text-slate-900 p-8 flex flex-col justify-between border border-white shadow-xl overflow-hidden">
              <div>
                <h3 className="font-serif text-2xl font-extrabold text-slate-900">
                  {t("home.donateBlock.give")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {t("home.donateBlock.giveBody")}
                </p>
              </div>
              <a
                href={SITE.donateUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-md transition hover:bg-brand-700"
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
                <span>{t("common.donateNow")}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* Card 2: Sponsor */}
            <div className="relative rounded-2xl bg-white text-slate-900 p-8 flex flex-col justify-between border border-white shadow-xl overflow-hidden">
              <div>
                <h3 className="font-serif text-2xl font-extrabold text-slate-900">
                  {t("home.donateBlock.sponsor")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {t("home.donateBlock.sponsorBody")}
                </p>
              </div>
              <a
                href="#programs"
                className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-md transition hover:bg-brand-700"
              >
                <span>{t("home.donateBlock.sponsorCta")}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* Card 3: Volunteer */}
            <div className="relative rounded-2xl bg-white text-slate-900 p-8 flex flex-col justify-between border border-white shadow-xl overflow-hidden">
              <div>
                <h3 className="font-serif text-2xl font-extrabold text-slate-900">
                  {t("home.donateBlock.volunteer")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {t("home.donateBlock.volunteerBody")}
                </p>
              </div>
              <Link
                to="/contact"
                className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-md transition hover:bg-brand-700"
              >
                <span>{t("common.contactUs", "Contact us")}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ============ CONTACT SECTION ============ */}
      <Section id="contact" pattern="canvas">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="sir-tag">
              {t("home.contact.eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-5xl font-serif">
              {t("home.contact.title")}
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">{t("home.contact.subtitle")}</p>

            <ul className="mt-8 space-y-4 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <span className="font-extrabold text-slate-900 dark:text-slate-200 min-w-[90px]">
                  {t("home.contact.locationLabel")}
                </span>
                <span>{t("home.contact.locationValue")}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-extrabold text-slate-900 dark:text-slate-200 min-w-[90px]">
                  {t("home.contact.emailLabel")}
                </span>
                <a
                  href="mailto:hello@generationaid.org"
                  className="text-brand-600 dark:text-brand-400 font-extrabold hover:underline"
                >
                  hello@generationaid.org
                </a>
              </li>
            </ul>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="space-y-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm sm:p-8"
          >
            <label className="block">
              <span className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                {t("common.name")}
              </span>
              <input
                required
                value={contact.name}
                onChange={(e) =>
                  setContact({ ...contact, name: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-50 outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-1 focus:ring-brand-600"
              />
            </label>

            <label className="block">
              <span className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                {t("common.email")}
              </span>
              <input
                required
                type="email"
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-50 outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-1 focus:ring-brand-600"
              />
            </label>

            <label className="block">
              <span className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                {t("common.message")}
              </span>
              <textarea
                required
                rows={5}
                value={contact.message}
                onChange={(e) =>
                  setContact({ ...contact, message: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-50 outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-1 focus:ring-brand-600"
              />
            </label>

            {contactState === "sent" && (
              <p className="rounded-lg bg-brand-50 dark:bg-brand-950/80 border border-brand-200 px-3.5 py-2.5 text-sm font-bold text-brand-700 dark:text-brand-300">
                {t("common.thanks")}
              </p>
            )}
            {contactState === "error" && contactError && (
              <p className="rounded-lg bg-blue-50 dark:bg-slate-800 border border-brand-300 px-3.5 py-2.5 text-sm font-bold text-brand-700 dark:text-brand-300">
                {contactError}
              </p>
            )}

            <button
              type="submit"
              disabled={contactState === "sending"}
              className="sir-btn-primary w-full py-3 text-xs uppercase tracking-wider disabled:opacity-60"
            >
              <span>
                {contactState === "sending"
                  ? t("common.sending")
                  : t("common.sendMessage")}
              </span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
          </form>
        </div>
      </Section>

    </div>
  );
}
