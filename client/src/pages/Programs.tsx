import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";

const overviewImages = [
  "https://generationaid.org/wp-content/uploads/2025/10/WhatsApp-Image-2025-09-17-at-22.10.31_0778a7cc.jpg",
  "https://generationaid.org/wp-content/uploads/2025/02/Dress-making.png",
  "https://generationaid.org/wp-content/uploads/2025/02/English-skills.png",
];

const detailMeta = [
  {
    id: "computer-literacy",
    image: "https://generationaid.org/wp-content/uploads/2025/10/WhatsApp-Image-2025-09-17-at-22.10.31_0778a7cc.jpg",
  },
  {
    id: "tailoring",
    image: "https://generationaid.org/wp-content/uploads/2025/02/Dress-making.png",
  },
  {
    id: "english",
    image: "https://generationaid.org/wp-content/uploads/2025/02/English-skills.png",
  },
];

interface OverviewCard {
  title: string;
  body: string;
}

interface DetailCard {
  title: string;
  body: string;
  features: string[];
}

interface CardItem {
  title: string;
  body: string;
}

export default function Programs() {
  const { t } = useTranslation();
  useSEO({
    title: "Programs",
    description: "Digital skills, tailoring, English and entrepreneurship programs designed for refugee youth in Kakuma.",
  });

  const overviewTr = t("programs.overview", { returnObjects: true }) as OverviewCard[];
  const detailsTr = t("programs.details", { returnObjects: true }) as DetailCard[];
  const whyCards = t("programs.kap.whyCards", { returnObjects: true }) as CardItem[];
  const subPrograms = overviewTr.map((p, i) => ({ ...p, image: overviewImages[i] }));
  const programDetails = detailMeta.map((m, i) => ({ ...m, ...detailsTr[i] }));

  const transComponents = {
    b: <span className="font-semibold text-ink" />,
    em: <em className="italic" />,
    strong: <strong className="font-bold text-ink" />,
    span: <span className="text-primary-600" />,
  };

  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[55vh] items-center overflow-hidden">
        {/* TODO: replace with real Generation Aid photo */}
        <SmartImage
          src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1600&q=80"
          alt="Learner in a vocational training session"
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
              {t("programs.hero.eyebrow")}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              {t("programs.hero.title")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">{t("programs.hero.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* OVERVIEW CARDS */}
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subPrograms.map((p) => (
            <article
              key={p.title}
              className="overflow-hidden rounded-2xl border border-line bg-surface transition hover:border-primary-300 hover:shadow-md"
            >
              <div className="aspect-video w-full overflow-hidden bg-primary-50">
                <SmartImage src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* DETAILED SECTIONS */}
      {programDetails.map((p, i) => {
        const imageFirst = i % 2 === 1;
        return (
          <Section
            key={p.id}
            id={p.id}
            className={i % 2 === 0 ? "bg-surface" : ""}
          >
            <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
              <figure
                className={`overflow-hidden rounded-3xl border border-line bg-bg shadow-sm ${imageFirst ? "lg:order-1" : "lg:order-2"}`}
              >
                <SmartImage
                  src={p.image}
                  alt={p.title}
                  fallbackLabel={p.title}
                  className="aspect-[4/3] w-full object-cover"
                />
              </figure>
              <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                  {t("programs.programLabel", { n: i + 1 })}
                </span>
                <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">{p.title}</h2>
                <p className="mt-5 text-base leading-relaxed text-muted">{p.body}</p>

                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 rounded-xl border border-line bg-bg px-3 py-2 text-sm text-ink"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-ink"
                      >
                        <path
                          d="M4 10.5l3.5 3.5L16 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        );
      })}

      {/* =============================================== */}
      {/* YOUTH DIGITAL SKILLS                            */}
      {/* =============================================== */}

      {/* HERO */}
      <Section className="bg-gradient-to-b from-primary-50 to-bg !pb-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
            {t("programs.youthDigital.tag")}
          </span>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl">
            {t("programs.youthDigital.title")}
          </h2>
          <p className="mt-6 text-lg text-muted">{t("programs.youthDigital.subtitle")}</p>
        </div>
      </Section>

      {/* REMOTE WORK / BPO MODEL */}
      <Section className="!pt-0">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              {t("programs.bpo.eyebrow")}
            </span>
            <h3 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              {t("programs.bpo.title")}
            </h3>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
              <p>
                <Trans i18nKey="programs.bpo.p1" components={transComponents} />
              </p>
              <p>
                <Trans i18nKey="programs.bpo.p2" components={transComponents} />
              </p>
            </div>
          </div>
          <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
            <SmartImage src="https://generationaid.org/wp-content/uploads/2025/03/1737728618417-1-1024x768.jpeg"
              alt="Refugee youth at the Remote Work Bootcamp"
              className="h-full w-full object-cover" />
          </figure>
        </div>
      </Section>

      {/* CODING & WEB DEV ACADEMY */}
      <Section className="bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[2fr_3fr]">
          <figure className="overflow-hidden rounded-2xl border border-line bg-bg">
            <SmartImage src="https://generationaid.org/wp-content/uploads/2025/03/1717174384034.jpeg"
              alt="Coding & Web Development Academy"
              className="h-full w-full object-cover" />
          </figure>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              {t("programs.coding.eyebrow")}
            </span>
            <h3 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              {t("programs.coding.title")}
            </h3>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
              <p>
                <Trans i18nKey="programs.coding.p1" components={transComponents} />
              </p>
              <p>
                <Trans i18nKey="programs.coding.p2" components={transComponents} />
              </p>
              <p>
                <Trans i18nKey="programs.coding.p3" components={transComponents} />
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* =============================================== */}
      {/* CREATIVITY — KAKUMA ART PROJECT                 */}
      {/* =============================================== */}

      {/* HERO */}
      <Section className="bg-gradient-to-b from-primary-50 to-bg !pb-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
            {t("programs.creativity.tag")}
          </span>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl">
            {t("programs.creativity.title")}
          </h2>
          <p className="mt-6 text-lg text-muted">{t("programs.creativity.subtitle")}</p>
        </div>
      </Section>

      {/* HOW IT BEGAN */}
      <Section className="!pt-0">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
            {t("programs.kap.howEyebrow")}
          </span>
          <h3 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            {t("programs.kap.howTitle")}
          </h3>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
            <p>
              <Trans i18nKey="programs.kap.howP1" components={transComponents} />
            </p>
            <p>{t("programs.kap.howP2")}</p>
            <p>
              <Trans i18nKey="programs.kap.howP3" components={transComponents} />
            </p>
          </div>

          <blockquote className="mt-8 rounded-2xl border-l-4 border-primary-500 bg-surface p-6 italic text-ink shadow-sm">
            &ldquo;{t("programs.kap.quote")}&rdquo;
            <footer className="mt-3 text-sm font-semibold not-italic text-muted">
              <Trans i18nKey="programs.kap.quoteAttr" components={transComponents} />
            </footer>
          </blockquote>

          <figure className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface">
            <SmartImage src="https://generationaid.org/wp-content/uploads/2026/06/Screenshot-2026-06-01-174044-1024x585.png"
              alt="Kakuma Art Project — early workshops"
              className="h-full w-full object-cover" />
          </figure>
        </div>
      </Section>

      {/* BEAUTY OF THE PROGRAMS */}
      <Section className="bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              {t("programs.kap.beautyEyebrow")}
            </span>
            <h3 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              {t("programs.kap.beautyTitle")}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-muted">
              <Trans i18nKey="programs.kap.beautyBody" components={transComponents} />
            </p>
          </div>
          <figure className="overflow-hidden rounded-2xl border border-line">
            <SmartImage src="https://generationaid.org/wp-content/uploads/2026/06/image.png"
              alt="Artists at work in a Kakuma Art Project workshop"
              className="h-full w-full object-cover" />
          </figure>
        </div>
      </Section>

      {/* PAINTING HOME FROM AFAR */}
      <Section>
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[2fr_3fr]">
          <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
            <SmartImage src="https://generationaid.org/wp-content/uploads/2026/06/Screenshot-2026-06-01-175056-5-861x1024.png"
              alt="Mwangi, artist at Kakuma Refugee Camp"
              className="h-full w-full object-cover" />
          </figure>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              {t("programs.kap.paintingEyebrow")}
            </span>
            <h3 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              <Trans i18nKey="programs.kap.paintingTitle" components={transComponents} />
            </h3>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
              <p>{t("programs.kap.paintingP1")}</p>
              <p>{t("programs.kap.paintingP2")}</p>
              <p>{t("programs.kap.paintingP3")}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ACTIVITIES — REFUGEE ARTISAN COOPERATIVE */}
      <Section className="bg-surface">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
            {t("programs.kap.activitiesEyebrow")}
          </span>
          <h3 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            {t("programs.kap.activitiesTitle")}
          </h3>

          <figure className="mt-8 overflow-hidden rounded-2xl border border-line bg-bg">
            <SmartImage src="https://generationaid.org/wp-content/uploads/2026/06/image-1-1024x544.png"
              alt="Refugee artisan cooperative at work"
              className="h-full w-full object-cover" />
          </figure>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
            <p>
              <Trans i18nKey="programs.kap.activitiesP1" components={transComponents} />
            </p>
          </div>

          <figure className="mt-8 overflow-hidden rounded-2xl border border-line bg-bg">
            <SmartImage src="https://generationaid.org/wp-content/uploads/2025/03/1724447989836-1-1024x461.jpeg"
              alt="Handicraft training session"
              className="h-full w-full object-cover" />
          </figure>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
            <p>{t("programs.kap.activitiesP2")}</p>
          </div>
        </div>
      </Section>

      {/* CELEBRATING OUR TALENTS */}
      <Section>
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              {t("programs.kap.celebratingEyebrow")}
            </span>
            <h3 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              {t("programs.kap.celebratingTitle")}
            </h3>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
              <p>
                <Trans i18nKey="programs.kap.celebratingP1" components={transComponents} />
              </p>
              <p>
                <Trans i18nKey="programs.kap.celebratingP2" components={transComponents} />
              </p>
            </div>
          </div>
          <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
            <SmartImage src="https://generationaid.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-05-25-at-8.14.02-PM-768x1024.jpeg"
              alt="Celebrating refugee artisan talents"
              className="h-full w-full object-cover" />
          </figure>
        </div>
      </Section>

      {/* GALLERY HERO */}
      <Section className="bg-surface">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
            {t("programs.kap.galleryEyebrow")}
          </span>
          <h3 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            {t("programs.kap.galleryTitle")}
          </h3>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
            <p>{t("programs.kap.galleryP1")}</p>
            <p>
              <Trans i18nKey="programs.kap.galleryP2" components={transComponents} />
            </p>
          </div>

          <figure className="mt-10 overflow-hidden rounded-2xl border border-line bg-bg">
            <SmartImage src="https://generationaid.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-05-25-at-8.14.03-PM-1024x768.jpeg"
              alt="Workshop promoting beauty and pride for refugees"
              className="h-full w-full object-cover" />
            <figcaption className="px-6 py-3 text-sm text-muted">
              {t("programs.kap.galleryCaption1")}
            </figcaption>
          </figure>

          <figure className="mt-6 overflow-hidden rounded-2xl border border-line bg-bg">
            <SmartImage src="https://generationaid.org/wp-content/uploads/2026/06/1747669564285-1-1024x454.jpg"
              alt="Community art workshop"
              className="h-full w-full object-cover" />
            <figcaption className="px-6 py-3 text-sm text-muted">
              {t("programs.kap.galleryCaption2")}
            </figcaption>
          </figure>

          <p className="mt-8 text-base leading-relaxed text-muted">
            {t("programs.kap.galleryP3")}
          </p>

          <figure className="mt-10 overflow-hidden rounded-2xl border border-line bg-bg">
            <SmartImage src="https://generationaid.org/wp-content/uploads/2026/06/1747669567771-1024x454.jpg"
              alt="The Senga Gallery — the first art gallery in Kakuma refugee camp"
              className="h-full w-full object-cover" />
            <figcaption className="px-6 py-3 text-sm text-muted">
              <Trans i18nKey="programs.kap.galleryCaption3" components={transComponents} />
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* WHY THIS GALLERY MATTERS */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-bold text-ink sm:text-4xl">
            {t("programs.kap.whyTitle")}
          </h3>
          <p className="mt-3 text-muted">{t("programs.kap.whySubtitle")}</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
          {whyCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border-l-4 border-primary-500 bg-surface p-6 shadow-sm"
            >
              <h4 className="font-display text-lg font-semibold text-ink">{card.title}</h4>
              <p className="mt-3 text-sm text-muted">{card.body}</p>
            </div>
          ))}
        </div>

        <figure className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-line bg-surface">
          <SmartImage src="https://generationaid.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-05-25-at-8.43.05-PM-1024x768.jpeg"
            alt="The Senga Gallery interior"
            className="h-full w-full object-cover" />
        </figure>
      </Section>

      {/* CTA */}
      <Section className="bg-primary-600 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{t("programs.cta.title")}</h2>
          <p className="mt-3 text-primary-100">{t("programs.cta.subtitle")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              className="rounded-md bg-accent-500 px-5 py-3 text-sm font-semibold text-ink hover:bg-accent-400"
            >
              {t("common.donate")}
            </button>
            <Link
              to="/contact"
              className="rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              {t("common.getInTouch")}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
