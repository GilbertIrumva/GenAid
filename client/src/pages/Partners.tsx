import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";
import { SITE } from "@/data/site";
import {
  partners,
  partnershipBenefits,
  type PartnerCategory,
} from "@/data/partners";

const categories: PartnerCategory[] = [
  "Strategic",
  "Funding",
  "Implementation",
  "Corporate",
];

const partnershipTiers = [
  {
    name: "Programme partner",
    body: "Co-design and co-deliver a specific programme (digital skills, tailoring, English). Quarterly impact reports tied to your investment.",
    from: "From $10,000",
  },
  {
    name: "Hub sponsor",
    body: "Named-room sponsorship inside our Digital Community Hub, brand visibility on-site and in our annual report.",
    from: "From $25,000",
  },
  {
    name: "Talent partner",
    body: "Hire Generation Jobs graduates directly. We handle screening, onboarding and ongoing mentorship at no cost to you.",
    from: "Hiring partnership",
  },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function Partners() {
  useSEO({
    title: "Partners",
    description:
      "NGOs, corporates and individuals partnering with Generation Aid to scale refugee-led impact in Kakuma.",
  });

  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[55vh] items-center overflow-hidden">
        {/* TODO: replace with real Generation Aid photo */}
        <SmartImage
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80"
          alt="Team collaborating around a table"
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
              Partners
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              Partner with a{" "}
              <span className="text-primary-300">refugee-led</span> organisation
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              We work with NGOs, governments and companies that want measurable
              impact and a direct line to the community they serve.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#become-a-partner"
                className="rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
              >
                Become a partner
              </a>
              <a
                href={`mailto:${SITE.email}?subject=Partnership%20enquiry`}
                className="rounded-md border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                Email partnerships team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <Section className="bg-surface">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Why partner with us
          </h2>
          <p className="mt-3 text-muted">
            Four things every partner gets, day one.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {partnershipBenefits.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-line bg-bg p-6 shadow-sm"
            >
              <h3 className="font-display text-lg font-semibold text-ink">
                {b.title}
              </h3>
              <p className="mt-3 text-sm text-muted">{b.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CURRENT PARTNERS */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              Our current partners
            </h2>
            <p className="mt-2 text-muted">
              A growing network of organisations standing with refugee-led
              innovation.
            </p>
          </div>
        </div>

        {categories.map((cat) => {
          const inCat = partners.filter((p) => p.category === cat);
          if (inCat.length === 0) return null;
          return (
            <div key={cat} className="mt-10">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                {cat}
              </h3>
              <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {inCat.map((p) => (
                  <a
                    key={p.name}
                    href={p.url ?? "#"}
                    target={p.url ? "_blank" : undefined}
                    rel={p.url ? "noreferrer" : undefined}
                    className="flex gap-4 rounded-2xl border border-line bg-surface p-5 shadow-sm transition hover:border-primary-300 hover:shadow-md"
                  >
                    <div className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-xl bg-primary-50 font-display text-lg font-bold text-primary-600">
                      {p.logo ? (
                        <img
                          src={p.logo}
                          alt={p.name}
                          className="h-12 w-12 object-contain"
                        />
                      ) : (
                        initials(p.name)
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-display text-base font-semibold text-ink">
                        {p.name}
                      </p>
                      <p className="mt-1 text-sm text-muted">{p.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </Section>

      {/* TIERS */}
      <Section id="become-a-partner" className="bg-surface">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            Get involved
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            Three ways to partner
          </h2>
          <p className="mt-3 text-muted">
            Every partnership is bespoke &mdash; pick the entry point that fits
            and we&apos;ll shape the rest with you.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {partnershipTiers.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-line bg-bg p-6 shadow-sm"
            >
              <h3 className="font-display text-lg font-semibold text-ink">
                {t.name}
              </h3>
              <p className="mt-3 flex-1 text-sm text-muted">{t.body}</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-primary-600">
                {t.from}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-line bg-bg p-10 text-center">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Ready to talk?
          </h2>
          <p className="mt-3 text-muted">
            Send us a short note about your organisation and what you&apos;d like
            to build together. We respond within two business days.
          </p>
          <a
            href={`mailto:${SITE.email}?subject=Partnership%20enquiry`}
            className="mt-6 inline-block rounded-md bg-primary-500 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-600"
          >
            Email {SITE.email}
          </a>
        </div>
      </Section>
    </>
  );
}
