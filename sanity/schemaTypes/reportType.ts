import { defineField, defineType } from "sanity";

export const reportType = defineType({
  name: "report",
  title: "Report",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(2000),
    }),
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Annual report", value: "annual" },
          { title: "Impact assessment", value: "impact" },
          { title: "Financial statement", value: "financial" },
          { title: "Policy brief", value: "brief" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: "pages",
      title: "Pages",
      type: "number",
      validation: (Rule) => Rule.integer().positive(),
    }),
    defineField({
      name: "downloadUrl",
      title: "Download URL",
      type: "url",
      description: "Optional public URL to the report PDF.",
    }),
    defineField({
      name: "file",
      title: "Report file",
      type: "file",
      options: { accept: ".pdf" },
      description:
        "Optional PDF upload. Frontend can use this when no URL is provided.",
    }),
  ],
});
