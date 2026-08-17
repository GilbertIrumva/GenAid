import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";
import { SITE } from "@/data/site";
import { team } from "@/data/team";
import { board } from "@/data/board";
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

function TeamSlider({ members }: { members: DisplayTeamMember[] }) {
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
        {members.map((member) => (
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
        ))}
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
  const focusedPrograms = t("about.focusedPrograms", {
    returnObjects: true,
  }) as CardItem[];
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
          src="/img/heroes/about.jpg"
          alt="Generation Aid community gathered together"
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

      {/* WHERE IT ALL BEGAN / WHO ARE WE (Pattern A: Canvas - First Section) */}
      <Section id="story" pattern="canvas" className="scroll-mt-24">
        <div className="mx-auto max-w-4xl">
          <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            Where it all began
          </span>
          <h2 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            Who are we?
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-body dark:text-slate-300">
            <p>
              <strong className="font-semibold text-neutral-heading dark:text-slate-100">Generation Aid</strong> is a refugee-led nonprofit organization based in Kakuma Refugee Camp, Kenya, dedicated to transforming lives through education, livelihoods, and innovation. We believe that refugees and vulnerable communities possess extraordinary potential when given access to quality education, digital skills, meaningful employment, and opportunities to thrive.
            </p>
            <p>
              Founded by{" "}
              <a
                href="https://www.linkedin.com/in/hubert-sengap/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline underline-offset-4"
              >
                Hubert Senga
              </a>
              , a Congolese refugee living in the Kakuma refugee camp, Generation Aid works to bridge the gap between humanitarian assistance and long-term economic empowerment. Through digital skills training, vocational education, language learning, entrepreneurship, and employment pathways, we equip young people and women with the tools they need to build sustainable futures.
            </p>
            <p>
              Beyond training, we connect talented graduates with remote work opportunities, businesses, and global partners, ensuring that skills translate into real livelihoods and lasting impact. At Generation Aid, we don't just support communities — we empower them to become leaders, innovators, and contributors to the global economy.
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
        </div>
      </Section>

      {/* VISION + MISSION (Pattern B: Soft Contrast) */}
      <Section id="mission-vision" pattern="soft" className="scroll-mt-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-stretch">
          <div className="overflow-hidden rounded-2xl border border-neutral-border dark:border-slate-700 shadow-md">
            <SmartImage
              src="/img/heroes/about-history.jpg"
              alt="Students looking out toward a hopeful future"
              fallbackLabel=""
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-1">
            <div className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {t("home.about.ourVision")}
              </span>
              <h2 className="mt-4 text-2xl font-bold text-neutral-heading dark:text-slate-100">
                {t("home.about.visionTitle")}
              </h2>
              <p className="mt-4 text-neutral-body dark:text-slate-300">{t("home.about.visionBody")}</p>
            </div>
            <div className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {t("home.about.ourMission")}
              </span>
              <h2 className="mt-4 text-2xl font-bold text-neutral-heading dark:text-slate-100">
                {t("home.about.missionTitle")}
              </h2>
              <p className="mt-4 text-neutral-body dark:text-slate-300">{t("home.about.missionBody")}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* OBJECTIVES (Pattern A: Canvas) */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            {t("about.objectivesTitle")}
          </h2>
          <p className="mt-3 text-neutral-body dark:text-slate-300">{t("about.objectivesSubtitle")}</p>
        </div>
        <ol className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
          {objectives.map((o, i) => (
            <li
              key={i}
              className="rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 dark:bg-brand-500 font-display text-sm font-bold text-white">
                {i + 1}
              </span>
              <p className="mt-4 text-sm text-neutral-body dark:text-slate-300">{o}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* FOCUSED PROGRAMS (Pattern C: Solid Primary Blue Impact) */}
      <Section pattern="impact">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-white">
            {t("about.focusedEyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-bold !text-white dark:!text-white sm:text-4xl">
            {t("about.focusedTitle")}
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {focusedPrograms.map((p) => (
            <article
              key={p.title}
              className="rounded-xl border border-white/20 bg-white dark:bg-slate-800 p-6 shadow-md transition hover:border-white/40 hover:shadow-lg"
            >
              <h3 className="font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-neutral-body dark:text-slate-300">{p.body}</p>
            </article>
          ))}
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
          <h2 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            {t("about.teamTitle")}
          </h2>
          <p className="mt-3 text-neutral-body dark:text-slate-300">{t("about.teamSubtitle")}</p>
          <p className="mt-3 inline-flex rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            {teamSourceLabel}
          </p>
        </div>

        <TeamSlider members={teamMembers} />
      </Section>

      {/* BOARD (Pattern A: Canvas) */}
      <Section id="board" pattern="canvas" className="scroll-mt-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            {t("about.boardEyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-neutral-heading dark:text-slate-50 sm:text-4xl">
            {t("about.boardTitle")}
          </h2>
          <p className="mt-3 text-neutral-body dark:text-slate-300">{t("about.boardSubtitle")}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {board.map((m) => {
            const name = t(`about.boardItems.${m.key}.name`, m.name);
            const role = t(`about.boardItems.${m.key}.role`, m.role);
            const bio = t(`about.boardItems.${m.key}.bio`, m.bio);
            return (
              <article
                key={m.key}
                className="overflow-hidden rounded-xl border border-neutral-border dark:border-slate-700 bg-white dark:bg-slate-800 text-center shadow-sm"
              >
                <div className="aspect-square w-full overflow-hidden bg-brand-50 dark:bg-slate-900">
                  <SmartImage
                    src={m.image}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-neutral-heading dark:text-slate-100">
                    {name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    {role}
                  </p>
                  <p className="mt-3 text-sm text-neutral-body dark:text-slate-300">{bio}</p>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline underline-offset-4"
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



      {/* GET INVOLVED */}
      <section className="relative isolate overflow-hidden bg-brand-600 dark:bg-brand-900 py-16 text-white sm:py-20 transition-colors border-y border-brand-700 dark:border-brand-800">
        <SmartImage
          src="/img/heroes/about-team-cta.jpg"
          alt="Volunteers and supporters joining hands"
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover contrast-[1.1] brightness-[0.9]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/85"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold !text-white dark:!text-white sm:text-4xl lg:text-5xl font-display">
              {t("about.getInvolvedTitle")}
            </h2>
            <p className="mt-3 text-brand-100 dark:text-slate-300 text-base sm:text-lg">
              {t("about.getInvolvedSubtitle")}
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
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
              <Link
                to="/programs"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-50 dark:bg-slate-700/70 border border-brand-200 dark:border-slate-600 px-5 py-3 text-sm font-bold text-brand-700 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-slate-700 transition"
              >
                {t("home.donateBlock.sponsorCta")}
              </Link>
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
    </div>
  );
}
