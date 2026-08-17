import { defineField, defineType } from "sanity";

const logoItem = {
  name: "logoItem",
  title: "Logo item",
  type: "object",
  fields: [
    defineField({
      name: "organizationName",
      title: "Organization name",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "websiteUrl",
      title: "Website URL",
      type: "url",
    }),
  ],
};

const testimonialItem = {
  name: "testimonialItem",
  title: "Testimonial item",
  type: "object",
  fields: [
    defineField({
      name: "employerName",
      title: "Employer name",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "employerRole",
      title: "Employer role",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(20),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
};

const metricItem = {
  name: "metricItem",
  title: "Metric item",
  type: "object",
  fields: [
    defineField({
      name: "metricLabel",
      title: "Metric label",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "metricValue",
      title: "Metric value",
      type: "string",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "metricContext",
      title: "Metric context",
      type: "string",
    }),
  ],
};

const caseStudyItem = {
  name: "caseStudyItem",
  title: "Case study item",
  type: "object",
  fields: [
    defineField({
      name: "employerName",
      title: "Employer name",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "challenge",
      title: "Challenge",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: "outcome",
      title: "Outcome",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
};

const vettingStepItem = {
  name: "vettingStepItem",
  title: "Vetting step item",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Step title",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "detail",
      title: "Detail",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(10),
    }),
  ],
};

export const homepageTrustContentType = defineType({
  name: "homepageTrustContent",
  title: "Homepage Trust Content",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Homepage Trust Content",
      readOnly: true,
    }),
    defineField({
      name: "testimonials",
      title: "Employer testimonials",
      type: "array",
      of: [testimonialItem],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "logos",
      title: "Partner or employer logos",
      type: "array",
      of: [logoItem],
    }),
    defineField({
      name: "successMetrics",
      title: "Placement success metrics",
      type: "array",
      of: [metricItem],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "vettingSummaryTitle",
      title: "Candidate vetting summary title",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "vettingSummaryBody",
      title: "Candidate vetting summary body",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(20),
    }),
    defineField({
      name: "vettingSteps",
      title: "Candidate vetting steps",
      type: "array",
      of: [vettingStepItem],
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "caseStudies",
      title: "Employer case studies",
      type: "array",
      of: [caseStudyItem],
    }),
    defineField({
      name: "responseTime",
      title: "Inquiry response time",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "nextStepsSummary",
      title: "Inquiry next steps summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: "contactMethod",
      title: "Preferred contact method",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "responseTime",
    },
    prepare(selection) {
      const { title, subtitle } = selection as {
        title?: string;
        subtitle?: string;
      };

      return {
        title: title || "Homepage Trust Content",
        subtitle: subtitle
          ? `Response time: ${subtitle}`
          : "Trust blocks for the homepage",
      };
    },
  },
});
