import { createClient } from "@sanity/client";

export interface SanityPost {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  slug?: string;
  cover?: string;
  authorName?: string;
  publishedAt?: string;
  createdAt?: string;
}

export interface SanityStory {
  _id: string;
  title: string;
  excerpt?: string;
  body?: string;
  slug?: string;
  cover?: string;
  role?: string;
  program?: string;
  location?: string;
  publishedAt?: string;
  createdAt?: string;
}

export interface SanityProgram {
  _id: string;
  title: string;
  excerpt?: string;
  slug?: string;
  cover?: string;
  features?: string[];
  body?: string;
}

export interface SanityPartner {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  website?: string;
  logo?: string;
  category?: string;
}

export interface SanityTeamMember {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  image?: string;
  linkedin?: string;
  order?: number;
  active?: boolean;
  slug?: string;
}

export interface SanityPhoto {
  _id: string;
  title: string;
  caption?: string;
  imageUrl?: string;
  publishedAt?: string;
}

export interface SanityVideo {
  _id: string;
  title: string;
  description?: string;
  source?: string;
  videoUrl?: string;
  videoFileUrl?: string;
  thumbnailUrl?: string;
  publishedAt?: string;
}

export interface SanityNews {
  _id: string;
  title: string;
  source?: string;
  date?: string;
  category?: string;
  summary?: string;
  url?: string;
  image?: string;
  slug?: string;
}

export interface SanityReport {
  _id: string;
  title: string;
  year?: number;
  kind?: "annual" | "impact" | "financial" | "brief";
  summary?: string;
  downloadUrl?: string;
  fileUrl?: string;
  pages?: number;
  slug?: string;
}

export interface SanityTalentProfile {
  _id: string;
  name: string;
  slug?: string;
  title?: string;
  location?: string;
  languages?: string[];
  expertise?: string[];
  bio?: string;
  readiness?: string;
  image?: string;
  order?: number;
  active?: boolean;
}

export interface TalentProfileRecord {
  _id: string;
  slug: string;
  name: string;
  title: string;
  location: string;
  languages: string[];
  expertise: string[];
  bio: string;
  readiness: string;
  image?: string;
}

export interface PlacementRequestInput {
  clientName: string;
  clientEmail: string;
  company?: string;
  roleType?: string;
  subject: string;
  message: string;
  talentProfileSlug: string;
  talentProfileName?: string;
}

export interface DisplayPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  cover: string | undefined;
  content: string[];
}

export interface DisplayStory {
  key: string;
  href: string;
  name: string;
  role: string;
  program: string;
  location: string;
  image: string;
  excerpt: string;
  paragraphs: string[];
}

export interface DisplayProgram {
  title: string;
  body: string;
  image: string;
  slug: string;
}

export interface DisplayPartner {
  key: string;
  name: string;
  category: string;
  description: string;
  url?: string;
  logo?: string;
}

