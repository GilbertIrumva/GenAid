import { defineField, defineType } from "sanity";

export const servicePackageType = defineType({
  name: "servicePackage",
  title: "Jobs Service Package",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Package Title",
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
      name: "category",
      title: "Service Category",
      type: "string",
      options: {
        list: [
          { title: "Sales & Outbound", value: "Sales & Outbound" },
          { title: "Google & Meta Ads", value: "Google & Meta Ads" },
          { title: "Customer Support", value: "Customer Support" },
          { title: "Graphic Design", value: "Graphic Design" },
          { title: "Transcripts & Translation", value: "Transcripts & Translation" },
          { title: "Amazon Growth Agency", value: "Amazon Growth Agency" },
          { title: "Social Engagement", value: "Social Engagement" },
          { title: "Social & SEO", value: "Social & SEO" },
          { title: "Campaigns", value: "Campaigns" },
          { title: "Web Support", value: "Web Support" },
          { title: "E-Commerce", value: "E-Commerce" },
          { title: "Data & AI", value: "Data & AI" },
          { title: "Virtual Assistance", value: "Virtual Assistance" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "firstMonthPrice",
      title: "Month 1 Price ($)",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "secondMonthPrice",
      title: "Month 2 Price ($)",
      type: "number",
      initialValue: 250,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "monthlyPrice",
      title: "Ongoing Monthly Retainer ($)",
      type: "number",
      initialValue: 399,
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: "deliverables",
      title: "Key Deliverables",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "impact",
      title: "Business Impact / Value",
      type: "string",
      validation: (Rule) => Rule.required().min(5),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
      };
    },
  },
});
