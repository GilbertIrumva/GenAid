import { defineField, defineType } from "sanity";

// --- SUB-TYPES FOR ARRAYS ---
const cardItem = {
  name: "cardItem",
  title: "Card Item",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body / Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Card Image (Optional)",
      type: "image",
      options: { hotspot: true },
    }),
  ],
};

const stepItem = {
  name: "stepItem",
  title: "Step Item",
  type: "object",
  fields: [
    defineField({
      name: "stepNumber",
      title: "Step Number (e.g. 01)",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Step Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Step Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
};

const metricItem = {
  name: "metricItem",
  title: "Metric Item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "value",
      title: "Value (e.g. 5,000+)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
};

export const jobsContentType = defineType({
  name: "jobsContent",
  title: "Generation Jobs CMS Content & Imagery",
  type: "document",
  fieldsets: [
    { name: "overview", title: "1. Jobs Overview Page (/jobs)", options: { collapsible: true, collapsed: false } },
    { name: "talentModel", title: "2. Talent Model Page (/jobs/talent)", options: { collapsible: true, collapsed: true } },
    { name: "employers", title: "3. For Employers Page (/jobs/employers)", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Generation Jobs CMS Content & Imagery",
      readOnly: true,
    }),

    // ==========================================
    // 1. OVERVIEW PAGE (/jobs)
    // ==========================================
    defineField({
      name: "overviewHeroTitle",
      title: "Hero Title",
      type: "string",
      fieldset: "overview",
    }),
    defineField({
      name: "overviewHeroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
      fieldset: "overview",
    }),
    defineField({
      name: "jobsLogo",
      title: "Generation Jobs Custom Brand Logo",
      description: "Upload a custom logo mark or full logo for Generation Jobs.",
      type: "image",
      options: { hotspot: true },
      fieldset: "overview",
    }),
    defineField({
      name: "overviewHeroImage",
      title: "Hero Workstation Image",
      description: "Photo of a skilled remote worker in Kakuma at a clean workstation.",
      type: "image",
      options: { hotspot: true },
      fieldset: "overview",
    }),

    defineField({
      name: "marketNeedTitle",
      title: "Market Need Section Title",
      type: "string",
      fieldset: "overview",
    }),
    defineField({
      name: "marketProblems",
      title: "Market Problem Cards",
      type: "array",
      of: [cardItem],
      fieldset: "overview",
    }),

    defineField({
      name: "pipelineTitle",
      title: "Pipeline Section Title",
      type: "string",
      fieldset: "overview",
    }),
    defineField({
      name: "pipelineSteps",
      title: "Training-to-Placement Pipeline Steps",
      type: "array",
      of: [stepItem],
      fieldset: "overview",
    }),
    defineField({
      name: "pipelineImage",
      title: "Pipeline / Hub Training Image",
      description: "Photo of Kakuma digital hub training in action.",
      type: "image",
      options: { hotspot: true },
      fieldset: "overview",
    }),

    defineField({
      name: "talentCategories",
      title: "Talent Role Categories",
      type: "array",
      of: [cardItem],
      fieldset: "overview",
    }),

    defineField({
      name: "howHiringWorks",
      title: "How Hiring Works Steps",
      type: "array",
      of: [stepItem],
      fieldset: "overview",
    }),

    defineField({
      name: "employerBenefits",
      title: "Employer Benefit Cards",
      type: "array",
      of: [cardItem],
      fieldset: "overview",
    }),

    defineField({
      name: "proofAndTrust",
      title: "Proof & Trust Cards",
      type: "array",
      of: [cardItem],
      fieldset: "overview",
    }),

    defineField({
      name: "impactStats",
      title: "Impact Metrics Cards",
      type: "array",
      of: [metricItem],
      fieldset: "overview",
    }),

    // ==========================================
    // 2. TALENT MODEL PAGE (/jobs/talent)
    // ==========================================
    defineField({
      name: "talentHeroTitle",
      title: "Talent Page Hero Title",
      type: "string",
      fieldset: "talentModel",
    }),
    defineField({
      name: "talentHeroSubtitle",
      title: "Talent Page Hero Subtitle",
      type: "text",
      rows: 3,
      fieldset: "talentModel",
    }),
    defineField({
      name: "talentHeroImage",
      title: "Talent Page Hero Image",
      type: "image",
      options: { hotspot: true },
      fieldset: "talentModel",
    }),

    defineField({
      name: "profilePillars",
      title: "Talent Profile Pillars",
      type: "array",
      of: [cardItem],
      fieldset: "talentModel",
    }),

    defineField({
      name: "journeySteps",
      title: "Talent Journey Steps",
      type: "array",
      of: [stepItem],
      fieldset: "talentModel",
    }),

    defineField({
      name: "leadershipTitle",
      title: "Leadership Section Title",
      type: "string",
      fieldset: "talentModel",
    }),
    defineField({
      name: "leadershipBody",
      title: "Leadership Section Description",
      type: "text",
      rows: 3,
      fieldset: "talentModel",
    }),
    defineField({
      name: "leadershipImage",
      title: "Refugee-Led Leadership Photo (Hubert Senga)",
      type: "image",
      options: { hotspot: true },
      fieldset: "talentModel",
    }),

    // ==========================================
    // 3. FOR EMPLOYERS PAGE (/jobs/employers)
    // ==========================================
    defineField({
      name: "employerHeroTitle",
      title: "Employers Page Hero Title",
      type: "string",
      fieldset: "employers",
    }),
    defineField({
      name: "employerHeroSubtitle",
      title: "Employers Page Hero Subtitle",
      type: "text",
      rows: 3,
      fieldset: "employers",
    }),
    defineField({
      name: "employerHeroImage",
      title: "Employers Hero Image",
      type: "image",
      options: { hotspot: true },
      fieldset: "employers",
    }),

    defineField({
      name: "valuePillars",
      title: "Employer Value Pillars",
      type: "array",
      of: [cardItem],
      fieldset: "employers",
    }),

    defineField({
      name: "serviceLines",
      title: "Service Portfolio Lines",
      type: "array",
      of: [cardItem],
      fieldset: "employers",
    }),

    defineField({
      name: "esgPillars",
      title: "ESG & SDG Impact Sourcing Pillars",
      type: "array",
      of: [cardItem],
      fieldset: "employers",
    }),
    defineField({
      name: "esgImpactImage",
      title: "ESG & Graduation Cohort Image",
      type: "image",
      options: { hotspot: true },
      fieldset: "employers",
    }),

    defineField({
      name: "qualityPillars",
      title: "Quality & Infrastructure Pillars",
      type: "array",
      of: [cardItem],
      fieldset: "employers",
    }),
    defineField({
      name: "employerInfraImage",
      title: "Delivery Center Infrastructure & Hub Image",
      type: "image",
      options: { hotspot: true },
      fieldset: "employers",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "overviewHeroImage",
    },
    prepare(selection) {
      const { title, media } = selection as { title?: string; media?: any };
      return {
        title: title || "Generation Jobs CMS Content & Imagery",
        subtitle: "Comprehensive fields for Overview, Talent Model, & Employers pages",
        media,
      };
    },
  },
});