export interface DisplayTeamMember {
  key: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export interface DisplayPhoto {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export interface DisplayVideo {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  createdAt: string;
}

export interface DisplayNews {
  key: string;
  source: string;
  date: string;
  title: string;
  summary: string;
  category?: string;
  url?: string;
  image: string;
}

export interface DisplayReport {
  key: string;
  year: number;
  title: string;
  summary: string;
  kind: "annual" | "impact" | "financial" | "brief";
  downloadUrl?: string;
  pages?: number;
}

const projectId = (
  import.meta.env.VITE_SANITY_PROJECT_ID ||
  import.meta.env.VITE_SANITY_STUDIO_PROJECT_ID ||
  ""
).trim();

const dataset = (import.meta.env.VITE_SANITY_DATASET || "production").trim();

export const sanityClient =
  projectId && dataset
    ? createClient({
        projectId,
        dataset,
        apiVersion: import.meta.env.VITE_SANITY_API_VERSION || "2024-01-01",
        useCdn: false,
      })
    : null;

function formatDate(input: string): string {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export async function getPublishedPosts(): Promise<SanityPost[]> {
  if (!sanityClient) return [];

  return sanityClient.fetch<
    SanityPost[]
  >(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    excerpt,
    "content": pt::text(body),
    "slug": slug.current,
    "cover": coalesce(coverImage.asset->url, ""),
    "authorName": authorName,
    publishedAt,
    _updatedAt
  }`);
}

export async function getPublishedPostBySlug(
  slug: string,
): Promise<SanityPost | null> {
  if (!sanityClient) return null;

  return sanityClient.fetch<SanityPost | null>(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      excerpt,
      "content": pt::text(body),
      "slug": slug.current,
      "cover": coalesce(coverImage.asset->url, ""),
      "authorName": authorName,
      publishedAt,
      _updatedAt
    }`,
    { slug },
  );
}

export async function getPublishedStories(): Promise<SanityStory[]> {
  if (!sanityClient) return [];

  return sanityClient.fetch<
    SanityStory[]
  >(`*[_type == "story" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    excerpt,
    "body": pt::text(body),
    "slug": slug.current,
    "cover": coalesce(coverImage.asset->url, ""),
    role,
    program,
    location,
    publishedAt,
    _updatedAt
  }`);
}

export async function getStoryBySlug(
  slug: string,
): Promise<SanityStory | null> {
  if (!sanityClient) return null;

  return sanityClient.fetch<SanityStory | null>(
    `*[_type == "story" && slug.current == $slug][0] {
      _id,
      title,
      excerpt,
      "body": pt::text(body),
      "slug": slug.current,
      "cover": coalesce(coverImage.asset->url, ""),
      role,
      program,
      location,
      publishedAt,
      _updatedAt
    }`,
    { slug },
  );
}

export async function getPrograms(): Promise<SanityProgram[]> {
  if (!sanityClient) return [];

  return sanityClient.fetch<
    SanityProgram[]
  >(`*[_type == "program" && defined(slug.current)] | order(_createdAt asc) {
    _id,
    title,
    excerpt,
    "slug": slug.current,
    "cover": coalesce(coverImage.asset->url, ""),
    features,
    "body": pt::text(body)
  }`);
}

export async function getPartners(): Promise<SanityPartner[]> {
  if (!sanityClient) return [];

  return sanityClient.fetch<
    SanityPartner[]
  >(`*[_type == "partner" && defined(slug.current)] | order(_createdAt asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    website,
    "logo": coalesce(logo.asset->url, ""),
    category
  }`);
}

export async function getTeamMembers(): Promise<SanityTeamMember[]> {
  if (!sanityClient) return [];

  return sanityClient.fetch<
    SanityTeamMember[]
  >(`*[_type == "teamMember" && active == true] | order(coalesce(order, 9999) asc, name asc) {
    _id,
    name,
    role,
    bio,
    "image": coalesce(image.asset->url, ""),
    linkedin,
    order,
    active,
    "slug": slug.current
  }`);
}

export async function getPhotos(): Promise<SanityPhoto[]> {
  if (!sanityClient) return [];

  return sanityClient.fetch<
    SanityPhoto[]
  >(`*[_type == "photo"] | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    caption,
    "imageUrl": coalesce(image.asset->url, ""),
    "publishedAt": coalesce(publishedAt, _createdAt)
  }`);
}

export async function getVideos(): Promise<SanityVideo[]> {
  if (!sanityClient) return [];

  return sanityClient.fetch<
    SanityVideo[]
  >(`*[_type == "video"] | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    description,
    source,
    videoUrl,
    "videoFileUrl": coalesce(videoFile.asset->url, ""),
    "thumbnailUrl": coalesce(thumbnail.asset->url, ""),
    "publishedAt": coalesce(publishedAt, _createdAt)
  }`);
}

export async function getNews(): Promise<SanityNews[]> {
  if (!sanityClient) return [];

  return sanityClient.fetch<
    SanityNews[]
  >(`*[_type == "news" && defined(slug.current)] | order(date desc) {
    _id,
    title,
    source,
    date,
    category,
    summary,
    url,
    "image": coalesce(image.asset->url, ""),
    "slug": slug.current
  }`);
}

export async function getReports(): Promise<SanityReport[]> {
  if (!sanityClient) return [];

  return sanityClient.fetch<
    SanityReport[]
  >(`*[_type == "report" && defined(slug.current)] | order(year desc) {
    _id,
    title,
    year,
    kind,
    summary,
    downloadUrl,
    "fileUrl": file.asset->url,
    pages,
    "slug": slug.current
  }`);
}

export async function getTalentProfiles(): Promise<SanityTalentProfile[]> {
  if (!sanityClient) return [];

  return sanityClient.fetch<
    SanityTalentProfile[]
  >(`*[_type == "talentProfile" && active == true && defined(slug.current)] | order(coalesce(order, 9999) asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    title,
    location,
    languages,
    expertise,
    bio,
    readiness,
    "image": coalesce(image.asset->url, ""),
    order,
    active
  }`);
}

export async function getTalentProfileBySlug(
  slug: string,
): Promise<SanityTalentProfile | null> {
  if (!sanityClient || !slug) return null;

  return sanityClient.fetch<SanityTalentProfile | null>(
    `*[_type == "talentProfile" && active == true && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      title,
      location,
      languages,
      expertise,
      bio,
      readiness,
      "image": coalesce(image.asset->url, ""),
      order,
      active
    }`,
    { slug },
  );
}

export async function createPlacementRequest(
  input: PlacementRequestInput,
): Promise<{ _id: string }> {
  const response = await fetch("/api/placement-requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const payload = (await response.json().catch(() => null)) as {
    _id?: string;
    error?: string;
  } | null;

  if (!response.ok) {
    throw new Error(payload?.error || "Unable to submit request right now.");
  }

  if (!payload?._id) {
    throw new Error("Unable to submit request right now.");
  }

  return { _id: payload._id };
}

export interface SanityJobsContent {
  _id?: string;
  jobsLogo?: string;
  overviewHeroTitle?: string;
  overviewHeroSubtitle?: string;
  overviewHeroImage?: string;
  leadershipImage?: string;
  pipelineImage?: string;
  marketNeedTitle?: string;
  marketProblems?: string[];
  pipelineTitle?: string;
  pipelineSteps?: string[];
  talentCategories?: string[];
  howHiringWorks?: string[];
  [key: string]: unknown;
}

export async function getJobsContent(): Promise<SanityJobsContent | null> {
  if (!sanityClient) return null;

  return sanityClient.fetch<SanityJobsContent>(
    `*[_type == "jobsContent"][0] {
      _id,
      "jobsLogo": coalesce(jobsLogo.asset->url, ""),
      overviewHeroTitle,
      overviewHeroSubtitle,
      "overviewHeroImage": coalesce(overviewHeroImage.asset->url, ""),
      marketNeedTitle,
      marketProblems,
      pipelineTitle,
      pipelineSteps,
      "pipelineImage": coalesce(pipelineImage.asset->url, ""),
      talentCategories,
      howHiringWorks,
      employerBenefits,
      proofAndTrust,
      impactStats,
      talentHeroTitle,
      talentHeroSubtitle,
      "talentHeroImage": coalesce(talentHeroImage.asset->url, ""),
      profilePillars,
      journeySteps,
      leadershipTitle,
      leadershipBody,
      "leadershipImage": coalesce(leadershipImage.asset->url, ""),
      employerHeroTitle,
      employerHeroSubtitle,
      "employerHeroImage": coalesce(employerHeroImage.asset->url, ""),
      valuePillars,
      serviceLines,
      esgPillars,
      "esgImpactImage": coalesce(esgImpactImage.asset->url, ""),
      qualityPillars,
      "employerInfraImage": coalesce(employerInfraImage.asset->url, "")
    }`
  );
}

export function mapSanityPostToDisplayPost(post: SanityPost): DisplayPost {
  return {
    slug: post.slug ?? post._id,
    title: post.title,
    date: formatDate(post.publishedAt || post.createdAt || ""),
    author: post.authorName || "Generation Aid",
    excerpt: post.excerpt || "",
    cover: post.cover || undefined,
    content: splitParagraphs(post.content || ""),
  };
}

export function mapSanityStoryToDisplayStory(story: SanityStory): DisplayStory {
  return {
    key: story.slug ?? story._id,
    href: `/stories/${story.slug ?? story._id}`,
    name: story.title,
    role: story.role || "",
    program: story.program || "",
    location: story.location || "",
    image: story.cover || "",
    excerpt: story.excerpt || "",
    paragraphs: splitParagraphs(story.body || ""),
  };
}

export function mapSanityProgramToDisplayProgram(
  program: SanityProgram,
  fallbackImage: string = "/img/team/programs.jpg",
): DisplayProgram {
  return {
    title: program.title,
    body: program.excerpt || program.body || "",
    image: program.cover || fallbackImage,
    slug: program.slug ?? program._id,
  };
}

export function mapSanityPartnerToDisplayPartner(
  partner: SanityPartner,
): DisplayPartner {
  return {
    key: partner.slug ?? partner._id,
    name: partner.name,
    category: partner.category || "Strategic",
    description: partner.description || "",
    url: partner.website || undefined,
    logo: partner.logo || undefined,
  };
}

export function mapSanityTeamMemberToDisplayTeamMember(
  member: SanityTeamMember,
): DisplayTeamMember {
  return {
    key: member.slug ?? member._id,
    name: member.name,
    role: member.role || "Team member",
    bio: member.bio || "",
    image: member.image || "",
    linkedin: member.linkedin || undefined,
  };
}

export function mapSanityPhotoToDisplayPhoto(photo: SanityPhoto): DisplayPhoto {
  return {
    _id: photo._id,
    title: photo.title,
    description: photo.caption || "",
    imageUrl: photo.imageUrl || "",
    createdAt: photo.publishedAt || "",
  };
}

export function mapSanityVideoToDisplayVideo(video: SanityVideo): DisplayVideo {
  return {
    _id: video._id,
    title: video.title,
    description: video.description || "",
    videoUrl:
      video.source === "upload"
        ? video.videoFileUrl || ""
        : video.videoUrl || "",
    posterUrl: video.thumbnailUrl || "",
    createdAt: video.publishedAt || "",
  };
}

export function mapSanityNewsToDisplayNews(news: SanityNews): DisplayNews {
  return {
    key: news.slug ?? news._id,
    source: news.source || "Generation Aid",
    date: news.date || "",
    title: news.title,
    summary: news.summary || "",
    category: news.category || undefined,
    url: news.url || undefined,
    image: news.image || "",
  };
}

export function mapSanityReportToDisplayReport(
  report: SanityReport,
): DisplayReport {
  return {
    key: report.slug ?? report._id,
    year: report.year ?? 0,
    title: report.title,
    summary: report.summary || "",
    kind: report.kind || "annual",
    downloadUrl: report.downloadUrl || report.fileUrl || undefined,
    pages: report.pages,
  };
}

export function mapSanityTalentProfileToRecord(
  profile: SanityTalentProfile,
): TalentProfileRecord {
  return {
    _id: profile._id,
    slug: profile.slug ?? profile._id,
    name: profile.name,
    title: profile.title || "Professional",
    location: profile.location || "Kakuma, Kenya",
    languages: profile.languages || [],
    expertise: profile.expertise || [],
    bio: profile.bio || "",
    readiness: profile.readiness || "Ready for Placement",
    image: profile.image || undefined,
  };
}

export interface SanitySiteSettings {
  title?: string;
  description?: string;
  logo?: string;
  donateUrl?: string;
}

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<SanitySiteSettings>(
      `*[_type == "siteSettings"][0]{
        title,
        description,
        "logo": logo.asset->url,
        donateUrl
      }`
    );
  } catch (error) {
    console.warn("Sanity getSiteSettings error:", error);
    return null;
  }
}
