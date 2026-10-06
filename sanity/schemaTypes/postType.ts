import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Article Title",
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
      name: "date",
      title: "Display Date (e.g. June 6, 2025)",
      type: "string",
    }),
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
      initialValue: "Generation Aid",
    }),
    defineField({
      name: "excerpt",
      title: "Summary Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "youtubeId",
      title: "YouTube Video ID (Optional, e.g. vIK-iBooRfo)",
      type: "string",
    }),
    defineField({
      name: "videoTitle",
      title: "Video Title (Optional)",
      type: "string",
    }),
    defineField({
      name: "videoDescription",
      title: "Video Description (Optional)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "content",
      title: "Article Paragraphs & Sections",
      description: "Supports headings (## Heading), blockquotes (> quote), bullet points, and inline images (![alt](/path)).",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At Timestamp",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "author",
      media: "coverImage",
    },
  },
});
