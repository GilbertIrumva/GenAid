import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "logo",
      title: "Main Site Logo",
      type: "image",
      options: { hotspot: true },
      description: "Main site logo image displayed in header and footer",
    }),
    defineField({
      name: "donateUrl",
      title: "Donate Campaign URL",
      type: "url",
    }),
    defineField({
      name: "phoneKenya",
      title: "Phone (Kenya)",
      type: "string",
    }),
    defineField({
      name: "phoneInternational",
      title: "Phone (International)",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Official Contact Email",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Physical Location / Address",
      type: "string",
    }),
    defineField({
      name: "socials",
      title: "Social Media Channels",
      type: "object",
      fields: [
        defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
        defineField({ name: "twitter", title: "Twitter / X URL", type: "url" }),
        defineField({ name: "youtube", title: "YouTube URL", type: "url" }),
      ],
    }),
  ],
});
