import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";
import { SITE } from "@/data/site";
import { team, advisors } from "@/data/team";
import { useQuery } from "@tanstack/react-query";
import {
  getTeamMembers,
  mapSanityTeamMemberToDisplayTeamMember,
} from "@/lib/sanity";

interface CardItem {
  title: string;
  body: string;
}

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

export default function About() {
  const { t } = useTranslation();
  useSEO({
    title: "About",
    description:
      "Generation Aid is a refugee-led nonprofit in Kakuma Refugee Camp, Kenya, transforming lives through education, livelihoods, and innovation.",
  });

  const objectives = t("about.objectives", { returnObjects: true }) as string[];
  const values = t("about.values", { returnObjects: true }) as CardItem[];

  const { data: sanityTeam = [] } = useQuery({
    queryKey: ["public", "sanity", "teamMembers"],
    queryFn: getTeamMembers,
    retry: false,
  });

  const teamMembers: DisplayTeamMember[] =
    sanityTeam.length > 0
      ? sanityTeam.map(mapSanityTeamMemberToDisplayTeamMember)
      : team;

  const teamSourceLabel =
    sanityTeam.length > 0
      ? `Live from Studio · ${teamMembers.length} members`
      : `Static fallback · ${teamMembers.length} members`;

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      {/* HERO (Pattern C: Solid Primary Blue Impact) */}
      <section className="relative isolate flex min-h-[55vh] items-center overflow-hidden bg-brand-900 dark:bg-slate-950 text-white transition-colors">
        <SmartImage
          src="/who we are.jpg"
          alt="Generation Aid community collaborating and learning together in Kakuma"
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/90 via-brand-900/75 to-brand-900/45 dark:from-slate-950/95 dark:via-slate-900/90 dark:to-slate-950/85"
        />
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
              {t("about.hero.eyebrow")}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl !text-white dark:!text-white">
              {t("about.hero.title")}
            </h1>
          </div>
        </div>
      </section>

      {/* ABOUT US & WHO WE ARE (Pattern A: Canvas - First Section) */}
      <Section id="story" pattern="canvas" className="scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            About Us
          </span>
          <h2 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            Who We Are
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-body dark:text-slate-300">
            <p>
              <strong className="font-semibold text-neutral-heading dark:text-slate-100">Generation Aid</strong> is a refugee-led nonprofit organization based in Kakuma Refugee Camp and Kalobeyei Settlement, Kenya, dedicated to transforming lives through education, livelihoods, and innovation. We believe that refugees and vulnerable communities possess extraordinary potential when given access to quality education, digital skills, meaningful employment, and opportunities to thrive.
            </p>
            <p>
              Founded by <strong className="font-semibold text-neutral-heading dark:text-slate-100">Hubert Senga</strong>, a Congolese refugee living in the Kakuma refugee camp, Generation Aid works to bridge the gap between humanitarian assistance and long-term economic empowerment. Through digital skills training, vocational education, language learning, entrepreneurship, and employment pathways, we equip young people and women with the tools they need to build sustainable futures.
            </p>
            <p>
              Beyond training, we connect talented graduates with remote work opportunities, businesses, and global partners, ensuring that skills translate into real livelihoods and lasting impact. At Generation Aid, we don't just support communities; we empower them to become leaders, innovators, and contributors to the global economy.
            </p>
          </div>

          {/* Dedicated Who We Are Callout */}
          <div className="mt-8 rounded-2xl border border-brand-200 dark:border-slate-700 bg-brand-50/50 dark:bg-slate-800/80 p-6 sm:p-8">
            <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100">
              Investing in Human Potential
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
              Generation Aid is a refugee-led, youth-driven nonprofit organization transforming lives through education, technology, and economic empowerment. Founded in Kakuma Refugee Camp, Kenya, we believe that displacement should never define a person's future. We equip refugees and vulnerable host community members with the skills, opportunities, and resources they need to become self-reliant and contribute meaningfully to their communities. At Generation Aid, we don't just respond to crises; we invest in people's potential, creating pathways to dignity, opportunity, and lasting impact for the refugees.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/volunteer"
              className="inline-block rounded-lg bg-brand-600 dark:bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700 dark:hover:bg-brand-400 transition shadow-sm"
            >
              Get Involved with Us →
            </Link>
            <Link
              to="/contact"
              className="inline-block rounded-lg border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-3 text-sm font-semibold text-neutral-heading dark:text-slate-200 hover:border-brand-600 dark:hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition"
            >
              {t("common.contactUs")}
            </Link>
          </div>

          {/* Full-width image under the words */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl group aspect-[16/9] sm:aspect-[21/9]">
            <SmartImage
              src="/who we are.jpg"
              alt="Generation Aid team and community collaborating on strategic planning in Kakuma"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </Section>

      {/* WHERE IT ALL BEGAN (Pattern B: Soft Contrast) */}
      <Section id="origin" pattern="soft" className="scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <span className="inline-block rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            Our Story
          </span>
          <h2 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            Where It All Began
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-body dark:text-slate-300">
            <p className="font-medium text-neutral-heading dark:text-slate-200">
              Generation Aid was founded with that one fundamental question:
            </p>
            <p>
              In 2019, Our Founder, Hubert Senga asked himself a very simple question:
            </p>
            <blockquote className="border-l-4 border-brand-500 bg-white/70 dark:bg-slate-800/80 p-4 rounded-r-xl italic font-medium text-lg text-neutral-heading dark:text-slate-100 shadow-sm my-2">
              &ldquo;What if, instead of preparing the over 300,000 refugees in Kakuma to depend on aid, we could prepare them to participate in the global economy?&rdquo;
            </blockquote>
            <p className="font-medium text-brand-700 dark:text-brand-300">
              That question became our mission as Generation Aid.
            </p>
            <p>
              Hubert Senga is a Congolese refugee, social entrepreneur, and founder of Generation Aid.
            </p>
            <p>
              His leadership journey began with a displacement story in 2016. He was forced to flee the Democratic Republic of Congo due to political instability, war and violence consuming his home country. When he arrived in Kakuma Refugee Camp, like many refugees, he experienced firsthand the barriers to education, employment, and opportunity. He had to rebuild his life from almost nothing.
            </p>
            <p>
              But living in Kakuma taught him something important: being displaced does not mean being without talent, ambition, or potential.
            </p>
            <p>
              Around him are teachers, entrepreneurs, young innovators and skilled people ready to work but disconnected from opportunity. Refugees face barriers to livelihood skills, formal employment, documentation, technology and global markets.
            </p>
            <p>
              So in 2019, he founded Generation Aid with that one fundamental question to create practical solutions that empower refugees with the skills needed to thrive in the modern world.
            </p>
            <p>
              What started as a small community initiative has grown into a trusted refugee-led organization serving refugees and host communities through education, digital innovation, vocational training, and employment pathways. Today, Generation Aid continues to build a future where every displaced person has the opportunity to learn, work, lead, and rebuild their life with dignity.
            </p>
          </div>

          {/* Full-width image under the words */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl group aspect-[16/9] sm:aspect-[21/9]">
            <SmartImage
              src="/Our Story.jpg"
              alt="Hubert Senga speaking on refugee empowerment, digital inclusion, and global collaboration"
              className="h-full w-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </Section>

      {/* VISION + MISSION */}
      <Section id="mission-vision" pattern="canvas" className="scroll-mt-24">
        <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
          {/* Vision: Starts first with its image and content side by side */}
          <div className="grid gap-6 md:grid-cols-[260px_1fr] lg:grid-cols-[290px_1fr] items-stretch min-h-[200px] rounded-2xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 sm:p-7 shadow-sm transition hover:shadow-md">
            <div className="overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 shadow-sm shrink-0 min-h-[180px]">
              <SmartImage
                src="/vission2.jpg"
                alt="Generation Aid Vision"
                fallbackLabel="Generation Aid Vision"
                className="h-full min-h-[180px] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="inline-block w-fit rounded-full bg-brand-50 dark:bg-slate-700/60 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-600">
                {t("home.about.ourVision")}
              </span>
              <h2 className="mt-2 text-xl sm:text-2xl font-bold text-neutral-heading dark:text-slate-100">
                {t("home.about.visionTitle")}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-neutral-body dark:text-slate-300 leading-relaxed">
                {t("home.about.visionBody")}
              </p>
            </div>
          </div>

          {/* Mission: Follows next with its image and content side by side */}
          <div className="grid gap-6 md:grid-cols-[260px_1fr] lg:grid-cols-[290px_1fr] items-stretch min-h-[200px] rounded-2xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 sm:p-7 shadow-sm transition hover:shadow-md">
            <div className="overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 shadow-sm shrink-0 min-h-[180px]">
              <SmartImage
                src="/mission.jpg"
                alt="Generation Aid Mission"
                fallbackLabel="Generation Aid Mission"
                className="h-full min-h-[180px] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="inline-block w-fit rounded-full bg-brand-50 dark:bg-slate-700/60 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-600">
                {t("home.about.ourMission")}
              </span>
              <h2 className="mt-2 text-xl sm:text-2xl font-bold text-neutral-heading dark:text-slate-100">
                {t("home.about.missionTitle")}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-neutral-body dark:text-slate-300 leading-relaxed">
                {t("home.about.missionBody")}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* OBJECTIVES (Pattern B: Soft Contrast) */}
      <Section pattern="soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            Strategic Pillars
          </span>
          <h2 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            {t("about.objectivesTitle")}
          </h2>
          <p className="mt-3 text-neutral-body dark:text-slate-300">{t("about.objectivesSubtitle")}</p>
        </div>
        <ol className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {objectives.map((o, i) => (
            <li
              key={i}
              className="flex flex-col rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-600 dark:bg-brand-500 font-display text-sm font-bold text-white shadow-xs">
                0{i + 1}
              </span>
              <p className="mt-4 text-sm leading-relaxed text-neutral-body dark:text-slate-300 font-medium">{o}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* WHAT GENERATION AID WORKS TO ACHIEVE (Pattern C: Solid Primary Blue Impact) */}
      <Section pattern="impact">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-md bg-white/20 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-white border border-white/30">
            Our Commitment
          </span>
          <h2 className="mt-3 text-3xl font-bold !text-white sm:text-4xl lg:text-5xl font-serif">
            {t("about.whatWeWorkToAchieveTitle", "What Generation Aid Works to Achieve")}
          </h2>
          <div className="mt-8 rounded-2xl bg-white/10 p-8 sm:p-10 border border-white/20 text-left backdrop-blur-md">
            <p className="text-base sm:text-lg leading-relaxed text-white">
              {t("about.whatWeWorkToAchieveBody", "Generation Aid works to build a future where refugees are recognized not for their displacement, but for their potential. We strive to create thriving, self-reliant communities by ensuring that refugees and vulnerable host community members have access to education, digital technology, meaningful employment, entrepreneurship opportunities, and leadership development. Our goal is to bridge the gap between humanitarian assistance and long-term development by equipping individuals with the knowledge, skills, and confidence to shape their own futures. Through innovation, collaboration, and locally led solutions, we are helping transform refugee communities into centers of opportunity, resilience, and sustainable economic growth.")}
            </p>
          </div>
        </div>
      </Section>

      {/* CORE VALUES (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            {t("about.valuesTitle")}
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-xl border-l-4 border-brand-600 dark:border-brand-400 bg-white dark:bg-slate-800 p-6 shadow-sm border border-neutral-border dark:border-slate-700"
            >
              <h3 className="font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                {v.title}
              </h3>
              <p className="mt-3 text-sm text-neutral-body dark:text-slate-300">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TEAM (Pattern B: Soft Contrast) */}
      <Section id="team" pattern="soft" className="scroll-mt-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            {t("about.teamEyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl font-serif">
            {t("about.teamTitle")}
          </h2>
          <p className="mt-3 text-neutral-body dark:text-slate-300">{t("about.teamSubtitle")}</p>
          <p className="mt-3 inline-flex rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            {teamSourceLabel}
          </p>
        </div>

        <TeamSlider members={teamMembers} />
      </Section>

      {/* BOARD OF ADVISORS */}
      <Section id="advisors" pattern="canvas" className="scroll-mt-24 border-t border-neutral-border dark:border-slate-800">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            Governance & Guidance
          </span>
          <h2 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl font-serif">
            Board of Directors & Advisors
          </h2>
          <p className="mt-3 text-neutral-body dark:text-slate-300 max-w-2xl mx-auto">
            Distinguished leaders and domain experts guiding Generation Aid's strategic trajectory, organizational excellence, and sustainable global impact.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {advisors.map((advisor) => (
            <MemberCard key={advisor.key} member={advisor} />
          ))}
        </div>
      </Section>

      {/* GET INVOLVED (White background with rich blue cards) */}
      <section className="relative isolate overflow-hidden bg-white dark:bg-slate-900 py-16 text-slate-900 dark:text-white sm:py-20 transition-colors border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-3">
            <span className="sir-tag">
              Get Involved
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-5xl font-serif">
              {t("about.getInvolvedTitle")}
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-300 text-base sm:text-lg">
              {t("about.getInvolvedSubtitle")}
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {/* Card 1: Give */}
            <div className="relative rounded-2xl bg-brand-600 dark:bg-brand-700 text-white p-8 flex flex-col justify-between border border-brand-500/50 shadow-xl overflow-hidden">
              <div>
                <h3 className="font-serif text-2xl font-extrabold !text-white">
                  {t("home.donateBlock.give")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white">
                  {t("home.donateBlock.giveBody")}
                </p>
              </div>
              <a
                href={SITE.donateUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-brand-700 shadow-md transition hover:bg-brand-50 hover:text-brand-800"
              >
                <svg
                  aria-hidden
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-brand-600"
                >
                  <path d="M12 21s-7-4.534-9.5-9.07C.94 8.94 2.4 5.5 5.6 5.5c1.74 0 3.41 1 4.4 2.5 1-1.5 2.66-2.5 4.4-2.5 3.2 0 4.66 3.44 3.1 6.43C19 16.466 12 21 12 21z" />
                </svg>
                <span>{t("common.donateNow")}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* Card 2: Sponsor */}
            <div className="relative rounded-2xl bg-brand-600 dark:bg-brand-700 text-white p-8 flex flex-col justify-between border border-brand-500/50 shadow-xl overflow-hidden">
              <div>
                <h3 className="font-serif text-2xl font-extrabold !text-white">
                  {t("home.donateBlock.sponsor")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white">
                  {t("home.donateBlock.sponsorBody")}
                </p>
              </div>
              <Link
                to="/programs"
                className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-brand-700 shadow-md transition hover:bg-brand-50 hover:text-brand-800"
              >
                <span>{t("home.donateBlock.sponsorCta")}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Card 3: Volunteer */}
            <div className="relative rounded-2xl bg-brand-600 dark:bg-brand-700 text-white p-8 flex flex-col justify-between border border-brand-500/50 shadow-xl overflow-hidden">
              <div>
                <h3 className="font-serif text-2xl font-extrabold !text-white">
                  {t("home.donateBlock.volunteer")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white">
                  {t("home.donateBlock.volunteerBody")}
                </p>
              </div>
              <Link
                to="/contact"
                className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-brand-700 shadow-md transition hover:bg-brand-50 hover:text-brand-800"
              >
                <span>{t("common.contactUs", "Contact us")}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
