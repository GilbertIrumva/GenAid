import { defineArrayMember, defineField, defineType } from "sanity";

const programGoal = {
  name: "programGoal",
  title: "Program Goal",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Goal Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Goal Description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
  ],
};

const programComponent = {
  name: "programComponent",
  title: "Program Component",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Component Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Component Description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Reference URL / Article Link (Optional)",
      type: "url",
    }),
  ],
};

const programQuote = {
  name: "programQuote",
  title: "Program Quote",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Quote Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Author Role",
      type: "string",
    }),
  ],
};

const programMediaVideo = {
  name: "programMediaVideo",
  title: "Media Video",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Video Title",
      type: "string",
    }),
    defineField({
      name: "outlet",
      title: "Media Outlet / Channel",
      type: "string",
    }),
    defineField({
      name: "youtubeId",
      title: "YouTube Video ID (e.g. vIK-iBooRfo)",
      type: "string",
    }),
    defineField({
      name: "url",
      title: "Video URL",
      type: "url",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
  ],
};

const specialHighlight = {
  name: "specialHighlight",
  title: "Special Highlight",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Highlight Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Highlight Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "url",
      title: "Reference / Article Link (Optional)",
      type: "url",
    }),
  ],
};

export const programType = defineType({
  name: "program",
  title: "Program",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Program Title",
      type: "string",
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category / Track",
      type: "string",
      description: "e.g. Emerging Tech & AI, Language & Career Readiness",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "speaker",
      title: "Lead Speaker / Instructor (Optional)",
      type: "string",
    }),
    defineField({
      name: "partner",
      title: "Partner Organization (Optional)",
      type: "string",
    }),
    defineField({
      name: "excerpt",
      title: "Short Excerpt",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "body",
      title: "Overview Body",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Main Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      description: "Custom hero background image for this program (falls back to Main Cover Image)",
    }),
    defineField({
      name: "whyItMattersImage",
      title: "Why This Initiative Matters Image",
      type: "image",
      options: { hotspot: true },
      description: "Dedicated image for the 'Why this initiative matters' section (falls back to gallery[1])",
    }),
    defineField({
      name: "componentsImage",
      title: "Core Modules & Components Image",
      type: "image",
      options: { hotspot: true },
      description: "Dedicated image for the 'Core Modules & Components' section (falls back to gallery[2])",
    }),
    defineField({
      name: "gainsImage",
      title: "What You Will Gain Section Image",
      type: "image",
      options: { hotspot: true },
      description: "Dedicated image for the 'What You Will Gain / Key Skills' section (e.g. for Women’s Digital Skills)",
    }),
    defineField({
      name: "gallery",
      title: "Photo Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "features",
      title: "Key Features / Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "problemStatement",
      title: "The Challenge / Problem Statement",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "targetAudience",
      title: "Who Is This Program For?",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "whyItMatters",
      title: "Why This Matters",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "goals",
      title: "Program Goals",
      type: "array",
      of: [programGoal],
    }),
    defineField({
      name: "components",
      title: "Curriculum Components / Syllabus",
      type: "array",
      of: [programComponent],
    }),
    defineField({
      name: "gainsTitle",
      title: "Gains / Connect Section Title",
      type: "string",
      description: "Custom heading for this section (e.g. 'Want to Connect with Hubert?' or default 'Key Skills & Opportunities')",
    }),
    defineField({
      name: "connectLinks",
      title: "Connect & Social Media Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "connectLink",
          title: "Connect Link",
          fields: [
            defineField({
              name: "label",
              title: "Label / Title (e.g. LinkedIn, Email Me, Read My Articles)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL / Destination (e.g. profile link or mailto:)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Icon Type (linkedin, facebook, instagram, email, article, or custom)",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "url",
            },
          },
        }),
      ],
      description: "Direct social profile and contact links (e.g. LinkedIn, Facebook, Instagram, Email Me, Articles)",
    }),
    defineField({
      name: "gains",
      title: "What Participants Gain",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "howToJoin",
      title: "How to Join / Application Steps",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "specialHighlight",
      title: "Special Feature / Gallery Highlight",
      type: "object",
      fields: specialHighlight.fields,
    }),
    defineField({
      name: "vision",
      title: "Program Vision",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "quote",
      title: "Featured Quote",
      type: "object",
      fields: programQuote.fields,
    }),
    defineField({
      name: "bookingUrl",
      title: "Booking / Inquiry URL",
      type: "string",
    }),
    defineField({
      name: "ctaText",
      title: "Call to Action Button Label",
      type: "string",
    }),
    defineField({
      name: "ctaLink",
      title: "Call to Action Link",
      type: "string",
    }),
    defineField({
      name: "mediaVideos",
      title: "Featured Media & Broadcast Interviews",
      type: "array",
      of: [programMediaVideo],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
  },
});
