import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { api } from "@/api/client";
import { posts } from "@/data/posts";
import { videos as fallbackVideos } from "@/data/videos";
import { causes } from "@/data/causes";
import { team } from "@/data/team";
import { testimonials } from "@/data/testimonials";
import { SITE } from "@/data/site";

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
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80",
  },
  {
    tag: "Youth Digital Skills",
    title: "Remote Work Bootcamp",
    body: "Graphic design, content writing and virtual assistance — connecting youth to global remote work.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
  },
  {
    tag: "Creativity",
    title: "Kakuma Art Project",
    body: "A platform for refugee artists — workshops, materials and visibility through the Senga Gallery.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80",
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
  const { data: apiVideos = [] } = useQuery({
    queryKey: ["public", "videos"],
    queryFn: fetchVideos,
  });

  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [contactState, setContactState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [contactError, setContactError] = useState<string | null>(null);

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

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

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNewsletterState("sending");
    try {
      await submitContact({
        name: "Newsletter subscriber",
        email: newsletterEmail,
        message: "Newsletter signup from website",
      });
      setNewsletterState("sent");
      setNewsletterEmail("");
    } catch {
      setNewsletterState("error");
    }
  }

  return (
    <>
      {/* ============ HERO ============ */}
      <Section id="home" className="!pt-20 !pb-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
              Refugee-led innovation in Kakuma
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
              Building futures, <br />
              <span className="text-primary-500">one opportunity</span> at a time.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Generation Aid equips youth in Kakuma refugee camp with digital skills,
              entrepreneurship training, and pathways to employment &mdash; so they can
              shape their own future.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#programs"
                className="rounded-md bg-primary-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600"
              >
                Explore programs
              </a>
              <a
                href={SITE.donateUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-primary-500 px-5 py-3 text-sm font-semibold text-primary-600 transition hover:bg-primary-50"
              >
                Donate
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl bg-primary-100">
              <SmartImage
                src="https://generationaid.org/wp-content/uploads/2025/03/1737728618417-1-1024x768.jpeg"
                alt="Refugee youth in a Generation Aid training session in Kakuma"
                fallbackLabel="Photo coming soon"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-surface p-4 shadow-lg sm:block">
              <p className="font-display text-3xl font-bold text-primary-500">2,400+</p>
              <p className="text-xs uppercase tracking-wider text-muted">Lives impacted</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ============ ABOUT ============ */}
      <Section id="about" className="bg-surface">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            About us
          </span>
          <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
            A youth refugee-led organisation
          </h2>
          <p className="mt-5 text-lg text-muted">
            Generation Aid is a youth Refugee-Led Organisation (RLO) born in 2019 in
            Kakuma, transforming education-into-employment systems so refugees can
            integrate into the global economy.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-bg p-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              Our Vision
            </span>
            <h3 className="mt-3 text-2xl font-bold text-ink">A future without barriers</h3>
            <p className="mt-4 text-muted">
              Empowering neglected refugees with innovative programs that reduce
              unemployment and increase income &mdash; so they can become active members
              of the global community and economy.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-bg p-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              Our Mission
            </span>
            <h3 className="mt-3 text-2xl font-bold text-ink">Skills that change lives</h3>
            <p className="mt-4 text-muted">
              To transform refugees&apos; lives by providing vocational skills and
              EdTech programs that create educational and employment pathways.
            </p>
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
            Read our full story &rarr;
          </Link>
        </div>
      </Section>

      {/* ============ PROGRAMS ============ */}
      <Section id="programs">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
              Our work
            </span>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Featured programs
            </h2>
            <p className="mt-2 text-muted">A snapshot of what we run on the ground.</p>
          </div>
          <Link
            to="/programs"
            className="text-sm font-semibold text-primary-600 hover:underline"
          >
            View all programs &rarr;
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
              Urgent causes
            </span>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Causes that need your support
            </h2>
            <p className="mt-2 text-muted">
              Every contribution moves a specific project forward.
            </p>
          </div>
          <a
            href={SITE.donateUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-primary-600 hover:underline"
          >
            Donate via GlobalGiving &rarr;
          </a>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {causes.map((c) => {
            const pct = Math.min(100, Math.round((c.raised / c.goal) * 100));
            return (
              <article
                key={c.title}
                className="overflow-hidden rounded-2xl border border-line bg-bg transition hover:border-primary-300 hover:shadow-md"
              >
                <div className="aspect-video w-full overflow-hidden bg-primary-50">
                  <SmartImage
                    src={c.image}
                    alt={c.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{c.description}</p>

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-primary-600">
                        ${c.raised.toLocaleString()} raised
                      </span>
                      <span className="text-muted">
                        of ${c.goal.toLocaleString()}
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
                    Donate to this cause
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
            Impact
          </span>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            Our impact in numbers
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            Real change, measured by the people we&apos;ve walked alongside.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-line bg-bg p-6 text-center"
            >
              <p className="font-display text-4xl font-bold text-primary-500">
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
            Our team
          </span>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            The people behind Generation Aid
          </h2>
          <p className="mt-3 text-muted">
            A refugee-led team of passionate, transparent and accountable changemakers.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <article
              key={m.name}
              className="overflow-hidden rounded-2xl border border-line bg-surface text-center shadow-sm"
            >
              <div className="aspect-square w-full overflow-hidden bg-primary-50">
                <SmartImage
                  src={m.image}
                  alt={m.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {m.name}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
                  {m.role}
                </p>
                <p className="mt-3 text-sm text-muted">{m.bio}</p>
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-xs font-semibold text-primary-600 hover:underline"
                  >
                    Connect on LinkedIn &rarr;
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ============ STORIES / BLOG ============ */}
      <Section id="stories">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
              Stories
            </span>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Latest from the blog
            </h2>
            <p className="mt-2 text-muted">News, project launches and reflections from Kakuma.</p>
          </div>
          <Link to="/blog" className="text-sm font-semibold text-primary-600 hover:underline">
            All articles &rarr;
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
                Read more &rarr;
              </Link>
            </article>
          ))}
        </div>
      </Section>

      {/* ============ TESTIMONIALS ============ */}
      <Section id="testimonials" className="bg-surface">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            What people say about us
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
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
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-4">
                <p className="font-display text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* ============ VIDEOS ============ */}
      <Section id="videos" className="bg-surface">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            Watch
          </span>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            Videos &amp; stories on screen
          </h2>
          <p className="mt-3 text-muted">
            Walkthroughs of our hub, graduate testimonials, and updates from the field.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {apiVideos.length > 0
            ? apiVideos.slice(0, 3).map((v) => (
                <article
                  key={v._id}
                  className="overflow-hidden rounded-2xl border border-line bg-bg transition hover:border-primary-300 hover:shadow-md"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-ink">
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
                  <div className="relative aspect-video w-full overflow-hidden bg-ink">
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
                          Coming soon
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
      <Section id="donate" className="bg-primary-600 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Stand with the next generation.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-primary-100">
            Whether you partner, fund, mentor or volunteer &mdash; your support unlocks
            opportunity for refugee youth.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
            <h3 className="font-display text-lg font-semibold">Give</h3>
            <p className="mt-2 text-sm text-primary-100">
              Your support fuels our mission. Donate today and make a lasting impact.
            </p>
            <a
              href={SITE.donateUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-ink hover:bg-accent-400"
            >
              Donate now
            </a>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
            <h3 className="font-display text-lg font-semibold">Sponsor</h3>
            <p className="mt-2 text-sm text-primary-100">
              Become a sponsor and help drive meaningful change in our programs.
            </p>
            <a
              href="#programs"
              className="mt-5 inline-block rounded-md border border-white/40 px-4 py-2 text-sm font-semibold hover:bg-white/10"
            >
              Sponsor a program
            </a>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
            <h3 className="font-display text-lg font-semibold">Volunteer</h3>
            <p className="mt-2 text-sm text-primary-100">
              Join us as a volunteer and be part of creating lasting impact.
            </p>
            <a
              href="#contact"
              className="mt-5 inline-block rounded-md border border-white/40 px-4 py-2 text-sm font-semibold hover:bg-white/10"
            >
              Get in touch
            </a>
          </div>
        </div>
      </Section>

      {/* ============ NEWSLETTER ============ */}
      <Section id="newsletter" className="bg-surface">
        <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 p-10 text-center text-white shadow-lg sm:p-12">
          <h2 className="text-3xl font-bold sm:text-4xl">Stay in the loop</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-100">
            Monthly updates on programs, volunteer opportunities and stories from
            Kakuma &mdash; straight to your inbox.
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              required
              type="email"
              placeholder="you@email.com"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 rounded-md border border-white/30 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-primary-100 outline-none focus:border-white"
            />
            <button
              type="submit"
              disabled={newsletterState === "sending"}
              className="rounded-md bg-accent-500 px-5 py-3 text-sm font-semibold text-ink hover:bg-accent-400 disabled:opacity-60"
            >
              {newsletterState === "sending" ? "Subscribing…" : "Subscribe"}
            </button>
          </form>

          {newsletterState === "sent" && (
            <p className="mt-4 text-sm text-white">
              Thanks &mdash; you&apos;re on the list.
            </p>
          )}
          {newsletterState === "error" && (
            <p className="mt-4 text-sm text-white">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </Section>

      {/* ============ CONTACT ============ */}
      <Section id="contact">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
              Contact
            </span>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Let&apos;s build something together
            </h2>
            <p className="mt-4 text-muted">
              Have a question, partnership idea, or want to volunteer? Send us a message
              and we&apos;ll get back to you.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-muted">
              <li>
                <span className="font-semibold text-ink">Location:</span> Kakuma,
                Turkana County, Kenya
              </li>
              <li>
                <span className="font-semibold text-ink">Email:</span>{" "}
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
              <span className="block text-sm font-semibold text-ink">Name</span>
              <input
                required
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-semibold text-ink">Email</span>
              <input
                required
                type="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary-500"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-semibold text-ink">Message</span>
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
                Thanks &mdash; your message is on its way.
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
              {contactState === "sending" ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </Section>
    </>
  );
}
