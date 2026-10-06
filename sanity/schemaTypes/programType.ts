import { defineField, defineType } from "sanity";

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
