import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";
import { SITE } from "@/data/site";
import { team } from "@/data/team";
import { board } from "@/data/board";

interface CardItem {
  title: string;
  body: string;
}

export default function About() {
  const { t } = useTranslation();
  useSEO({
    title: "About",
    description:
      "Generation Aid is a youth refugee-led organisation transforming education into employment in Kakuma since 2019.",
  });

  const objectives = t("about.objectives", { returnObjects: true }) as string[];
  const focusedPrograms = t("about.focusedPrograms", { returnObjects: true }) as CardItem[];
  const values = t("about.values", { returnObjects: true }) as CardItem[];

  const founderLink = (
    <a
      href="https://www.linkedin.com/in/hubert-sengap/"
      target="_blank"
      rel="noreferrer"
      className="font-semibold text-primary-600 hover:underline"
    >
      {t("about.intro.p3FounderName")}
    </a>
  );

  const historyFounderLink = (
    <a
      href="https://www.linkedin.com/in/hubert-sengap/"
      target="_blank"
      rel="noreferrer"
      className="font-semibold text-primary-600 hover:underline"
    >
      {t("about.history.p1FounderName")}
    </a>
  );

  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[55vh] items-center overflow-hidden">
        <SmartImage
          src="/img/heroes/about.jpg"
          alt="Generation Aid community gathered together"
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover dark:opacity-80"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b1729]/85 via-[#0b1729]/65 to-[#0b1729]/40 dark:from-black/90 dark:via-black/75 dark:to-black/55"
        />
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-300 backdrop-blur">
              {t("about.hero.eyebrow")}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              {t("about.hero.title")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">{t("about.hero.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* INTRO STORY */}
      <Section id="story" className="scroll-mt-24">
        <div className="mx-auto max-w-4xl space-y-5 text-base leading-relaxed text-muted">
          <p>{t("about.intro.p1")}</p>
          <p>{t("about.intro.p2")}</p>
          <p>
            {t("about.intro.p3Prefix")}
            <span className="font-semibold text-ink">{t("about.intro.p3Brand")}</span>
            {t("about.intro.p3Middle")}
            {founderLink}
            {t("about.intro.p3Suffix")}
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-block rounded-md bg-primary-500 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-600"
            >
              {t("common.contactUs")}
            </Link>
          </div>
        </div>
      </Section>

      {/* VISION + MISSION */}
      <Section id="mission-vision" className="scroll-mt-24 bg-surface">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-stretch">
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <SmartImage
              src="/img/heroes/about-history.jpg"
              alt="Students looking out toward a hopeful future"
              fallbackLabel=""
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-1">
            <div className="rounded-2xl border border-line bg-bg p-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                {t("home.about.ourVision")}
              </span>
              <h2 className="mt-4 text-2xl font-bold text-ink">{t("home.about.visionTitle")}</h2>
              <p className="mt-4 text-muted">{t("home.about.visionBody")}</p>
            </div>
            <div className="rounded-2xl border border-line bg-bg p-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                {t("home.about.ourMission")}
              </span>
              <h2 className="mt-4 text-2xl font-bold text-ink">{t("home.about.missionTitle")}</h2>
              <p className="mt-4 text-muted">{t("home.about.missionBody")}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* OBJECTIVES */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">{t("about.objectivesTitle")}</h2>
          <p className="mt-3 text-muted">{t("about.objectivesSubtitle")}</p>
        </div>
        <ol className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
          {objectives.map((o, i) => (
            <li key={i} className="rounded-2xl border border-line bg-surface p-6">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-500 font-display text-sm font-bold text-white">
                {i + 1}
              </span>
              <p className="mt-4 text-sm text-muted">{o}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* FOCUSED PROGRAMS */}
      <Section className="bg-surface">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
            {t("about.focusedEyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            {t("about.focusedTitle")}
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {focusedPrograms.map((p) => (
            <article
              key={p.title}
              className="rounded-2xl border border-line bg-bg p-6 transition hover:border-primary-300 hover:shadow-md"
            >
              <h3 className="font-display text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-3 text-sm text-muted">{p.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* CORE VALUES */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">{t("about.valuesTitle")}</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border-l-4 border-primary-500 bg-surface p-6 shadow-sm"
            >
              <h3 className="font-display text-lg font-semibold text-ink">{v.title}</h3>
              <p className="mt-3 text-sm text-muted">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TEAM */}
      <Section id="team" className="scroll-mt-24 bg-surface">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            {t("about.teamEyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            {t("about.teamTitle")}
          </h2>
          <p className="mt-3 text-muted">{t("about.teamSubtitle")}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => {
            const name = t(`home.team.items.${m.key}.name`, m.name);
            const role = t(`home.team.items.${m.key}.role`, m.role);
            const bio = t(`home.team.items.${m.key}.bio`, m.bio);
            return (
              <article
                key={m.key}
                className="overflow-hidden rounded-2xl border border-line bg-bg text-center shadow-sm"
              >
                <div className="aspect-square w-full overflow-hidden bg-primary-50">
                  <SmartImage src={m.image} alt={name} className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-ink">{name}</h3>
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

      {/* BOARD */}
      <Section id="board" className="scroll-mt-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            {t("about.boardEyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            {t("about.boardTitle")}
          </h2>
          <p className="mt-3 text-muted">{t("about.boardSubtitle")}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {board.map((m) => {
            const name = t(`about.boardItems.${m.key}.name`, m.name);
            const role = t(`about.boardItems.${m.key}.role`, m.role);
            const bio = t(`about.boardItems.${m.key}.bio`, m.bio);
            return (
              <article
                key={m.key}
                className="overflow-hidden rounded-2xl border border-line bg-surface text-center shadow-sm"
              >
                <div className="aspect-square w-full overflow-hidden bg-primary-50">
                  <SmartImage src={m.image} alt={name} className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-ink">{name}</h3>
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

      {/* HISTORY */}
      <Section className="bg-surface">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              {t("about.historyEyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              {t("about.historyTitle")}
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
              <p>
                {t("about.history.p1Start")}
                {historyFounderLink}
                {t("about.history.p1End")}
              </p>
              <p>
                {t("about.history.p2Start")}
                <span className="font-semibold text-ink">{t("about.history.p2Emphasis")}</span>
              </p>
              <p>
                {t("about.history.p3Start")}
                <span className="font-semibold text-ink">{t("about.history.p3Brand")}</span>
                {t("about.history.p3End")}
              </p>
              <p>{t("about.history.p4")}</p>
              <p>{t("about.history.p5")}</p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <SmartImage
                src="/img/heroes/about-mission.jpg"
                alt="Community gathered together, representing our journey"
                fallbackLabel=""
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-line bg-bg p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                  {t("about.founded")}
                </dt>
                <dd className="mt-1 font-display text-2xl font-bold text-ink">2019</dd>
              </div>
              <div className="rounded-2xl border border-line bg-bg p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                  {t("about.certified")}
                </dt>
                <dd className="mt-1 font-display text-2xl font-bold text-ink">2025</dd>
              </div>
              <div className="col-span-2 rounded-2xl border border-line bg-bg p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                  {t("about.basedIn")}
                </dt>
                <dd className="mt-1 font-display text-lg font-semibold text-ink">
                  {t("about.kakumaCamp")}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </Section>

      {/* GET INVOLVED */}
      <section className="relative isolate overflow-hidden bg-primary-600 py-16 text-white sm:py-20">
        <SmartImage
          src="/img/heroes/about-team-cta.jpg"
          alt="Volunteers and supporters joining hands"
          fallbackLabel=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-700/90 via-primary-600/85 to-primary-500/80"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{t("about.getInvolvedTitle")}</h2>
            <p className="mt-3 text-primary-100">{t("about.getInvolvedSubtitle")}</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
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
              <h3 className="font-display text-lg font-semibold">
                {t("home.donateBlock.sponsor")}
              </h3>
              <p className="mt-2 text-sm text-primary-100">{t("home.donateBlock.sponsorBody")}</p>
              <Link
                to="/programs"
                className="mt-5 inline-block rounded-md border border-white/40 px-4 py-2 text-sm font-semibold hover:bg-white/10"
              >
                {t("home.donateBlock.sponsorCta")}
              </Link>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
              <h3 className="font-display text-lg font-semibold">
                {t("home.donateBlock.volunteer")}
              </h3>
              <p className="mt-2 text-sm text-primary-100">
                {t("home.donateBlock.volunteerBody")}
              </p>
              <Link
                to="/contact"
                className="mt-5 inline-block rounded-md border border-white/40 px-4 py-2 text-sm font-semibold hover:bg-white/10"
              >
                {t("common.contactUs")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
