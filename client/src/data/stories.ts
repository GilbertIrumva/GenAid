export interface Story {
  slug: string;
  name: string;
  role: string;
  program: string;
  location: string;
  image: string;
  excerpt: string;
  /** Direct mp4 or video stream URL */
  videoUrl?: string;
  /** Video thumbnail / poster */
  videoPoster?: string;
  /** Paragraph blocks. Supports headings (##), quotes (>), bold (**text**), and image markdown (![alt](url)). */
  content: string[];
}

export const stories: Story[] = [
  {
    slug: "from-skills-to-earning-success-story",
    name: "Akia Abil",
    role: "Curriculum Associate at Konexio Africa",
    program: "Digital Skills for Women",
    location: "Kakuma, Kenya",
    image: "/videos/akia-poster.jpg",
    videoUrl: "/videos/akia-success-story.mp4",
    videoPoster: "/videos/akia-poster.jpg",
    excerpt:
      "Every journey begins with a single step. For the women in our Digital Skills for Women program, that first step is learning.",
    content: [
      "Every journey begins with a single step. For the women in our Digital Skills for Women program, that first step is learning.",
      "Through access to digital education and practical skills, refugee women are gaining the knowledge and confidence they need to pursue new opportunities. For some, that journey has already led to employment and income-generating opportunities, turning newly acquired skills into real possibilities for themselves and their families.",
      "But the journey does not stop at earning. Learning is still ongoing.",
      "Our learners continue to build their digital skills, gain new knowledge, and prepare themselves for even greater opportunities in the future. Their stories show us what can happen when education meets determination and opportunity.",
      "This documentary shares the experience of one of our learners and reflects the impact of the program. It is a story of learning, growth, resilience, and hope.",
      "From the classroom to the workplace, every skill learned can open another door.",
      "Watch her story and witness how digital education is helping turn skills into opportunities.",
      "> “Hello, my name is Akia Abil. I am a student at Generation Aid studying the Digital Literacy course. First of all, I'd like to thank RefugePoint for funding this program and also thank Generation Aid for supporting the training.",
      "> Through the training, I've been able to learn basic computer skills, communication, and few computer tools to enhance my digital literacy. The program has increased my confidence, given me hope, and opened new opportunities for me.",
      "> Because as for now, I am working as a Curriculum Associate in Konexio and this is because of these digital skills that I learned here at Generation Aid. So it's a big thank you once again and a big shout out to Generation Aid with RefugePoint for reaching this far.",
      "> The program is very important because it has enhanced the lives of young refugees here in Kakuma and everywhere else. So I encourage such organizations to keep on improving, to keep on supporting such programs so that this generation of ours, these youths could be lifted up from digital illiteracy.",
      "> According to me, digital literacy has sent me a lot. I didn't know how to interact in spreadsheets, and so far I have learned how to enter data in spreadsheets. My advice for the girls and youth in the community: I would like to tell them to come and join. Thank you RefugePoint and Generation Aid once again, thank you for improving our lives and thank you for giving us new opportunities.”",
      "Thanks for the tangible partnership with Konexio Africa and RefugePoint, Joseph Nyaga, UNHCR, the UN Refugee Agency.",
    ],
  },
  {
    slug: "women-in-tech-overcoming-digital-hurdles-kakuma",
    name: "100 Women in Tech: Overcoming Hurdles & Shaping Futures in Kakuma",
    role: "Digital Literacy & Remote Work Track",
    program: "Digital Skills for Women",
    location: "Kakuma, Kenya",
    image: "/digital class.jpeg",
    videoUrl:
      "https://dms.licdn.com/playlist/vid/v2/D4D05AQFnqODgmSSLuA/mp4-640p-30fp-crf28/B4DZ9wo5iSKYBs-/0/1784301235980?e=2147483647&beta&t=F8LVxGLpmtLiPtbjdblGaJX_fTnrbng4nLutRny9ee0",
    videoPoster:
      "https://media.licdn.com/dms/image/v2/D4D05AQFnqODgmSSLuA/videocover-high/B4DZ9wo5iSKYBU-/0/1784301213053?e=2147483647&beta&t=CUD_yI87rBZ1qgGSfqXdUaZCSkX6TqGCuhTc0xwBzKQ",
    excerpt:
      "Roughly 100 resilient refugee women in Kakuma are braving scorching heat, long walks, and family responsibilities to master digital literacy and remote work—turning daily obstacles into life-changing breakthroughs.",
    content: [
      "## From First Keystrokes to Digital Independence",
      "It is deeply inspiring to see our students actively engaging with lessons every single day, determined to shape their futures through digital skills. For many of the women stepping through the doors of Generation Aid's Innovation Hub in Kakuma, this course represents their very first time sitting in front of a computer.",
      "While the course is still ongoing, the progress so far has been remarkable to witness. Students who once had little to no experience with computers are now navigating new tools with growing confidence, asking sharper questions, and supporting one another through every challenge.",
      "> “Right from knowing what a computer is—from computer basics up to the professional stage of communicating with employers and doing the job—these students are eager, passionate, and determined. Today we are in topic #15, learning how to conduct virtual meetings and professional webinars on Zoom. The excitement in the room is palpable.” — Dan Matthew, Digital Literacy Instructor",
      "## A Daily Commitment Against All Odds",
      "The path to digital literacy in a remote displacement settlement is filled with hurdles. Daily classes run in two intensive shifts—a morning cohort of 50 students and an afternoon cohort of 50 students, serving approximately 100 women every day between 9:00 AM and 4:00 PM.",
      "To attend, many of these women walk long distances under the scorching sun from distant parts of the camp such as Kakuma 4, with no means of transport. Many arrive exhausted or having missed meals. Some attend class while holding and nursing their babies because they have no one at home to provide childcare, yet they refuse to let their circumstances deny them an education.",
      "At the same time, their instructor Dan Matthew shows up patiently and consistently for every student, adapting his teaching to meet each learner where she is, despite limited computers and fluctuating internet connections.",
      "## Opening Doors to the Global Remote Economy",
      "As the curriculum advances, students progress through foundational computing, Google Workspace applications, spreadsheets, and online collaboration tools.",
      "With Topic #15 on Zoom video conferencing, students learn how to host virtual meetings, present slides, and practice professional online workplace etiquette. For these learners, video conferencing is not just a lesson—it is their tangible gateway to remote employment, freelance contracts, and dignified livelihoods.",
      "> “When I ask them what their expectations are for the course, they tell me: the future of the world and economic opportunities is in technology. They want to gain these skills to work remotely, advance their careers, and uplift their families and communities.”",
      "## Progress in the Making & A Call for Partnership",
      "This documentary in the making isn't just about the finish line; it is about capturing the small breakthroughs, quiet determination, and undeniable resilience taking place every morning and afternoon in Kakuma.",
      "With more women flocking to the center each week asking to enroll even mid-course, Generation Aid is committed to expanding its capacity in upcoming cohorts so that no motivated woman is left behind.",
      "We express our deep appreciation to our partners, RefugePoint and UNHCR, the UN Refugee Agency, whose steadfast collaboration helps make this digital empowerment journey possible.",
      "> “There are women here who are looking for this opportunity. Through your generosity and partnership, you can support them, invest in their potential, and walk alongside them on this transformative, uplifting journey.”",
      "![Classroom learning in Kakuma](https://media.licdn.com/dms/image/v2/D4D05AQFnqODgmSSLuA/videocover-high/B4DZ9wo5iSKYBU-/0/1784301213053?e=2147483647&beta&t=CUD_yI87rBZ1qgGSfqXdUaZCSkX6TqGCuhTc0xwBzKQ)",
    ],
  },
  {
    slug: "unlocking-possibilities-english-class-kakuma",
    name: "Unlocking New Possibilities: 109 Students in English Training",
    role: "English Basic to Intermediate Class",
    program: "Language & Education",
    location: "Kakuma, Kenya",
    image: "/blog/english-class-109-students-cover.jpg",
    videoUrl: "https://www.youtube.com/watch?v=HoWTNc58HZg",
    videoPoster: "https://img.youtube.com/vi/HoWTNc58HZg/maxresdefault.jpg",
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
  {
    slug: "the-stories-behind-us-what-is-home",
    name: "The Stories Behind Us: What Is Home?",
    role: "Community Dialogue & Storytelling",
    program: "The Stories Behind Us",
    location: "Kakuma, Kenya",
    image: "/programs/stories.jpg",
    excerpt:
      "The Stories Behind Us: What Is Home? How do refugees in Kakuma feel about it? What does home mean to you?",
    content: [
      "The Stories Behind Us: What Is Home? How do refugees in Kakuma feel about it?",
      "What does home mean to you?",
      "Is it a place?",
      "A person?",
      "A memory?",
      "A feeling of safety and belonging?",
      "![The Stories Behind Us session in Kakuma](/programs/stories.jpg)",
      "During our “The Stories Behind Us” discussion in partnership with Shared_Studios, HOME Storytellers, and Museum for the United Nations, UN Live from Denmark, we came together to explore these questions and, most importantly, to listen to the stories that have shaped us.",
      "Everyone carries a story. Some stories begin in a place we call home. Others begin with leaving home, finding a new community, or meeting people who make us feel that we belong.",
      "![Participants in conversation and reflection](/programs/stories (2).jpg)",
      "Through conversation, laughter, memories, and shared experiences, we discovered that home can mean something different to each of us.",
      "Sometimes, home is not just where we come from. It is where we feel seen, heard, accepted, and connected.",
      "These moments remind us that when we share our stories, we create space for understanding, empathy, and connection.",
      "Your story matters. Your journey matters. And wherever you are, you deserve to feel at home.",
      "> “A powerful reminder that home is more than a place: it is a feeling of belonging, dignity, safety, and being seen. As refugees in Kakuma, many of us carry memories of the homes we left behind while building new homes through community, friendship, and shared experiences. Thank you for creating a space where refugee voices and stories are heard. Our stories matter, and when we listen to one another, we build bridges of empathy, connection, and hope.” (Hubert Senga)",
      "![Listening and sharing stories](/programs/stories.jpeg)",
      "![Group photo from The Stories Behind Us dialogue](/programs/stories (2).jpeg)",
    ],
  },
];
