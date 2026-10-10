export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  cover?: string;
  youtubeId?: string;
  videoTitle?: string;
  videoDescription?: string;
  /** Paragraph blocks. Supports headings (##, ###), blockquotes (>), bullets (🔹), and bold (**text**). */
  content: string[];
}

export const posts: BlogPost[] = [
  {
    slug: "someone-else-will-do-it-for-less-the-guardian-features-generation-aid",
    title: "‘Someone Else Will Do It for Less’: The Guardian Features Generation Aid in Major Investigation on AI Gig Work in Kakuma",
    date: "October 8, 2026",
    author: "Hubert Senga & Generation Aid",
    cover: "/blog/guardian-kakuma-workspace.jpg",
    youtubeId: "vIK-iBooRfo",
    videoTitle: "PBS & Global Media Coverage: Refugee Livelihoods in Kakuma",
    videoDescription:
      "Generation Aid founder Hubert Senga discusses how foreign aid cuts and digital market pressures are affecting refugee youth in Kakuma.",
    excerpt:
      "The Guardian's global investigation reveals the harsh realities of refugee microwork in Kakuma camp powering AI for dwindling pay. Generation Aid founder Hubert Senga explains why routine gig labor is a race to the bottom—and how Generation Jobs is building an ethical, sustainable alternative.",
    content: [
      "On October 8, 2026, *The Guardian* published an in-depth global investigation by journalist Claire Wilmot titled **[‘Someone else will do it for less’: refugees in Kenya are powering tech for dwindling pay](https://www.theguardian.com/technology/ng-interactive/2026/oct/08/ai-gig-work-refugees-kenya?CMP=Share_iOSApp_Other)**. The investigation turns a rare, unflinching spotlight onto Kakuma Refugee Camp, where thousands of displaced youth have turned to digital gig work and AI training tasks to survive.",
      "Generation Aid and our founder, **Hubert Senga**, are featured at the very heart of the story, alongside a photograph of our Kakuma tech workspace. The article captures both the immense resilience of refugee digital workers and the structural injustices embedded in the global technology supply chain.",
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
  },
  {
    slug: "how-foreign-aid-cuts-threaten-refugee-led-initiatives-a-call-for-sustainable-solutions",
    title: "How Foreign Aid Cuts Threaten Refugee Led Initiatives: A Call for Sustainable Solutions",
    date: "March 05, 2025",
    author: "Hubert Senga",
    cover: "/pbs-hubert.png",
    youtubeId: "vIK-iBooRfo",
    videoTitle: "PBS News Interview with Hubert Senga",
    videoDescription: "How foreign aid cuts affect programs and livelihoods in Kenya's Kakuma refugee camp.",
    excerpt:
      "For over three decades, Kakuma Refugee Camp in Kenya has sheltered nearly 290,000 people escaping war and persecution. Today, unprecedented foreign aid budget cuts threaten emergency food rations, tech education, and refugee led entrepreneurship. Generation Aid founder Hubert Senga calls for an urgent shift toward sustainable, dignified solutions.",
    content: [
      "## The Forgotten Crisis: Kakuma on the Edge",
      "For over three decades, Kakuma Refugee Camp in Turkana County, northwestern Kenya, has stood as a beacon of hope for those fleeing unimaginable horrors. Established in 1992 following the arrival of the \"Lost Boys of Sudan\" escaping civil war, it has since grown into a sanctuary for nearly 290,000 displaced people escaping conflict, ethnic violence, and persecution from South Sudan, Somalia, the Democratic Republic of Congo, Burundi, Ethiopia, Sudan, and Uganda.",
      "Yet today, Kakuma faces a forgotten crisis of unprecedented magnitude. Precipitous reductions in foreign aid budgets and shifting international donor priorities are pushing the camp and its residents to a dangerous tipping point.",
      "Monthly food rations provided by humanitarian agencies, already meager, have been drastically cut. Families are being forced into agonizing survival choices, skipping meals, and determining which children eat each day. In an in depth broadcast interview with PBS News, Generation Aid founder Hubert Senga brought global visibility to this escalating emergency, warning that declining humanitarian assistance is pushing vulnerable displaced populations to the absolute brink.",

      "## The Ripple Effect of Foreign Aid Cuts",
      "Foreign aid reductions do not just affect agency balance sheets: they threaten the futures of thousands of refugees who are actively striving to build self reliant lives. The fallout cascades across every level of the community.",
      "Education and digital literacy are now at grave risk. Programs that teach young refugees foundational digital skills, coding, and remote work opportunities may no longer be sustainable. In a remote desert settlement where local employment is virtually nonexistent, digital technology is the only viable pathway to employment and self-sufficiency.",
      "Loss of entrepreneurship support also looms large. Many refugee led initiatives rely on small grants and catalytic funding to empower refugees to start micro businesses, tailoring workshops, artisan cooperatives, and tech kiosks. Without sustained financial support, grassroots job creation in the camp will stagnate.",
      "Crucially, cuts heighten dependency on emergency relief. The fundamental mission of programs like Generation Aid is to reduce reliance on aid by creating sustainable opportunities. Cutting funding for education and entrepreneurship forces refugees backward, leaving them dependent on dwindling humanitarian resources.",

      "## Refugees Need More Than Aid: We Need Opportunities",
      "The global conversation around refugees has been fundamentally broken for over thirty years: it consistently focuses on short-term relief rather than long-term solutions.",
      "> \"Refugees are not just passive recipients of aid: we are innovators, entrepreneurs, and changemakers. Given the right tools, we can contribute to the economy, uplift our communities, and become self-reliant.\"",
      "Refugees do not want to subsist on handouts or stand in aid distribution queues for generations. We are software developers, designers, educators, writers, and community leaders. Talent is equally distributed across the world, even if access to opportunity is not.",
      "Instead of merely providing dwindling food rations and temporary emergency relief, investing in refugee led solutions like Generation Aid ensures that displaced communities can build sustainable, dignified futures.",

      "## Why Refugee Led Organizations (RLOs) Are the Key",
      "Enduring change in displacement settings cannot be dictated from distant boardrooms. Top-down humanitarian models frequently struggle with immense administrative overhead and a lack of on-the-ground context.",
      "In contrast, Refugee Led Organizations (RLOs) live and breathe the community's realities every single day. Operating directly inside Kakuma and Kalobeyei, RLOs possess deep contextual understanding, authentic community trust, agile execution, and unmatched capital efficiency.",
      "Through Generation Aid's flagship initiatives, including Computer Literacy Bootcamps, Women in AI, Tailoring & Craftsmanship, and Generation Jobs, we are actively demonstrating that when displaced youth are connected to global markets, they become economic contributors who transform their households and the wider community.",

      "## How You Can Help: A Call for Collective Action",
      "The fight for sustainable refugee solutions requires collective action from governments, global agencies, tech companies, philanthropic donors, and individuals worldwide.",
      "You can raise awareness by sharing our story and the challenges we face, helping more people understand why refugee empowerment and digital inclusion matter.",
      "We warmly welcome partnerships with NGOs, businesses, and institutions willing to support refugee education, sponsor digital training cohorts, and hire skilled refugee graduates for remote work.",
      "Advocating for policy change is equally critical: governments and international agencies must prioritize long-term investment in refugee-led solutions, recognizing refugees as economic contributors.",
      "Whether through funding, mentorship, providing laptops and digital resources, or joining our volunteer network, your support helps us continue empowering refugees to achieve lasting self-reliance.",
    ],
  },
  {
    slug: "generation-aid-hub-jobs-launches-in-kakuma",
    title: "Generation Jobs Launches in Kakuma",
    date: "June 6, 2025",
    author: "Hubert",
    cover: "/blog2/cover.jpg",
    youtubeId: "AKa99PyFqUg",
    videoTitle: "Official Launch of Generation Jobs in Kakuma",
    videoDescription:
      "Watch the official launch ceremony of Generation Jobs, highlighting the digital hub, BPO center, and pathways to sustainable employment.",
    excerpt:
      "Generation Aid Hub Jobs launches in Kakuma: a digital jobs hub empowering refugees with remote work, tech careers, and income opportunities.",
    content: [
      "A new era of refugee digital jobs in Kakuma has begun. At Generation Aid, we are proud to announce the official launch of Generation Jobs, a transformative employment initiative designed to provide skilled refugees and host community members with real income-generating opportunities in the digital space.",

      "## What Is Generation Aid Hub Jobs?",
      "Generation Jobs is more than a project: it is a movement for sustainable refugee employment. At the heart of this initiative is our newly constructed Digital Hub & Co-Working Space, situated inside the Generation Aid compound in Kakuma. This space now powers our very first Business Process Outsourcing (BPO) Service Center, built in partnership with Konexio Africa.",
      "The hub provides a stable, professional workspace equipped with high-speed internet and uninterrupted power, connecting refugee talent directly with remote and global clients while unlocking real, sustained income-generating opportunities.",

      "## Remote Job Roles for Refugees in Kakuma",
      "Our BPO center enables trained refugee professionals to work in-demand remote roles, including Prospecting & Lead Generation, Social Media Management, Digital Administration, E-commerce Support, and Virtual Assistance.",

      "## Empowering Through Art: Introducing the Senga Gallery",
      "In a beautiful collaboration with international artist Tara Dominik, the Senga Gallery was launched to give refugee artists a global platform. The gallery, supported by partners in the UK, allows artists to showcase their talent, share personal stories, and earn income through their creative expression.",

      "## Thank You to Our Partners",
      "We are sincerely thankful to everyone who made the launch of Generation Jobs possible. Our heartfelt thanks go to Konexio Africa, Jesuit Refugee Service, Peace Winds Japan, Kenya Mission, Action Refugee for Life (AReL), Farming & Health Education, and all other refugee-led organizations, community groups, and supporters who joined us for this launch.",

      "## Hire Skilled Refugees in Kakuma",
      "Whether you are a tech startup, NGO, e-commerce company, or global enterprise, you can now hire skilled, trained refugee professionals from Kakuma through Generation Jobs.",
      "By partnering with Generation Jobs, you gain access to a diverse, talented workforce and reliable BPO services at competitive rates, offering a direct opportunity to support meaningful social impact through employment.",

      "## Partner With Us Today",
      "Join us in transforming potential into opportunity. To discuss hiring, outsourcing, or partnership, contact Generation Aid.",
    ],
  },
  {
    slug: "what-can-football-tell-us-about-who-we-are",
    title: "What Can Football Tell Us About Who We Are?",
    date: "September 1, 2026",
    author: "Generation Aid",
    cover: "/blog3/image-1.jpg",
    excerpt:
      "Football is more than just a game. It can tell stories about identity, belonging, teamwork, dreams, challenges, and community.",
    content: [
      "Football is more than just a game. It can tell stories about identity, belonging, teamwork, dreams, challenges, and community.",
      "During this session, we came together to reflect on the question: “What can football tell us about who we are?”",
      "Through shared experiences and meaningful conversations, we explored how the game can bring people together, create connections, and reflect the different stories and identities we carry.",
      "Because sometimes, the stories we tell through football can help us better understand ourselves and each other.",
      "![Football session in Kakuma](/blog3/image-2.jpg)",
      "![Reflecting on identity and teamwork](/blog3/image-3.jpg)",
      "![Youth connection through sports](/blog3/image-4.jpg)",
      "![Shared experiences and community](/blog3/image-5.jpg)",
      "![Team photo after the football session](/blog3/image-6.jpg)",
    ],
  },
  {
    slug: "unhcr-and-australian-aid-delegation-visit-generation-aid",
    title: "Welcoming UNHCR and Australian Aid Delegation: Showcasing Refugee-Led Innovation in Kakuma",
    date: "June 11, 2026",
    author: "Generation Aid",
    cover: "/blog/unhcr-visit-cover.jpg",
    excerpt:
      "Generation Aid was honored to welcome a high-level delegation from UNHCR and Australian Aid, showcasing the transformative impact of refugee-led digital livelihoods, entrepreneurship, and youth skills development in Kakuma.",
    content: [
      "Today, we were honored to welcome a distinguished delegation from **UNHCR, the UN Refugee Agency**, and high-level representatives from **Australian Aid** to the Generation Aid innovation hub in Kakuma.",
      "![UNHCR and Australian Aid delegation visiting Generation Aid](https://media.licdn.com/dms/image/v2/D4D22AQFPA3b-DQ85Zg/feedshare-shrink_800/B4DZ64fL3wIIAc-/0/1781211643635?e=2147483647&v=beta&t=7o4u3CpmP6XOJvDbvRvuB8wOAVCaIrZa1CmGnfTxcPk)",
      "## Showcasing the Power of Refugee-Led Solutions",
      "The visit provided an inspiring opportunity to showcase the power of refugee-led solutions that are transforming lives through digital livelihoods, entrepreneurship, and skills development. Operating on the ground within Kakuma, Generation Aid bridges the gap between untapped local potential and global digital economies.",
      "Our guests engaged directly with young refugees and host community members who are harnessing digital skills, online work opportunities, and technological innovation to create sustainable sources of income and build brighter futures for themselves and their families.",
      "![Delegation engaging with young refugees in the digital workspace](https://media.licdn.com/dms/image/v2/D4D22AQHxNtMLJ2sqZA/feedshare-shrink_800/B4DZ64fL3AKwAg-/0/1781211643595?e=2147483647&v=beta&t=HdQIF5bd3NQfY0XeUnmNNZoFk064NhQZeAysW39S050)",
      "## Unlocking Dignified Digital Livelihoods",
      "Through our flagship programs, including computer literacy bootcamps, Women in AI, and the newly launched Generation Jobs initiative, we demonstrated how youth in Kakuma are moving from aid dependency to economic independence.",
      "Delegates observed students working on real-world projects, discovering how refugees are providing valuable services such as remote administrative support, lead generation, digital marketing, and software development for international clients.",
      "![Young changemakers demonstrating digital skills and tech projects](https://media.licdn.com/dms/image/v2/D4D22AQGCZf1sSk8zDw/feedshare-shrink_800/B4DZ64fL4RJcAc-/0/1781211643663?e=2147483647&v=beta&t=HUp14zDcqFiatDhEQZyyTjm44iPf6GJ4Lt8EKyh4_2s)",
      "## A Simple Truth: Youth as Drivers of Change",
      "> \"When young people are equipped with the right skills and opportunities, they become drivers of innovation, resilience, and positive change within their communities.\"",
      "This visit reaffirmed a simple truth: displacement does not limit ambition or intellect. When displaced youth are met with trust, infrastructure, and targeted training, they transform from aid recipients into creators, problem solvers, and community leaders.",
      "![UNHCR and Australian Aid representatives with the Generation Aid team](https://media.licdn.com/dms/image/v2/D4D22AQEuXogeUeYCgg/feedshare-shrink_800/B4DZ64fL5qK0Ac-/0/1781211643765?e=2147483647&v=beta&t=KxmWsThzSdv1_nbmA64LVpfKGD-zpo-yoU9MQSSWO90)",
      "## Gratitude for Continued Partnership",
      "We are deeply grateful to UNHCR and Australian Aid for their continued support, dialogue, and partnership that help turn potential into impact and challenges into opportunities.",
      "We invite organizations, donors, and companies worldwide to join hands with Generation Aid, whether through program partnerships, remote hiring, or equipment sponsorship, as we scale sustainable solutions across displaced communities.",
      "![Generation Aid team and community members](https://media.licdn.com/dms/image/v2/D4D22AQGu5gF_lsQ0Zg/feedshare-shrink_800/B4DZ64fL1oKUAc-/0/1781211643538?e=2147483647&v=beta&t=CraetXy3lBKMAsvhISvI2dj8nSfAHmauJxILaQkQ0Bk)",
    ],
  },
  {
    slug: "welcoming-remote-team-to-kakuma-kalobeyei-facility",
    title: "Welcoming Our Remote Volunteer Team to Kakuma: From Virtual English Training to Onsite Impact",
    date: "June 23, 2026",
    author: "Generation Aid",
    cover: "/blog/remote-volunteers-kalobeyei-cover.jpg",
    excerpt:
      "A meaningful milestone for Generation Aid: welcoming our global remote volunteer team (Dimple Agarwal, Jasmine, Shiv Ganesh, and Paul) to Kakuma as we open our new Kalobeyei facility and transition from remote learning to onsite training.",
    content: [
      "Today, we are delighted to celebrate a profound milestone for Generation Aid: welcoming members of our international remote volunteer team (**Dimple Agarwal**, **Jasmine**, **Shiv Ganesh**, and **Paul**) in person to Kakuma Refugee Camp!",
      "![Remote volunteers arriving and meeting with the Generation Aid team in Kakuma](https://media.licdn.com/dms/image/v2/D4D22AQGW-uUIiG5H7A/feedshare-shrink_800/B4DZ712OT6K8Ac-/0/1782241093110?e=2147483647&v=beta&t=F4RUQ7WkRJGW91xsD0cXXoO-uSBjHVyiTI9lWkYchOw)",
      "## A Journey That Began with a Simple Idea",
      "Exactly one year ago, we launched the **English Language Training Program** at Generation Aid. What started as a modest virtual initiative, connecting passionate remote volunteers with determined young refugees over video calls, has blossomed into a transformative movement expanding educational and economic opportunities across the camp.",
      "Language proficiency is the ultimate catalyst for digital livelihoods. For our students, mastering professional English opens direct pathways to global freelance marketplaces, international remote employment, remote internships, and higher education.",
      "![Classroom interaction with volunteers and students](https://media.licdn.com/dms/image/v2/D4D22AQGw8tBLfAZaiA/feedshare-shrink_800/B4DZ712OPpI4Ac-/0/1782241092856?e=2147483647&v=beta&t=cOnXdKZQ3XlNLu0q6sMQImnCyGzcaYKAnVvSR3OUTvU)",
      "## Opening Our New Facility in Kalobeyei",
      "With the official opening of our new facility in Kalobeyei, Generation Aid is entering an exciting new chapter: transitioning from purely remote learning to dynamic, in-person, onsite training.",
      "This dedicated physical space enables hands-on workshops, real-time peer learning, consistent high-speed connectivity, and deep community mentorship—significantly deepening our reach and long-term impact across Kakuma and Kalobeyei.",
      "![Community members and learners gathering at the new Kalobeyei center](https://media.licdn.com/dms/image/v2/D4D22AQHLFcRnYBRAug/feedshare-shrink_800/B4DZ712OWsI8Ag-/0/1782241093436?e=2147483647&v=beta&t=j6IelYC3XV2uuw3aNgU03_8H5Rb1BmDbuRLiz3p0T4g)",
      "## The Power of Human Connection Beyond Borders",
      "> \"When people cross oceans and borders to share their knowledge and stand in solidarity with displaced youth, it sends an unforgettable message: you are seen, your potential is real, and the future is yours to build.\"",
      "Meeting their teachers in person was an emotional and electrifying experience for our students. It bridged continents, turned virtual relationships into lifelong community bonds, and reaffirmed our collective commitment to self-reliance.",
      "![Volunteers and students collaborating during workshops](https://media.licdn.com/dms/image/v2/D4D22AQH6tRga5isIcA/feedshare-shrink_800/B4DZ712OTKKQAc-/0/1782241093283?e=2147483647&v=beta&t=bs_0uRckZw0dB5JMFjaKrRcnjEOGW_e0pD1sgZUrYVY)",
      "## This Is Just the Beginning",
      "To Dimple, Jasmine, Shiv, and Paul: welcome to Kakuma! Your dedication, empathy, and belief in our students inspire our entire community.",
      "As we scale our programs in Kalobeyei and Kakuma, we invite more educators, tech mentors, and remote professionals to join us as volunteers and partners. Together, we are turning education into empowerment.",
      "![Generation Aid team, volunteers, and students together in Kakuma](https://media.licdn.com/dms/image/v2/D4D22AQEBpcQRmv17hg/feedshare-shrink_800/B4DZ712ORMHEAg-/0/1782241092933?e=2147483647&v=beta&t=3ZTglvTioBJZz_x119-ePmRW5L_ofksrqbNWeR80hNI)",
      "![Group photo celebrating the Kalobeyei milestone](https://media.licdn.com/dms/image/v2/D4D22AQH_jt4anBzEkQ/feedshare-shrink_800/B4DZ712OLlKQAc-/0/1782241092704?e=2147483647&v=beta&t=xcPJagbxtRTvBsS5LGNHCKfEzjZqOaP-53I7X5Rjo9c)",
    ],
  },
  {
    slug: "unlocking-possibilities-english-class-kakuma",
    title: "Unlocking New Possibilities: 109 Students in English Training",
    date: "February 15, 2026",
    author: "Generation Aid",
    cover: "/blog/english-class-109-students-cover.jpg",
    youtubeId: "HoWTNc58HZg",
    videoTitle: "English Language & Literacy Success Story: Unlocking Possibilities",
    videoDescription:
      "Watch refugee students in Kakuma share how practical English communication and literacy opened doors to scholarships, jobs, and renewed hope.",
    excerpt:
      "Language is the key to unlocking new possibilities, and it’s incredible to witness the progress of our 109 students in our English Basic to Intermediate class today!",
    content: [
      "Language is the key to unlocking new possibilities, and it’s incredible to witness the progress of our 109 students in our English Basic to Intermediate class today!",
      "It is inspiring to see our students actively engaging with lessons, challenging themselves, and building the communication skills that open doors to new opportunities.",
      "## English Language & Literacy Success Story: Unlocking Possibilities",
      "> “Watch refugee students in Kakuma share how practical English communication and literacy opened doors to scholarships, jobs, and renewed hope.”",
      "A huge shoutout to our dedicated instructor and our students for their hard work and commitment to growth! We also want to extend our deepest gratitude to our individual donors. Your generous support provides the resources and foundation that make these classrooms possible. Thank you for believing in our mission and investing in our students' futures.",
      "Special thanks to our donors and supporters: Lee Simms, Melodie Cochet, Aisling Kennedy.",
      "![Students engaging actively during English class](https://media.licdn.com/dms/image/v2/D4D22AQESpbkVHdrWrQ/feedshare-shrink_800/B4DZ9b1poBK8Ac-/0/1783952220038?e=2147483647&v=beta&t=bezDMR7h9YrzrEDGF-zQe4dvEPw0mvd7FfbubksLFiM)",
      "![Classroom learning in Kakuma](https://media.licdn.com/dms/image/v2/D4D22AQF_ONQ5a-nCYQ/feedshare-shrink_800/B4DZ9b1ps0H0Ac-/0/1783952220205?e=2147483647&v=beta&t=zb5X9-xjVzO8mFXyRAmyYyKEUDClE-qDb89lnU9x4TY)",
      "![Students building communication skills](https://media.licdn.com/dms/image/v2/D4D22AQHdzKyFcmlkIg/feedshare-shrink_800/B4DZ9b1ppUKYAc-/0/1783952219747?e=2147483647&v=beta&t=qz4j3uy4ampKrEPXpQcOoKlZUSRVW1-E2ptPFMm52ns)",
      "![Interactive English language instruction](https://media.licdn.com/dms/image/v2/D4D22AQGj2jc8vs7B2Q/feedshare-shrink_800/B4DZ9b1pnjI8Ac-/0/1783952219462?e=2147483647&v=beta&t=C2aiXMWOjrYwkjqwdelip4-ULNH9UV4nlfjos5I-2qc)",
      "![Learners taking notes and participating](https://media.licdn.com/dms/image/v2/D4D22AQF48Gejuz7lpQ/feedshare-shrink_800/B4DZ9b1pywJcAc-/0/1783952220265?e=2147483647&v=beta&t=Hbvt5lzstFnNWk-M5ZA5MFegQuTzUQ6Sx6uJdhAkvJ8)",
      "![Dedicated instructor and learners](https://media.licdn.com/dms/image/v2/D4D22AQHPs718DeFFhA/feedshare-shrink_800/B4DZ9b1pq6HQAc-/0/1783952219772?e=2147483647&v=beta&t=zEUi2_UlX6-FQTYce1eyeP7jmK8lD32QvdXwfcDDVSw)",
      "![Full classroom of 109 students progressing together](https://media.licdn.com/dms/image/v2/D4D22AQE_Ou_3OTh4TQ/feedshare-shrink_800/B4DZ9b1psuHQAc-/0/1783952220159?e=2147483647&v=beta&t=9lZ-A1ZGFqClU9M58WZZYCusjOE-ztkQml1kIkKJ5jM)",
    ],
  },
];



