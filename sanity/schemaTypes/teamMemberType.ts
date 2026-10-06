import { defineField, defineType } from "sanity";

export const teamMemberType = defineType({
  name: "teamMember",
  title: "Team & Board Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    }),
    defineField({
      name: "role",
      title: "Role / Position",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      initialValue: "team",
      options: {
        list: [
          { title: "Executive & Core Team", value: "team" },
          { title: "Board of Directors", value: "board" },
          { title: "Strategic Advisor", value: "advisor" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "image",
      title: "Profile Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Bio (Optional)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn Profile URL",
      type: "url",
    }),
    defineField({
      name: "focus",
      title: "Areas of Focus / Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "order",
      title: "Display Order Priority",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "active",
      title: "Active Member",
      type: "boolean",
      initialValue: true,
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
