/**
 * Annual reports, impact assessments and policy briefs published by
 * Generation Aid. Renders on the `/reports` page.
 *
 * `downloadUrl` is optional — items without one show a "Coming soon" badge so
 * the page stays meaningful while documents are being finalised. Add files
 * under `client/public/reports/` and point `downloadUrl` at `/reports/<file>.pdf`
 * once they're published.
 */
export type ReportKind = "annual" | "impact" | "financial" | "brief";

export interface ReportItem {
  /** Stable slug used as the React key. */
  key: string;
  /** Reporting year. */
  year: number;
  /** Document title. */
  title: string;
  /** Short summary (~30–50 words) describing what's inside. */
  summary: string;
  /** Document type — drives the colored kicker shown on the card. */
  kind: ReportKind;
  /** Optional public path or URL to the PDF. Omit until the file is ready. */
  downloadUrl?: string;
  /** Optional page count, displayed as a small label when set. */
  pages?: number;
}

export const reports: ReportItem[] = [
  {
    key: "annual-2025",
    year: 2025,
    title: "2025 Annual Report",
    summary:
      "A full year in review: 120-learner ICT cohort, the tailoring exchange with Kalobeyei, employer partnerships, and how every dollar was spent.",
    kind: "annual",
    pages: 28,
  },
  {
    key: "impact-2024",
    year: 2024,
    title: "2024 Impact Assessment",
    summary:
      "Independent assessment of programme outcomes — completion rates, placement rates, and learner satisfaction across our ICT, English and dressmaking tracks.",
    kind: "impact",
    pages: 22,
  },
  {
    key: "annual-2024",
    year: 2024,
    title: "2024 Annual Report",
    summary:
      "Programme highlights, financial summary and a snapshot of our growth from a single ICT lab to four vocational streams serving learners across Kakuma.",
    kind: "annual",
    pages: 24,
  },
  {
    key: "financial-2024",
    year: 2024,
    title: "2024 Financial Statement",
    summary:
      "Audited income and expenditure summary — including programme costs, overheads, and a breakdown of grant, donor and partner funding.",
    kind: "financial",
    pages: 12,
  },
  {
    key: "brief-livelihoods-2024",
    year: 2024,
    title: "Policy brief: Refugee-led livelihoods in Kakuma",
    summary:
      "Recommendations for policymakers and humanitarian partners on scaling refugee-led skills training and small-business support in protracted-displacement settings.",
    kind: "brief",
    pages: 8,
  },
  {
    key: "annual-2023",
    year: 2023,
    title: "2023 Annual Report",
    summary:
      "Our second full year of operations — the launch of the tailoring and English tracks, founding-team reflections, and the road to 500 lifetime learners.",
    kind: "annual",
    pages: 20,
  },
];
