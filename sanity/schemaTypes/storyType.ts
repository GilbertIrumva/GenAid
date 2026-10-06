import { defineField, defineType } from "sanity";

export const storyType = defineType({
  name: "story",
  title: "Impact Story",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name / Title",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Organization",
      type: "string",
      description: "e.g. Curriculum Associate at Konexio Africa",
    }),
    defineField({
      name: "program",
      title: "Associated Program",
      type: "string",
      description: "e.g. Digital Skills for Women",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Kakuma, Kenya",
    }),
    defineField({
      name: "image",
      title: "Story Portrait / Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "excerpt",
      title: "Summary Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL (MP4 or YouTube)",
      type: "string",
      description: "Direct video URL (e.g. /videos/akia-success-story.mp4 or YouTube URL)",
    }),
    defineField({
      name: "videoFile",
      title: "Or Upload Video File Directly",
      type: "file",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "videoPoster",
      title: "Video Poster / Thumbnail",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "content",
      title: "Story Paragraphs / Blocks",
      description: "Enter paragraphs, blockquotes (>), bold text (**text**), or image markdown (![alt](/path)).",
      type: "array",
      of: [{ type: "text", rows: 3 }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});
