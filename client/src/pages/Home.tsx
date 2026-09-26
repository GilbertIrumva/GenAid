import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";

import { posts } from "@/data/posts";
import { videos as fallbackVideos } from "@/data/videos";
import { causes } from "@/data/causes";
import { team, advisors } from "@/data/team";
import { testimonials } from "@/data/testimonials";
import { SITE } from "@/data/site";
import { defaultPrograms } from "@/data/programsData";
import { useSEO } from "@/utils/useSEO";
import { useQuery } from "@tanstack/react-query";
import {
  getPrograms,
  getTeamMembers,
  mapSanityProgramToDisplayProgram,
  mapSanityTeamMemberToDisplayTeamMember,
} from "@/lib/sanity";

interface DisplayTeamMember {
  key: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
}

function MemberCard({ member }: { member: DisplayTeamMember }) {
  return (
    <div className="group relative h-full rounded-2xl bg-white dark:bg-slate-800/90 p-6 border border-neutral-border dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
      <div className="relative h-44 w-44 overflow-hidden rounded-2xl border-2 border-brand-100 dark:border-slate-700 shadow-md group-hover:border-brand-500 transition-colors">
        <SmartImage
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <h3 className="mt-5 font-serif text-xl font-bold text-neutral-heading dark:text-slate-100">
        {member.name}
      </h3>

      <div className="mt-1.5">
        <span className="inline-flex rounded-full bg-brand-50 dark:bg-brand-950/60 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 border border-brand-200/70 dark:border-brand-800/70">
          {member.role}
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-neutral-body dark:text-slate-300 text-center">
        {member.bio}
      </p>

      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} LinkedIn`}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-300 transition-colors"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          <span>LinkedIn</span>
        </a>
      )}
    </div>
  );
}

function TeamSlider({ members }: { members: DisplayTeamMember[] }) {
  if (!members || members.length === 0) return null;

  const duplicated = [...members, ...members, ...members];

  return (
    <div className="relative mx-auto mt-12 max-w-7xl px-4 sm:px-6 overflow-hidden">
      {/* Soft gradient edge masks for cinematic video-like flow */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 sm:w-20 bg-gradient-to-r from-white dark:from-slate-900 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 sm:w-20 bg-gradient-to-l from-white dark:from-slate-900 to-transparent" />

      <div className="overflow-hidden py-4">
        <motion.div
          className="flex gap-6 w-max"
          animate={{
            x: ["0%", "-33.333333%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: Math.max(members.length * 6, 25),
              ease: "linear",
            },
          }}
        >
          {duplicated.map((member, idx) => (
            <div key={`${member.key}-${idx}`} className="w-[312px] shrink-0">
              <MemberCard member={member} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

const objectives = [
  "Expand access to quality education and digital skills by providing inclusive training that prepares refugees and host community members for the digital economy.",
  "Promote sustainable livelihoods and decent employment through entrepreneurship, vocational training, job readiness, and connections to local and global work opportunities.",
  "Empower women, youth, and persons with disabilities by creating inclusive programs that reduce barriers to education, leadership, and economic participation.",
  "Strengthen community resilience through innovation and partnerships by collaborating with governments, NGOs, the private sector, and local communities to develop scalable, locally led solutions.",
];

const impactStats = [
  {
    value: "1,600+",
    label: "People Directly Impacted",
    description: "Through our education, livelihood, and humanitarian programs.",
  },
  {
    value: "1,200+",
    label: "Indirect Community Reach",
    description: "People reached through indirect community impact.",
  },
  {
    value: "700+",
    label: "Refugees & Youth Trained",
    description: "Equipped in digital and professional skills for self-reliance.",
  },
  {
    value: "50+",
    label: "Graduates Employed",
    description: "Connected to employment and income-generating opportunities.",
  },
  {
    value: "210",
    label: "Emergency Aid Recipients",
    description: "Vulnerable individuals supported with emergency food & medical assistance.",
  },
  {
    value: "Global",
    label: "Partner Collaboration",
    description: "Multiple local and international partners expanding opportunities.",
  },
];

const impactBullets = [
  "1,600+ people directly impacted through our education, livelihood, and humanitarian programs.",
  "1,200+ people reached through indirect community impact.",
  "700+ refugees and vulnerable youth trained in digital and professional skills.",
  "50+ graduates connected to employment and income opportunities.",
  "210 vulnerable individuals supported with emergency food and medical assistance.",
  "Multiple local and international partners collaborating to expand opportunities for refugees.",
  "Programs serving refugees and host communities in Kakuma Refugee Camp, Kenya.",
];

const values = [
  {
    title: "Empowerment",
    body: "We equip refugees and vulnerable communities with the knowledge, skills, and opportunities they need to become self-reliant and create lasting change.",
  },
  {
    title: "Innovation",
    body: "We embrace technology, creativity, and locally led solutions to address complex challenges and expand access to education, livelihoods, and opportunity.",
  },
  {
    title: "Integrity",
    body: "We act with honesty, transparency, accountability, and respect, building trust with the communities we serve and the partners we work with.",
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

const homeHeroSlides = [
  {
    src: "/img/home/Main image.jpg",
    alt: "Refugee youth and community in Kakuma with Generation Aid",
  },
  {
    src: "/img/home/1.jpg",
    alt: "Digital skills training and education program",
  },
  {
    src: "/img/home/2.jpg",
    alt: "Empowerment, entrepreneurship and community sessions",
  },
  {
    src: "/img/home/3.jpg",
    alt: "Hands-on tech learning and innovation cohorts",
  },
  {
    src: "/img/home/4.jpg",
    alt: "Youth collaboration and leadership in Kakuma",
  },
];

export default function Home() {
  const { t } = useTranslation();
  useSEO({
    title: "Generation Aid: Refugee-Led Innovation in Kakuma",
    description:
      "Generation Aid equips youth in Kakuma refugee camp with digital skills, entrepreneurship training and pathways to employment.",
  });

  const displayedStats = impactStats;

  const { data: sanityPrograms = [] } = useQuery({
    queryKey: ["public", "sanity", "programs"],
    queryFn: getPrograms,
    retry: false,
  });

  const cmsPrograms = useMemo(
    () => sanityPrograms.map((item) => mapSanityProgramToDisplayProgram(item)),
    [sanityPrograms],
  );

  const displayPrograms = useMemo(() => {
    if (cmsPrograms && cmsPrograms.length > 0) return cmsPrograms;
    return defaultPrograms;
  }, [cmsPrograms]);

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

  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % homeHeroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

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
      {/* ============ HERO SECTION (CINEMATIC MOTION VIDEO-LIKE HERO) ============ */}
      <section id="home" className="relative w-full overflow-hidden min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex items-center bg-[#172554] gatsby-hero-bg">
        {/* Full Width Cinematic Sliding Video-Like Reel */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {homeHeroSlides.map((slide, index) => {
            const isActive = index === heroSlideIndex;
            return (
              <motion.div
                key={slide.src}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? [1, 1.08] : 1,
                  x: isActive ? [0, index % 2 === 0 ? -12 : 12] : 0,
                }}
                transition={{
                  opacity: { duration: 1.8, ease: "easeInOut" },
                  scale: { duration: 6.5, ease: "linear" },
                  x: { duration: 6.5, ease: "linear" },
                }}
                className={`absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)] ${
                  isActive ? "z-[1]" : "z-0"
                }`}
              >
                <SmartImage
                  src={slide.src}
                  alt={slide.alt}
                  fallbackLabel=""
                  className="h-full w-full object-cover contrast-[1.15] brightness-[0.88] saturate-[1.1]"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Deep Royal Blue Gradient Overlay */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#172554]/95 via-[#172554]/85 to-[#172554]/55 pointer-events-none" />

        {/* Hero Content Box */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-white space-y-4"
          >
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl font-serif leading-[1.12] !text-white">
              <span className="!text-white">{t("home.hero.titleStart")}</span>{" "}
              <span className="!text-white italic font-normal">
                {t("home.hero.titleHighlight")}
              </span>{" "}
              <span className="!text-white">{t("home.hero.titleEnd")}</span>
            </h1>

            <div className="sir-callout-border border-l-white !text-white !my-3">
              <p className="text-sm sm:text-base leading-relaxed font-medium !text-white">
                {t("home.hero.subtitle")}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a href="#programs" className="sir-btn-primary py-1 px-3 text-[11px] font-extrabold uppercase tracking-wider">
                <span>{t("home.hero.ctaPrograms")}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
              <a href={SITE.donateUrl} target="_blank" rel="noreferrer" className="sir-btn-secondary py-1 px-3 text-[11px] font-extrabold uppercase tracking-wider border-white/60 text-white hover:bg-white hover:text-slate-950 dark:border-white/60 dark:text-white">
                <Heart className="w-3 h-3 fill-brand-400 text-brand-400" />
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

        <ol className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
              {t("home.programs.eyebrow", "Our Core Initiatives")}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold !text-white sm:text-4xl lg:text-5xl">
              {t("home.programs.title", "Refugee-Led Impact Programs")}
            </h2>
            <p className="mt-2 text-white text-base max-w-2xl">{t("home.programs.subtitle", "Explore our full spectrum of educational, technical, creative, and climate resilience initiatives designed by and for displaced communities.")}</p>
          </div>
          <Link
            to="/programs"
            className="inline-flex items-center gap-1 text-sm font-extrabold text-white hover:text-brand-200 transition-colors uppercase tracking-wider"
          >
            <span>{t("home.programs.viewAll", "View All Programs")}</span>
            <span>→</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayPrograms.map((p) => {
            const targetId = ("id" in p && p.id) || ("slug" in p && p.slug) || "";
            return (
              <article
                key={p.title}
                className="sir-card border-slate-200/40 bg-white dark:bg-slate-900 flex flex-col justify-between overflow-hidden group hover:border-brand-300 dark:hover:border-brand-500 transition shadow-sm hover:shadow-md"
              >
                <div className="aspect-video w-full overflow-hidden bg-brand-50 dark:bg-slate-950 relative">
                  <SmartImage
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-extrabold text-slate-900 dark:text-slate-100 line-clamp-2">
                      <Link to={`/programs/${targetId}`} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                        {p.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {p.body}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      to={`/programs/${targetId}`}
                      className="sir-link-underline text-xs uppercase tracking-wider font-extrabold text-brand-600 dark:text-brand-400 inline-flex items-center gap-1.5"
                    >
                      <span>Explore Program</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
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
                className="sir-card-accent flex flex-col justify-between overflow-hidden"
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
                    className="sir-btn-primary mt-5 w-1/2 py-2 px-3 text-[11px] font-extrabold uppercase tracking-wider"
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
          <span className="inline-block rounded-md bg-white/20 px-3 py-1 text-xs font-extrabold uppercase tracking-widest !text-white border border-white/30">
            {t("home.impact.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold !text-white sm:text-4xl lg:text-5xl">
            {t("home.impact.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl !text-white text-base sm:text-lg">
            {t("home.impact.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedStats.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 text-center shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <p className="font-display text-4xl sm:text-5xl font-extrabold text-brand-600 dark:text-brand-400 tracking-tight">
                  {m.value}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">{m.label}</p>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">{m.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Impact Highlights */}
        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-white/20 bg-white/10 p-6 sm:p-8 backdrop-blur-md">
          <h3 className="font-display text-lg sm:text-xl font-bold !text-white text-center mb-6">
            Real Change Measured Through Transformed Lives
          </h3>
          <div className="grid gap-3">
            {impactBullets.map((bullet, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-white dark:bg-slate-800 px-5 py-4 border border-slate-100 dark:border-slate-700 shadow-sm text-center sm:text-left transition-all"
              >
                <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                  {bullet}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-lg transition-all"
            >
              <h3 className="font-display text-lg font-extrabold text-slate-900 dark:text-slate-100 not-italic">
                {v.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 not-italic font-normal leading-relaxed">{v.body}</p>
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

      {/* ============ BOARD OF DIRECTORS SECTION ============ */}
      <Section id="board" pattern="soft" className="border-t border-neutral-border dark:border-slate-800">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sir-tag">
            Governance & Guidance
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-5xl font-serif">
            Board of Directors
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Experienced leaders and governance experts guiding Generation Aid’s strategic direction, institutional integrity, and sustainable global impact.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 sm:px-6">
          {advisors.map((advisor) => (
            <MemberCard key={advisor.key} member={advisor} />
          ))}
        </div>
      </Section>

      {/* ============ STORIES / BLOG SECTION (Brand Blue Palette) ============ */}
      <section id="stories" className="bg-brand-600 dark:bg-brand-700 py-16 sm:py-20 text-white transition-colors border-t border-brand-500/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur mb-2 border border-white/25">
                {t("home.stories.eyebrow")}
              </span>
              <h2 className="mt-2 text-3xl font-extrabold !text-white sm:text-4xl lg:text-5xl font-serif">
                {t("home.stories.title")}
              </h2>
              <p className="mt-2 text-base font-semibold text-white/95">{t("home.stories.subtitle")}</p>
              <p className="mt-2 text-sm text-white/90 leading-relaxed">
                Our blog shares project updates, inspiring stories, partnership announcements, and lessons from the field as we work toward creating sustainable opportunities for refugees and marginalized communities.
              </p>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-600 shadow-sm transition hover:bg-brand-50 hover:shadow-md"
            >
              <span>{t("home.stories.allArticles")}</span>
              <span>→</span>
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {recentPosts.map((p) => (
              <article
                key={p.slug}
                className="flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-7 shadow-md border border-white/80 transition hover:shadow-xl hover:-translate-y-0.5 group"
              >
                <div>
                  <time className="text-[11px] font-extrabold uppercase tracking-wider text-brand-600">
                    {p.date}
                  </time>
                  <h3 className="mt-3 font-serif text-lg font-bold text-neutral-heading group-hover:text-brand-600 transition-colors">
                    <Link to={`/blog/${p.slug}`}>
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-neutral-body leading-relaxed line-clamp-3">{p.excerpt}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-100">
                  <Link
                    to={`/blog/${p.slug}`}
                    className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-extrabold text-brand-600 group-hover:text-brand-700 transition"
                  >
                    <span>{t("common.readMoreArrow")}</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8 text-brand-500 dark:text-brand-400 opacity-80"
                    aria-hidden="true"
                  >
                    <path d="M9.4 5.5C6.3 6.3 4 9.2 4 12.6V19h6.4v-6.4H7.3c0-2.1 1.4-3.8 3.4-4.4l-1.3-2.7zm10 0c-3.1.8-5.4 3.7-5.4 7.1V19h6.4v-6.4h-3.1c0-2.1 1.4-3.8 3.4-4.4l-1.3-2.7z" />
                  </svg>
                  <blockquote className="mt-4 text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-medium italic">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center gap-3.5">
                  <img
                    src={item.image}
                    alt={name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-brand-500/20 dark:border-brand-400/30 flex-shrink-0 shadow-sm"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <p className="font-serif text-sm font-extrabold text-slate-900 dark:text-slate-100 truncate">
                      {name}
                    </p>
                    <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-0.5 line-clamp-2">
                      {role}
                    </p>
                  </div>
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

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {fallbackVideos.map((v) => (
            <article
              key={v.title}
              className="sir-card"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                {v.youtubeId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                ) : v.videoUrl ? (
                  <video
                    src={v.videoUrl}
                    poster={v.poster}
                    controls
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
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
                )}
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
                className="mt-6 inline-flex w-1/2 items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-sm transition hover:bg-brand-700"
              >
                <svg
                  aria-hidden
                  width="14"
                  height="14"
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
                className="mt-6 inline-flex w-1/2 items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-sm transition hover:bg-brand-700"
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
                className="mt-6 inline-flex w-1/2 items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-sm transition hover:bg-brand-700"
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
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-5xl font-serif">
              Let's Connect
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">{t("home.contact.subtitle")}</p>

            <ul className="mt-8 space-y-4 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3 border-b border-brand-200 dark:border-brand-800/80 pb-3">
                <span className="font-extrabold text-slate-900 dark:text-slate-200 min-w-[90px]">
                  {t("home.contact.locationLabel")}
                </span>
                <span>{t("home.contact.locationValue")}</span>
              </li>
              <li className="flex items-center gap-3 border-b border-brand-200 dark:border-brand-800/80 pb-3">
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
              className="sir-btn-primary w-full sm:w-auto py-3.5 px-8 min-h-[50px] text-sm font-extrabold uppercase tracking-wider disabled:opacity-60"
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
