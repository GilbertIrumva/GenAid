export interface Testimonial {
  key: string;
  quote: string;
  name: string;
  role: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    key: "sietske",
    quote:
      "When I first heard about Generation Aid's vision in my conversation with Hubert, I was struck by its simplicity, humanity, and power. Young refugees, eager to contribute meaningfully to the world while supporting their families—without having to depend on others. Building a grassroots organization from the ground up is incredibly challenging, especially when trying to gain the attention needed to grow. But Hubert and his team persevered, and I see them making strides every day. I feel privileged to have witnessed the birth of this organization—one that, without a doubt, will become a formidable force in the future.",
    name: "Sietske Istvan",
    role: "Founder of Story Bridge",
    image: "/img/testimonials/sietske.jpg",
  },
  {
    key: "fabien",
    quote:
      "We met Generation Aid through social networks. After an initial exchange of posts, we finally met in the field in Kakuma. We got to know each other very quickly and for the last 6 months we've been working together to develop sustainable jobs within the camp itself, thanks to digital technology in the BPO field. Their energy and resilience are both inspiring and motivating.",
    name: "Fabien de Castilla",
    role: "Director of Konexio Africa",
    image: "/img/testimonials/fabien.jpg",
  },
  {
    key: "chris",
    quote:
      "Hubert Senga and Generation Aid empower refugees with digital skills and economic opportunities. His visionary leadership has transformed lives, helping refugees integrate into the global economy and achieve self-reliance. His dedication showcases the power of community-driven initiatives in fostering resilience and hope among displaced populations.",
    name: "Chris Fryburger",
    role: "Founder at nReach / Amazon Matchmaker",
    image: "/img/testimonials/chris.jpg",
  },
  {
    key: "nyadieng",
    quote:
      "When I first joined this course, I felt both excitement and uncertainty. I was stepping into unfamiliar territory, facing a language that would open doors to countless opportunities but also present challenges along the way. Yet, with each passing day, I grew more confident.",
    name: "Nyadieng Dim Chany",
    role: "Beneficiary & English Course Graduate",
    image: "/img/testimonials/nyadieng.jpg",
  },
];
