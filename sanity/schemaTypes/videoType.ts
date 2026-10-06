import { defineField, defineType } from "sanity";

export const videoType = defineType({
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      initialValue: "youtube",
      options: {
        list: [
          { title: "YouTube Video ID", value: "youtube" },
          { title: "Direct URL (MP4 / Web Video)", value: "url" },
          { title: "Upload Video File", value: "upload" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youtubeId",
      title: "YouTube Video ID (e.g. R0TnjpZkQjc)",
      type: "string",
      description: "The 11-character video ID from YouTube.",
    }),
    defineField({
      name: "videoUrl",
      title: "Direct Video URL",
      type: "url",
      description: "Direct URL to MP4 or video stream.",
    }),
    defineField({
      name: "videoFile",
      title: "Video file",
      type: "file",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail / Poster Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "date",
      title: "Date / Episode Tag",
      type: "string",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "source",
      media: "thumbnail",
    },
  },
});
