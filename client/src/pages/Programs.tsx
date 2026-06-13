import { Link } from "react-router-dom";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";

const subPrograms = [
  {
    title: "Computer Literacy Skills",
    image: "https://generationaid.org/wp-content/uploads/2025/10/WhatsApp-Image-2025-09-17-at-22.10.31_0778a7cc.jpg",
    body: "ICT and digital literacy training that prepares refugee youth for both online and offline careers.",
  },
  {
    title: "Tailoring & Dressmaking",
    image: "https://generationaid.org/wp-content/uploads/2025/02/Dress-making.png",
    body: "Hands-on craft training paired with entrepreneurship coaching so learners can launch their own tailoring businesses.",
  },
  {
    title: "English Language Skills",
    image: "https://generationaid.org/wp-content/uploads/2025/02/English-skills.png",
    body: "Communicative English classes for beginner, intermediate and advanced learners — built around real daily interactions.",
  },
];

const programDetails = [
  {
    id: "computer-literacy",
    title: "Computer Literacy Skills",
    body: `Information and Communication Technologies (ICT) are essential skills for any career a student may want to pursue. At GAID we offer two ICT courses tailored to the needs of youth in Kakuma — Basic ICT & Digital Literacy and an introduction to programming. With these skills we unlock the creativity of youth and enable them to transform their communities through innovation and virtual entrepreneurship, paving the way for decent livelihoods and economic growth both online and offline.`,
  },
  {
    id: "tailoring",
    title: "Tailoring & Dressmaking Craft Training",
    body: `Our craft training program provides practical tailoring and dressmaking skills through hands-on training and attachments with local tailoring businesses. Participants also take part in entrepreneurship training to equip them with the skills needed to start and run their own successful businesses — creating their own opportunities and achieving self-sufficiency.`,
  },
  {
    id: "english",
    title: "English Language Skills",
    body: `GAID's English language program is designed for beginners, intermediates and advanced learners. We offer Communicative English classes for youth who need to improve day-to-day interactions and return to their communities with a better understanding of English in both written and oral forms.`,
  },
];

