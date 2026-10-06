import { Link } from "react-router-dom";
import {
  Briefcase,
  GraduationCap,
  Laptop,
  CheckCircle2,
  DollarSign,
  Users,
  ChevronDown,
} from "lucide-react";
import Section from "@/components/Section";
import SmartImage from "@/components/SmartImage";
import { useSEO } from "@/utils/useSEO";

const JOB_SEEKER_FORM_URL = "https://forms.gle/cJSH8GCt1MP2ZRVB6";

const jobSeekerBenefits = [
  {
    icon: Briefcase,
    badge: "Global Employment",
    title: "Access International Remote Work",
    description:
      "Get matched with international employers, tech startups, and social enterprises seeking skilled, dedicated remote talent from Kakuma and the host community.",
  },
  {
    icon: Laptop,
    badge: "Dedicated Hub",
    title: "Free Modern Workstation & Internet",
    description:
      "Work from our fully equipped BPO center in Kakuma featuring reliable solar & generator power, modern computers, and high-speed commercial fiber internet.",
  },
  {
    icon: GraduationCap,
    badge: "Mentorship",
    title: "Continuous Upskilling & Mentorship",
    description:
      "Receive ongoing coaching in remote collaboration tools, English business communication, generative AI, and professional delivery standards.",
  },
  {
    icon: DollarSign,
    badge: "Fair Income",
    title: "Dignified, Transparent Compensation",
    description:
      "Earn fair income that directly supports you and your family, helping you achieve financial self-reliance and build lasting career confidence.",
  },
  {
    icon: Users,
    badge: "Community",
    title: "Open to Refugees & Host Community",
    description:
      "We foster inclusive economic opportunities for refugees and local Turkana host-community members, creating shared growth and mutual empowerment.",
  },
  {
    icon: CheckCircle2,
    badge: "No Fees",
    title: "100% Free Application & Placement",
    description:
      "Generation Aid and Generation Jobs never charge job seekers any fees. Our mission is pure impact, skills development, and dignified livelihoods.",
  },
];

const inDemandRoles = [
  {
    title: "Customer Support & CRM",
    description: "Email support, live chat assistance, ticketing systems, and community helpdesk.",
  },
  {
    title: "Sales & Outbound Prospecting",
    description: "Lead generation, LinkedIn outreach, CRM data entry, and sales pipeline support.",
  },
  {
    title: "Digital Marketing & Social Media",
    description: "Content scheduling, social engagement, SEO support, and digital campaigns.",
  },
  {
    title: "Graphic Design & Creative Media",
    description: "Canva & Adobe design, social media banners, marketing graphics, and presentation decks.",
  },
  {
    title: "Transcription & Translation",
    description: "Multilingual translation (English, French, Swahili, etc.) and audio/video transcription.",
  },
  {
    title: "Data Annotation & AI Training",
    description: "Dataset preparation, computer vision labeling, NLP text annotation, and prompt testing.",
  },
  {
    title: "E-Commerce & Amazon Support",
    description: "Catalog management, order processing, customer queries, and inventory updates.",
  },
  {
    title: "Virtual Assistance & Admin",
    description: "Calendar management, email handling, research, spreadsheet reporting, and administrative tasks.",
  },
];

const steps = [
  {
    step: "01",
    title: "Submit Your Application",
    description:
      "Fill out our online Job Seeker form with your contact details, education, languages spoken, and digital skills.",
  },
  {
    step: "02",
    title: "Skills Assessment & Interview",
    description:
      "Shortlisted candidates are invited for an interview and a practical assessment in English, typing, and digital tools.",
  },
  {
    step: "03",
    title: "Orientation & Job Readiness",
    description:
      "Join our job-readiness orientation to prepare your CV, build professional work habits, and understand global client expectations.",
  },
  {
    step: "04",
    title: "Placement & Active Support",
    description:
      "Get matched to client projects or BPO contracts with ongoing support from our local project managers and team leads.",
  },
];

const faqs = [
  {
    question: "Who is eligible to apply as a job seeker?",
    answer:
      "Any refugee or host-community member living in Kakuma Refugee Camp or Kalobeyei Integrated Settlement who possesses foundational digital literacy, basic English communication skills, and a commitment to professional growth is eligible to apply.",
  },
  {
    question: "Do I need to own a laptop or have personal internet at home?",
    answer:
      "No! Generation Aid provides access to our modern, fully equipped BPO center in Kakuma with computers, workstations, high-speed fiber internet, and solar power backups during your working hours.",
  },
  {
    question: "Is there any registration fee or payment required?",
    answer:
      "No. All applications, training, and placements through Generation Aid and Generation Jobs are 100% free. We will never ask you for money or fees at any stage of the process.",
  },
  {
    question: "What happens after I submit the Google Form?",
    answer:
      "Our talent recruitment team reviews applications on a rolling basis. If your profile matches upcoming cohorts or employer vacancies, we will contact you via phone or WhatsApp for an interview and skills assessment.",
  },
];

