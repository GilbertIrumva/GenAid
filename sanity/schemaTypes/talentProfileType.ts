import { defineField, defineType } from "sanity";

export const talentProfileType = defineType({
  name: "talentProfile",
  title: "Talent Profile",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
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
      name: "title",
      title: "Professional Title",
      type: "string",
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "languages",
      title: "Languages",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "expertise",
      title: "Core Expertise",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(20),
    }),
    defineField({
      name: "readiness",
      title: "Readiness",
      type: "string",
      options: {
        list: ["Ready for Placement", "Interviewing"],
        layout: "radio",
      },
      initialValue: "Ready for Placement",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "image",
      readiness: "readiness",
    },
    prepare(selection) {
      const { title, subtitle, media, readiness } = selection as {
        title?: string;
        subtitle?: string;
        media?: any;
        readiness?: string;
      };

      return {
        title,
        subtitle: [subtitle, readiness].filter(Boolean).join(" | "),
        media,
      };
    },
  },
});
