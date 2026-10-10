import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "fr1v7hol",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  apiVersion: "2024-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN,
});

async function main() {
  console.log("Publishing The Guardian investigation feature post to Sanity...");

  const postDoc = {
    _id: "post-someone-else-will-do-it-for-less",
    _type: "post",
    title: "‘Someone Else Will Do It for Less’: The Guardian Features Generation Aid in Major Investigation on AI Gig Work in Kakuma",
    slug: {
      _type: "slug",
      current: "someone-else-will-do-it-for-less-the-guardian-features-generation-aid",
    },
    date: "October 8, 2026",
    author: "Hubert Senga & Generation Aid",
    excerpt:
      "The Guardian's global investigation reveals the harsh realities of refugee microwork in Kakuma camp powering AI for dwindling pay. Generation Aid founder Hubert Senga explains why routine gig labor is a race to the bottom—and how Generation Jobs is building an ethical, sustainable alternative.",
    youtubeId: "vIK-iBooRfo",
    videoTitle: "PBS & Global Media Coverage: Refugee Livelihoods in Kakuma",
    videoDescription:
      "Generation Aid founder Hubert Senga discusses how foreign aid cuts and digital market pressures are affecting refugee youth in Kakuma.",
    content: [
      "On October 8, 2026, *The Guardian* published an in-depth global investigation by journalist Claire Wilmot titled **[‘Someone else will do it for less’: refugees in Kenya are powering tech for dwindling pay](https://www.theguardian.com/technology/ng-interactive/2026/oct/08/ai-gig-work-refugees-kenya?CMP=Share_iOSApp_Other)**. The investigation turns a rare, unflinching spotlight onto Kakuma Refugee Camp, where thousands of displaced youth have turned to digital gig work and AI training tasks to survive.",
      "Generation Aid and our founder, **Hubert Senga**, are featured at the very heart of the story, alongside a photograph of our Kakuma tech workspace. The article captures both the immense resilience of refugee digital workers and the structural injustices embedded in the global technology supply chain.",
      "![Generation Aid workspace featured in The Guardian investigation](https://i.guim.co.uk/img/media/53d66ebd8b4c6838ae365637ba65b0178b71b3f3/1075_391_4346_3477/master/4346.jpg?width=1200&height=630&quality=85&auto=format&fit=crop)",
      "## The Invisible Backbone of Modern AI",
      "While Silicon Valley and European tech hubs announce trillion-dollar AI valuations and groundbreaking large language models, very few consumers know whose labor makes these systems functional.",
      "Beneath generative chatbots, computer vision systems, and automated content filters lies an immense mountain of human effort: data annotation, image segmentation, transcription, fact-checking, and content moderation. In remote settlements like Kakuma, where local formal employment is legally and geographically restricted, young people equipped with laptops have embraced this work as their sole lifeline.",
      "Yet, as *The Guardian* meticulously documents, the conditions of this labor have rapidly deteriorated. Refugee workers operate in a shadowy digital marketplace characterized by non-disclosure agreements, opaque intermediaries, and zero employment protections.",
      "## The Race to the Bottom: \"Someone Else Will Do It for Less\"",
      "The investigation takes its title from a devastating phrase familiar to almost every digital worker in Kakuma.",
      "> \"Whenever workers try to negotiate or ask why rates have dropped, the answer from platforms and global clients is immediate: someone else will do it for less.\"",
      "Because refugees in Kenya lack formal work permits, international platforms frequently classify pay as discretionary \"rewards\" or \"bounties\" rather than legal wages. This shifts 100% of the commercial and economic risk onto the displaced worker.",
      "Workers described spending hours refreshing task queues that vanish in seconds, labeling graphic and psychologically distressing content, or completing complex prompt evaluations without any guarantee they will actually be credited or paid. If a worker protests a payment discrepancy, their account can be deactivated overnight with zero recourse.",
      "## The Automation Paradox: When AI Erases Its Own Teachers",
      "One of the most alarming revelations highlighted by Hubert Senga in the report is how quickly generative AI is eliminating the very entry-level tasks that refugees were trained to perform.",
      "Only two years ago, human annotators were paid to manually write variations of questions, categorize text, and translate phrases. Today, advanced models do those basic tasks in fractions of a second. As Hubert pointed out to *The Guardian*, tasks that previously provided three or four days of billable work now take hours or are automated entirely.",
      "In a camp already reeling from unprecedented reductions in World Food Programme rations and international humanitarian budgets, the compression of digital gig work threatens to leave thousands of educated, ambitious youth with no income whatsoever.",
      "## Why Generation Aid Rejects Disposable Microwork",
      "At Generation Aid, we recognized this looming catastrophe early. We realized that training refugees simply to do micro-clicks, image bounding-boxes, and repetitive data entry was preparing them for obsolescence.",
      "This is why we launched **Generation Jobs** and built our dedicated on-site **Business Process Outsourcing (BPO) Center** in Kakuma:",
      "🔹 **Specialized, High-Value Capabilities:** Instead of disposable micro-tasks, we upskill refugee professionals in complex, retainable functions—including Amazon Growth Agency account operations, catalog health compliance, paid ads monitoring, social media management, executive virtual assistance, and human-in-the-loop AI evaluation.",
      "🔹 **Turnkey Physical Infrastructure:** High-speed fiber connectivity, dedicated modern workstations, and solar-plus-generator power backup ensure our team delivers uninterrupted, world-class work for international clients.",
      "🔹 **Ethical, Transparent Partnerships:** We partner with forward-thinking employers who seek skilled remote talent at competitive rates while committing to fair, dignified compensation and long-term retainer contracts—not precarious piece-rate gig work.",
      "## A Direct Appeal to Global Employers and Tech Leaders",
      "The crisis uncovered by *The Guardian* does not mean remote tech work in refugee camps is a mistake. It means **the extractive model of digital gig work must end**, and a model founded on agency, skill depth, and human dignity must take its place.",
      "To global founders, Amazon agency leaders, marketing executives, and tech innovators: you have an immediate opportunity to lead this change.",
      "When you hire through Generation Jobs, you gain motivated, English-proficient, vetted digital professionals who handle critical operational workflows—while advancing ESG mandates through direct, ethical impact sourcing.",
      "> \"Talent is everywhere, but fair opportunity is not. We don't need charity or exploitative gig clicks: we need real partners who value our skills, pay fair wages, and build together with us.\"",
      "### Partner With Generation Jobs Today",
      "Explore our operational packages and request services directly at [Generation Jobs for Employers](/jobs/employers) or submit an [Employer Request Form](https://forms.gle/wydDfQ8Y9GduXxi26). Read the full investigative report directly on [The Guardian](https://www.theguardian.com/technology/ng-interactive/2026/oct/08/ai-gig-work-refugees-kenya?CMP=Share_iOSApp_Other)."
    ],
    publishedAt: "2026-10-08T09:00:00.000Z",
  };

  console.log("Upserting post into Sanity...");
  await client.createOrReplace(postDoc);
  console.log("Post published to Sanity successfully!");
}

main().catch((err) => {
  console.error("Error publishing post to Sanity:", err);
  process.exit(1);
});