export default function Programs() {
  return (
    <>
      {/* HERO */}
      <Section className="!pt-20 !pb-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            Digital Livelihood
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl">
            Education &amp; Capacity Building
          </h1>
          <p className="mt-6 text-lg text-muted">
            Vocational and education programs in ICT, tailoring &amp; dressmaking craft
            training, English language skills, and other innovative education that plays
            a critical role in the economic and livelihood development of refugee youth
            in the Kakuma refugee camp.
          </p>
        </div>
      </Section>

      {/* OVERVIEW CARDS */}
      <Section className="!pt-0">
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
      {programDetails.map((p, i) => (
        <Section
          key={p.id}
          id={p.id}
          className={i % 2 === 0 ? "bg-surface" : ""}
        >
          <div className="mx-auto max-w-4xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              Program {i + 1}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">{p.title}</h2>
            <p className="mt-5 text-base leading-relaxed text-muted">{p.body}</p>
          </div>
        </Section>
      ))}

      {/* =============================================== */}
      {/* YOUTH DIGITAL SKILLS                            */}
      {/* =============================================== */}

      {/* HERO */}
      <Section className="bg-gradient-to-b from-primary-50 to-bg !pb-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
            Youth Digital Skills
          </span>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl">
            From the camp to the global digital economy
          </h2>
          <p className="mt-6 text-lg text-muted">
            Equipping refugee youth with the skills, tools and connections to earn
            online &mdash; closing the digital divide one trainee at a time.
          </p>
        </div>
      </Section>

      {/* REMOTE WORK / BPO MODEL */}
      <Section className="!pt-0">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              1. Flagship initiative
            </span>
            <h3 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Remote Work through the BPO Model
            </h3>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
              <p>
                One of Generation Aid&apos;s flagship initiatives is the{" "}
                <span className="font-semibold text-ink">
                  Remote Work Training &amp; Freelancing Bootcamp
                </span>
                , designed to equip refugee youth with the digital skills needed to
                access online job opportunities. In Kakuma, where traditional
                employment is scarce, remote work offers a lifeline to financial
                independence. The program trains participants in{" "}
                <span className="font-semibold text-ink">graphic design</span>,{" "}
                <span className="font-semibold text-ink">digital marketing</span>,{" "}
                <span className="font-semibold text-ink">content writing</span> and{" "}
                <span className="font-semibold text-ink">virtual assistance</span>{" "}
                &mdash; giving them marketable skills for a global market and
                connecting them to remote work opportunities.
              </p>
              <p>
                The bootcamp includes hands-on workshops, mentorship from experienced
                freelancers, and dedicated workstations with internet access so
                participants can practise their skills and apply for jobs. By the end
                of the training, many graduates secure remote contracts &mdash;
                enabling them to earn a sustainable income, support their families and
                reduce reliance on humanitarian aid.
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
              2. Building the next generation of developers
            </span>
            <h3 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Coding &amp; Web Development Academy
            </h3>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
              <p>
                Beyond technical training, participants work on{" "}
                <span className="font-semibold text-ink">real-world projects</span>{" "}
                &mdash; building e-commerce websites and digital storytelling
                platforms for refugee artists. Hackathons and coding challenges
                encourage innovation by tasking students with{" "}
                <span className="font-semibold text-ink">
                  solving local problems through technology
                </span>
                .
              </p>
              <p>
                The program also connects aspiring developers with{" "}
                <span className="font-semibold text-ink">career guidance</span>,{" "}
                <span className="font-semibold text-ink">scholarships</span> and{" "}
                <span className="font-semibold text-ink">internship opportunities</span>{" "}
                &mdash; providing a clear pathway into the global tech industry.
              </p>
              <p>
                These initiatives reflect Generation Aid&apos;s commitment to bridging
                the digital divide and ensuring that refugee youth are{" "}
                <span className="font-semibold text-ink">
                  not left behind in the digital economy
                </span>
                .
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
            Creativity
          </span>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl">
            Art crossing borders
          </h2>
          <p className="mt-6 text-lg text-muted">
            A single canvas sparked a movement &mdash; bringing materials, workshops and
            dignity to refugee artists in Kakuma Camp.
          </p>
        </div>
      </Section>

      {/* HOW IT BEGAN */}
      <Section className="!pt-0">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
            How it began
          </span>
          <h3 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            One painting, one conversation
          </h3>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
            <p>
              <em>Boat</em> &mdash; the painting that started all of this &mdash; led
              Tara Dominick and Hubert into a conversation about the existence of art in
              the Kakuma Refugee Camp. What followed was the founding of the{" "}
              <span className="font-semibold text-ink">
                Kakuma Art Project (KAP)
              </span>
              .
            </p>
            <p>
              Once committed to the project, it was as if everything started to align.
              Tara initially offered two hours a week, but the project now occupies three
              or four days of her week &mdash; and her thoughts constantly.
            </p>
            <p>
              From conception, Tara sold <strong>10 limited edition signed prints</strong>{" "}
              of <em>Boat</em> to fund Phase 1 &mdash; getting paints, brushes, palette
              knives, paper, charcoal and canvasses into the camp.
            </p>
          </div>

          <blockquote className="mt-8 rounded-2xl border-l-4 border-primary-500 bg-surface p-6 italic text-ink shadow-sm">
            &ldquo;One small action can ripple out to create significant change.&rdquo;
            <footer className="mt-3 text-sm font-semibold not-italic text-muted">
              &mdash; Bob Brimson, one of the first believers in the project. He coined
              the tagline <span className="text-primary-600">&ldquo;the power of one painting&rdquo;</span>.
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
              The beauty of the programs
            </span>
            <h3 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Education, visibility and opportunity
            </h3>
            <p className="mt-5 text-base leading-relaxed text-muted">
              The project provides artists at the camp with education, visibility and
              opportunity &mdash; supported by a continuing series of workshops run
              through the <span className="font-semibold text-ink">Generation Aid
              Centre</span> in Kakuma Camp.
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
              An artist&apos;s story
            </span>
            <h3 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Painting <em>Home</em> from afar
            </h3>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
              <p>
                Mwangi, a 52-year-old artist living at the Kakuma Camp, creates
                beautiful images of his homeland. Yet for years he was limited by
                resources &mdash; no canvas, no paint, no brushes.
              </p>
              <p>
                His passion to paint meant salvaging old t-shirts from the dump,
                washing them, and coating them with glue to create a makeshift canvas.
                His ingenuity and passion moved Tara deeply when she first saw his
                work.
              </p>
              <p>
                His work has given the root of the program and is now well recognised.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ACTIVITIES — REFUGEE ARTISAN COOPERATIVE */}
      <Section className="bg-surface">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
            Activities
          </span>
          <h3 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            Refugee Artisan &amp; Handicraft Cooperative
          </h3>

          <figure className="mt-8 overflow-hidden rounded-2xl border border-line bg-bg">
            <SmartImage src="https://generationaid.org/wp-content/uploads/2026/06/image-1-1024x544.png"
              alt="Refugee artisan cooperative at work"
              className="h-full w-full object-cover" />
          </figure>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
            <p>
              Many refugees in Kakuma come from rich cultural backgrounds with{" "}
              <span className="font-semibold text-ink">strong artistic traditions</span>{" "}
              in beading, weaving, tailoring and wood carving. However, limited market
              access prevents them from turning these skills into sustainable
              businesses. To address this, Generation Aid established the{" "}
              <span className="font-semibold text-ink">
                Refugee Artisan &amp; Handicraft Cooperative
              </span>{" "}
              &mdash; a platform that supports refugee artisans in producing and selling
              their handmade products to local and international markets.
            </p>
          </div>

          <figure className="mt-8 overflow-hidden rounded-2xl border border-line bg-bg">
            <SmartImage src="https://generationaid.org/wp-content/uploads/2025/03/1724447989836-1-1024x461.jpeg"
              alt="Handicraft training session"
              className="h-full w-full object-cover" />
          </figure>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
            <p>
              The initiative provides specialised training in various handicrafts,
              helping artisans improve product quality, develop unique designs and scale
              their production. It also connects them with buyers, NGOs and online
              marketplaces where they can showcase and sell their work. Through
              storytelling and branding workshops, artisans learn how to share their
              journey and cultural heritage &mdash; making their products more valuable
              in global markets.
            </p>
          </div>
        </div>
      </Section>

      {/* CELEBRATING OUR TALENTS */}
      <Section>
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              Celebrating our talents
            </span>
            <h3 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              A cooperative model that pools strength
            </h3>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
              <p>
                To further support artisans, Generation Aid is developing a{" "}
                <span className="font-semibold text-ink">cooperative model</span> that
                lets artisans pool resources, access small business loans and
                collectively invest in materials and equipment. This ensures that even
                those with limited financial means can participate and grow their
                businesses.
              </p>
              <p>
                The Refugee Artisan &amp; Handicraft Cooperative not only preserves
                cultural heritage but also creates{" "}
                <span className="font-semibold text-ink">
                  sustainable jobs and economic opportunities
                </span>{" "}
                for artisans &mdash; particularly women and youth. By giving them a
                platform to monetise their skills, this initiative empowers refugees to
                build independent and dignified livelihoods beyond humanitarian aid.
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
            The Senga Gallery
          </span>
          <h3 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            More than a building &mdash; an art gallery at the heart of Kakuma
          </h3>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
            <p>
              The first ever art gallery has been built &mdash; becoming a beacon of
              hope, a place for refugees to express themselves, to inspire one another,
              and to stand proud alongside each other as they move forward with their
              lives.
            </p>
            <p>
              KAP is run by{" "}
              <span className="font-semibold text-ink">Tara Dominick</span>, a fine
              artist from Devon, together with{" "}
              <span className="font-semibold text-ink">Hubert Senga</span> and
              Generation Aid who manage delivery of the art programmes on the ground in
              Kakuma.
            </p>
          </div>

          <figure className="mt-10 overflow-hidden rounded-2xl border border-line bg-bg">
            <SmartImage src="https://generationaid.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-05-25-at-8.14.03-PM-1024x768.jpeg"
              alt="Workshop promoting beauty and pride for refugees"
              className="h-full w-full object-cover" />
            <figcaption className="px-6 py-3 text-sm text-muted">
              The workshop organised by the Birgheter project, to promote beauty and
              pride for the refugees.
            </figcaption>
          </figure>

          <figure className="mt-6 overflow-hidden rounded-2xl border border-line bg-bg">
            <SmartImage src="https://generationaid.org/wp-content/uploads/2026/06/1747669564285-1-1024x454.jpg"
              alt="Community art workshop"
              className="h-full w-full object-cover" />
            <figcaption className="px-6 py-3 text-sm text-muted">
              Through running art workshops, Generation Aid learns the real challenges
              the community is facing and develops community-based solutions.
            </figcaption>
          </figure>

          <p className="mt-8 text-base leading-relaxed text-muted">
            Through running workshops the refugee community in Kakuma comes together to
            advocate for peace, unity and talent. It is a unique program giving refugees
            a platform to share what&apos;s hidden in their cultures &mdash; gifts the
            wider world can learn from.
          </p>

          <figure className="mt-10 overflow-hidden rounded-2xl border border-line bg-bg">
            <SmartImage src="https://generationaid.org/wp-content/uploads/2026/06/1747669567771-1024x454.jpg"
              alt="The Senga Gallery — the first art gallery in Kakuma refugee camp"
              className="h-full w-full object-cover" />
            <figcaption className="px-6 py-3 text-sm text-muted">
              The first ever art gallery in Kakuma refugee camp &mdash; named{" "}
              <span className="font-semibold text-ink">The Senga Gallery</span> to
              honour the refugee advocacy of Hubert Senga, founder of Generation Aid.
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* WHY THIS GALLERY MATTERS */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-bold text-ink sm:text-4xl">
            Why this gallery matters
          </h3>
          <p className="mt-3 text-muted">
            The gallery is inclusive &mdash; built to promote creativity among
            refugees.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
          {[
            {
              title: "Expression & Identity",
              body: "A safe space where refugee artists can give form to memories of home, stories of journey, and visions of tomorrow.",
            },
            {
              title: "Solar-Powered Gallery",
              body: "Solar panels ensure there's always light to see the artwork — making the gallery viable and sustainable long-term.",
            },
            {
              title: "Community & Solidarity",
              body: "Artists stand alongside one another, building pride and connection within a community that has lost so much.",
            },
            {
              title: "Global Visibility",
              body: "Through exhibitions like the one in Wiltshire, refugee stories reach new audiences — bridging worlds through art.",
            },
          ].map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border-l-4 border-primary-500 bg-surface p-6 shadow-sm"
            >
              <h4 className="font-display text-lg font-semibold text-ink">{b.title}</h4>
              <p className="mt-3 text-sm text-muted">{b.body}</p>
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
          <h2 className="text-3xl font-bold sm:text-4xl">
            Help us reach more refugee youth.
          </h2>
          <p className="mt-3 text-primary-100">
            Sponsor a program, donate equipment or join us as a volunteer.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              className="rounded-md bg-accent-500 px-5 py-3 text-sm font-semibold text-ink hover:bg-accent-400"
            >
              Donate
            </button>
            <Link
              to="/contact"
              className="rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
