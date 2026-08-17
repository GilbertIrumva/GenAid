import { defineField, defineType } from "sanity";

export const placementRequestType = defineType({
  name: "placementRequest",
  title: "Placement Request",
  type: "document",
  fields: [
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "clientEmail",
      title: "Client Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "roleType",
      title: "Role Type",
      type: "string",
      options: {
        list: [
          "Customer Support",
          "Data Annotation",
          "Virtual Assistant",
          "Back Office",
          "Other",
        ],
      },
      initialValue: "Other",
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: "talentProfile",
      title: "Talent Profile",
      type: "reference",
      to: [{ type: "talentProfile" }],
    }),
    defineField({
      name: "talentProfileSlug",
      title: "Talent Profile Slug",
      type: "string",
    }),
    defineField({
      name: "talentProfileName",
      title: "Talent Profile Name",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["new", "in_review", "contacted", "closed"],
        layout: "radio",
      },
      initialValue: "new",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "notes",
      title: "Internal Notes",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "clientName",
      subtitle: "subject",
      status: "status",
      profile: "talentProfileName",
    },
    prepare(selection) {
      const { title, subtitle, status, profile } = selection as {
        title?: string;
        subtitle?: string;
        status?: string;
        profile?: string;
      };

      const suffix = [status, profile].filter(Boolean).join(" | ");
      return {
        title,
        subtitle: [subtitle, suffix].filter(Boolean).join(" | "),
      };
    },
  },
});
