import { Link } from "react-router-dom";
import Section from "@/components/Section";

const objectives = [
  "Empower refugees with knowledge and skills — education, digital skills, livelihood and entrepreneurship — so they can earn a sustainable income through remote work opportunities.",
  "Equip refugees with the essential knowledge and competencies to navigate the digital world, fostering creativity and problem-solving.",
  "Build sustainable community development projects through long-term initiatives in education, entrepreneurship and social support.",
];

const programs = [
  {
    title: "Vocational & Livelihood skills",
    body: "Vocational training, small-business support and income-generating projects that help refugees build sustainable, self-reliant futures.",
  },
  {
    title: "Education",
    body: "Learning tools and inclusive programs that support education for all — especially girls and children with disabilities — and bridge youth into higher education.",
  },
  {
    title: "EdTech",
    body: "Digital learning tools, inclusive education and skills training that close the education gap in displacement settings.",
  },
  {
    title: "Entrepreneurship",
    body: "Training, resources and market access that help refugees launch sustainable businesses and achieve self-reliance.",
  },
  {
    title: "Remote Employment",
    body: "Digital-skills training plus our Digital Community Hub — high-speed internet, stable power and devices — connecting refugees to global remote work.",
  },
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
    body: "We build self-sustaining pathways so the organisation can keep supporting the community even without external support.",
  },
];

export default function About() {
  return (
    <>
      {/* HERO */}
      <Section className="!pt-20 !pb-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            Where it all began
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl">
            Who are we?
          </h1>
          <p className="mt-6 text-lg text-muted">
            Generation Aid is a youth Refugee-Led Organisation (RLO) dedicated to
            transforming lives through vocational skills, EdTech, education, livelihood
            and entrepreneurship programs &mdash; creating educational and employment
            pathways for refugee communities and helping them integrate into the global
            economy.
          </p>
        </div>
      </Section>

      {/* INTRO STORY */}
      <Section className="!pt-0">
        <div className="mx-auto max-w-4xl space-y-5 text-base leading-relaxed text-muted">
          <p>
            We are transforming education-into-employment systems &mdash; preparing,
            placing and supporting people into life-changing careers that would
            otherwise be inaccessible &mdash; so refugees can integrate into the global
            economy.
          </p>
          <p>
            Generation Aid is a youth-led refugee nonprofit based in Kenya&apos;s Kakuma
            Refugee Camp, born in 2019 during COVID-19. Over the years, GAID has worked
            tirelessly to provide a range of services to displaced communities &mdash;
            vocational education, entrepreneurship, food distribution and digital
            skills.
          </p>
          <p>
            The name <span className="font-semibold text-ink">Generation Aid</span> was
            given by our founder{" "}
            <a
              href="https://www.linkedin.com/in/hubert-sengap/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary-600 hover:underline"
            >
              Hubert Senga
            </a>{" "}
            to reflect our ambition of serving refugees and displaced people in this
            current generation.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-block rounded-md bg-primary-500 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-600"
            >
              Contact us
            </Link>
          </div>
        </div>
      </Section>

      {/* VISION + MISSION */}
      <Section className="bg-surface">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-bg p-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              Our Vision
            </span>
            <h2 className="mt-3 text-2xl font-bold text-ink">A future without barriers</h2>
            <p className="mt-4 text-muted">
              Empowering neglected refugees with innovative programs that reduce
              unemployment and increase income, so they can become active members of the
              global community and economy.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-bg p-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              Our Mission
            </span>
            <h2 className="mt-3 text-2xl font-bold text-ink">Skills that change lives</h2>
            <p className="mt-4 text-muted">
              To transform refugees&apos; lives by providing vocational skills and
              EdTech programs that create educational and employment pathways &mdash;
              helping them integrate into the global economy.
            </p>
          </div>
        </div>
      </Section>

      {/* OBJECTIVES */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">Our objectives</h2>
          <p className="mt-3 text-muted">What Generation Aid works to achieve.</p>
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
            What we do
          </span>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            Our focused programs
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
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
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">Our core values</h2>
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

      {/* HISTORY */}
      <Section className="bg-surface">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
            Our story
          </span>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            History &mdash; how we began
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
            <p>
              Generation Aid was born in 2019 from the vision, determination and lived
              experience of our founder{" "}
              <a
                href="https://www.linkedin.com/in/hubert-sengap/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-primary-600 hover:underline"
              >
                Hubert Senga
              </a>{" "}
              &mdash; a social entrepreneur and changemaker on a mission to transform
              the lives of refugees through digital skills, innovative education and
              economic empowerment.
            </p>
            <p>
              As a Congolese refugee who has lived in Kakuma refugee camp for over nine
              years, Hubert has witnessed firsthand the immense barriers refugees face:
              limited access to education, unemployment and the struggle for dignity.
              But rather than accept these challenges as fate, he chose to{" "}
              <span className="font-semibold text-ink">rewrite the narrative.</span>
            </p>
            <p>
              GAID&apos;s work is grounded in the belief that refugees and other
              displaced individuals have the right to live with dignity and respect, and
              should have access to the resources and opportunities they need to rebuild
              their lives. We became a Community Based Organisation in 2019, transitioned
              to the name <span className="font-semibold text-ink">Generation Aid</span>{" "}
              the same year, and received our Government certificate in 2025.
            </p>
            <p>
              Through Generation Aid we are not just closing literacy and unemployment
              gaps &mdash; we are building a future where every refugee has the tools,
              knowledge and opportunities to shape their destiny. This is more than a
              movement; it is a revolution of hope, innovation and unstoppable
              resilience.
            </p>
            <p>
              We are grateful to our partners and donors who have been instrumental in
              this journey of empowering youth and advancing the UN Strategic Development
              Goals 2030 of Quality Education, Reduced Inequality, Decent Work and
              Economic Growth.
            </p>
          </div>
        </div>
      </Section>

      {/* GET INVOLVED */}
      <Section className="bg-primary-600 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Want to get involved?</h2>
          <p className="mt-3 text-primary-100">
            There are many ways to stand with us &mdash; choose what fits you best.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
            <h3 className="font-display text-lg font-semibold">Give</h3>
            <p className="mt-2 text-sm text-primary-100">
              Your support fuels our mission. Donate today and make a lasting impact.
            </p>
            <button
              type="button"
              className="mt-5 inline-block rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-ink hover:bg-accent-400"
            >
              Donate now
            </button>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
            <h3 className="font-display text-lg font-semibold">Sponsor</h3>
            <p className="mt-2 text-sm text-primary-100">
              Become a sponsor at GAID and help drive meaningful change in our programs.
            </p>
            <Link
              to="/programs"
              className="mt-5 inline-block rounded-md border border-white/40 px-4 py-2 text-sm font-semibold hover:bg-white/10"
            >
              Sponsor a program
            </Link>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
            <h3 className="font-display text-lg font-semibold">Volunteer</h3>
            <p className="mt-2 text-sm text-primary-100">
              Join us as a volunteer and be part of creating lasting impact.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-block rounded-md border border-white/40 px-4 py-2 text-sm font-semibold hover:bg-white/10"
            >
              Contact us
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