export default function JobSeeker() {
  useSEO({
    title: "Job Seeker Application | Generation Aid",
    description:
      "Apply as a Job Seeker with Generation Aid and Generation Jobs. Empowering refugees and host community members in Kakuma with remote digital jobs and career pathways.",
  });

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-h-screen">
      {/* HERO SECTION WITH FULL-WIDTH JOB SEEKER WORKSPACE IMAGE */}
      <section className="relative w-full overflow-hidden min-h-[440px] sm:min-h-[500px] lg:min-h-[560px] flex items-center bg-[#172554]">
        {/* Full Width Background Image */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <SmartImage
            src="/jobseeker.jpg"
            alt="Generation Jobs BPO workspace and job seekers in Kakuma"
            priority={true}
            className="h-full w-full object-cover object-[center_20%] brightness-105 sm:brightness-110 contrast-[1.04] dark:brightness-100 dark:contrast-[1.08]"
          />
        </div>

        {/* Luminous Gradient Overlay */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#0d1b3e]/90 via-[#0d1b3e]/60 via-45% to-transparent dark:from-slate-950/95 dark:via-slate-950/70 dark:to-slate-950/20 pointer-events-none" />

        {/* Hero Content Box */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl text-white space-y-6">
            <span className="inline-block rounded-md bg-white/20 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white border border-white/30 backdrop-blur-sm">
              Get Involved • Job Seeker
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight !text-white leading-[1.12]">
              Unlock Dignified Digital Work from Kakuma
            </h1>
            <p className="text-base sm:text-lg text-white/95 leading-relaxed font-medium">
              Are you a refugee or host-community member looking to turn your digital skills into sustainable income? Apply to join the Generation Jobs talent pool, receive professional training, and connect with global employers.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={JOB_SEEKER_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="sir-btn-primary py-3.5 px-7 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg"
              >
                <span>Apply as Job Seeker ↗</span>
              </a>
              <Link
                to="/programs"
                className="sir-btn-secondary py-3.5 px-6 text-xs sm:text-sm font-extrabold uppercase tracking-wider border-white/70 text-white hover:bg-white hover:text-slate-950"
              >
                <span>Explore Training Programs →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY JOIN US / BENEFITS */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sir-tag">
            Why Join Our Talent Pool
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            What you gain as a Generation Jobs talent
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            We provide the infrastructure, mentoring, and direct client pipelines needed to launch and sustain your remote career.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobSeekerBenefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article
                key={benefit.title}
                className="sir-card p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-brand-600 dark:border-t-brand-500"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-900/50 shadow-xs">
                      <Icon className="h-6 w-6 stroke-[1.9]" />
                    </div>
                    <span className="sir-tag text-[10px]">
                      {benefit.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 leading-snug">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {benefit.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* IN-DEMAND DIGITAL ROLES */}
      <section className="bg-brand-600 dark:bg-brand-900 text-white py-14 sm:py-20 border-y border-brand-700 dark:border-brand-800 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-md bg-white/20 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white border border-white/30 backdrop-blur-sm">
              Role Opportunities
            </span>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight !text-white">
              Roles We Actively Recruit For
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/90">
              We connect local talent with global companies across diverse remote functions.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {inDemandRoles.map((role) => (
              <article
                key={role.title}
                className="relative rounded-2xl bg-white dark:bg-slate-900/95 text-slate-900 dark:text-slate-100 p-5 sm:p-6 shadow-xl border border-white/80 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100">
                    {role.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {role.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href={JOB_SEEKER_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-brand-700 shadow-md transition hover:bg-brand-50 hover:text-brand-800"
            >
              <span>Apply for These Roles ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* HOW TO APPLY STEPS */}
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sir-tag">
            Step-by-Step Process
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            How to apply as a job seeker
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            A clear and transparent pathway from application to employment.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <article
              key={item.step}
              className="sir-card-accent p-6 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block rounded-md bg-brand-100 dark:bg-brand-900/60 px-3 py-1 text-xs font-black text-brand-700 dark:text-brand-300">
                  Step {item.step}
                </span>
                <h3 className="mt-4 font-serif text-lg font-extrabold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* FAQS SECTION */}
      <Section pattern="soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sir-tag">
            Help &amp; Clarification
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Frequently Asked Questions for Job Seekers
          </h2>
        </div>

        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto grid gap-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm open:shadow-md transition-all duration-200"
            >
              <summary className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 cursor-pointer list-none flex items-center justify-between gap-4">
                <span>{faq.question}</span>
                <ChevronDown className="h-5 w-5 text-brand-600 dark:text-brand-400 transition-transform duration-200 group-open:rotate-180 shrink-0" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {/* FINAL CTA BANNER */}
      <section className="bg-brand-600 dark:bg-brand-900 text-white py-14 sm:py-20 border-t border-brand-700 dark:border-brand-800">
        <div className="mx-auto max-w-4xl text-center px-4 space-y-5">
          <span className="inline-block rounded-md bg-white/20 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white border border-white/30 backdrop-blur-sm">
            Take the Next Step
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight !text-white">
            Ready to Start Your Professional Journey?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white/90 max-w-2xl mx-auto">
            Refugees and host-community members can apply right now. It takes just 3 minutes to submit your profile.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4 max-w-md sm:max-w-none mx-auto">
            <a
              href={JOB_SEEKER_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-brand-700 shadow-md transition hover:bg-brand-50 hover:text-brand-800 w-full sm:w-auto"
            >
              <span>Apply as Job Seeker ↗</span>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/10 px-8 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-white hover:text-brand-800 w-full sm:w-auto"
            >
              <span>Contact Generation Aid</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
