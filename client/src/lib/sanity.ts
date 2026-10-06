import { createClient } from "@sanity/client";

export interface SanityPost {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string | string[];
  slug?: string;
  cover?: string;
  authorName?: string;
  date?: string;
  youtubeId?: string;
  videoTitle?: string;
  videoDescription?: string;
  publishedAt?: string;
  createdAt?: string;
}

export interface SanityStory {
  _id: string;
  title: string;
  name?: string;
  excerpt?: string;
  body?: string;
  content?: string[];
  slug?: string;
  cover?: string;
  image?: string;
  role?: string;
  program?: string;
  location?: string;
  videoUrl?: string;
  videoPoster?: string;
  publishedAt?: string;
  createdAt?: string;
}

export interface SanityProgram {
  _id: string;
  id?: string;
  title: string;
  excerpt?: string;
  slug?: string;
  cover?: string;
  image?: string;
  category?: string;
  tagline?: string;
  speaker?: string;
  partner?: string;
  features?: string[];
  body?: string;
  gallery?: string[];
  problemStatement?: string;
  goals?: Array<{ title: string; description: string }>;
  targetAudience?: string;
  whyItMatters?: string;
  components?: Array<{ title: string; description: string }>;
  gains?: string[];
  howToJoin?: string;
  specialHighlight?: { title: string; description: string };
  vision?: string;
  quote?: { text: string; author: string; role?: string };
  bookingUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  mediaVideos?: Array<{
    title: string;
    outlet: string;
    youtubeId?: string;
    url: string;
    description: string;
  }>;
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


export interface DisplayPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  cover: string | undefined;
  youtubeId?: string;
  videoTitle?: string;
  videoDescription?: string;
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
  videoUrl?: string;
  videoPoster?: string;
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

const useSanity = import.meta.env.VITE_USE_SANITY !== "false";

const projectId = useSanity
  ? (
      import.meta.env.VITE_SANITY_PROJECT_ID ||
      import.meta.env.VITE_SANITY_STUDIO_PROJECT_ID ||
      ""
    ).trim()
  : "";

const dataset = (import.meta.env.VITE_SANITY_DATASET || "production").trim();

export const sanityClient =
  useSanity && projectId && dataset
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
    "content": coalesce(content, [pt::text(body)]),
    "slug": slug.current,
    "cover": coalesce(coverImage.asset->url, ""),
    "authorName": coalesce(author, authorName, "Generation Aid"),
    "date": coalesce(date, publishedAt),
    youtubeId,
    videoTitle,
    videoDescription,
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
      "content": coalesce(content, [pt::text(body)]),
      "slug": slug.current,
      "cover": coalesce(coverImage.asset->url, ""),
      "authorName": coalesce(author, authorName, "Generation Aid"),
      "date": coalesce(date, publishedAt),
      youtubeId,
      videoTitle,
      videoDescription,
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
    "title": coalesce(name, title),
    "name": coalesce(name, title),
    excerpt,
    "content": content,
    "body": coalesce(pt::text(body), ""),
    "slug": slug.current,
    "cover": coalesce(image.asset->url, coverImage.asset->url, ""),
    "image": coalesce(image.asset->url, coverImage.asset->url, ""),
    role,
    program,
    location,
    videoUrl,
    "videoPoster": coalesce(videoPoster.asset->url, ""),
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
      "title": coalesce(name, title),
      "name": coalesce(name, title),
      excerpt,
      "content": content,
      "body": coalesce(pt::text(body), ""),
      "slug": slug.current,
      "cover": coalesce(image.asset->url, coverImage.asset->url, ""),
      "image": coalesce(image.asset->url, coverImage.asset->url, ""),
      role,
      program,
      location,
      videoUrl,
      "videoPoster": coalesce(videoPoster.asset->url, ""),
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
    "id": coalesce(slug.current, _id),
    title,
    excerpt,
    "slug": slug.current,
    "cover": coalesce(image.asset->url, coverImage.asset->url, ""),
    "image": coalesce(image.asset->url, coverImage.asset->url, ""),
    category,
    tagline,
    speaker,
    partner,
    features,
    "body": coalesce(body, pt::text(body), ""),
    "gallery": coalesce(gallery[].asset->url, []),
    problemStatement,
    targetAudience,
    whyItMatters,
    goals,
    components,
    gains,
    howToJoin,
    specialHighlight,
    vision,
    quote,
    bookingUrl,
    ctaText,
    ctaLink,
    mediaVideos
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

  try {
    return await sanityClient.fetch<SanityJobsContent>(
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
        "employerInfraImage": coalesce(employerInfraImage.asset->url, ""),
        hireHeroTitle,
        hireHeroSubtitle,
        clientFormUrl,
        hireBenefits
      }`
    );
  } catch (error) {
    console.warn("Could not fetch Sanity jobsContent (using static fallback):", error);
    return null;
  }
}

export function mapSanityPostToDisplayPost(post: SanityPost): DisplayPost {
  const content = Array.isArray(post.content)
    ? post.content
    : splitParagraphs(typeof post.content === "string" ? post.content : "");

  return {
    slug: post.slug ?? post._id,
    title: post.title,
    date: post.date || formatDate(post.publishedAt || post.createdAt || ""),
    author: post.authorName || "Generation Aid",
    excerpt: post.excerpt || "",
    cover: post.cover || undefined,
    youtubeId: post.youtubeId,
    videoTitle: post.videoTitle,
    videoDescription: post.videoDescription,
    content,
  };
}

export function mapSanityStoryToDisplayStory(story: SanityStory): DisplayStory {
  const paragraphs = Array.isArray(story.content) && story.content.length > 0
    ? story.content
    : splitParagraphs(story.body || "");

  return {
    key: story.slug ?? story._id,
    href: `/stories/${story.slug ?? story._id}`,
    name: story.name || story.title,
    role: story.role || "",
    program: story.program || "",
    location: story.location || "",
    image: story.image || story.cover || "",
    excerpt: story.excerpt || "",
    videoUrl: story.videoUrl,
    videoPoster: story.videoPoster,
    paragraphs,
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


export interface SanitySiteSettings {
  title?: string;
  description?: string;
  logo?: string;
  donateUrl?: string;
  phoneKenya?: string;
  phoneInternational?: string;
  email?: string;
  address?: string;
  socials?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
}

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<SanitySiteSettings>(
      `*[_type == "siteSettings"][0]{
        title,
        description,
        "logo": logo.asset->url,
        donateUrl,
        phoneKenya,
        phoneInternational,
        email,
        address,
        socials
      }`
    );
  } catch (error) {
    console.warn("Sanity getSiteSettings error:", error);
    return null;
  }
}

export interface DisplayCause {
  key: string;
  title: string;
  description: string;
  image: string;
  goal: number;
  raised: number;
  donateUrl: string;
}

export async function getCauses(): Promise<DisplayCause[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch<DisplayCause[]>(
      `*[_type == "cause"] | order(coalesce(order, 0) asc) {
        "key": coalesce(slug.current, _id),
        title,
        description,
        "image": coalesce(image.asset->url, ""),
        goal,
        raised,
        donateUrl
      }`
    );
  } catch (error) {
    console.warn("Sanity getCauses error:", error);
    return [];
  }
}

export interface DisplayTestimonial {
  key: string;
  quote: string;
  name: string;
  role: string;
  image: string;
}

export async function getTestimonials(): Promise<DisplayTestimonial[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch<DisplayTestimonial[]>(
      `*[_type == "testimonial"] | order(coalesce(order, 0) asc) {
        "key": coalesce(slug.current, _id),
        name,
        role,
        quote,
        "image": coalesce(image.asset->url, "")
      }`
    );
  } catch (error) {
    console.warn("Sanity getTestimonials error:", error);
    return [];
  }
}

export interface DisplayServicePackage {
  slug: string;
  category: string;
  title: string;
  firstMonthPrice: number;
  secondMonthPrice: number;
  monthlyPrice: number;
  description: string;
  deliverables: string[];
  impact: string;
}

export async function getServicePackages(): Promise<DisplayServicePackage[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch<DisplayServicePackage[]>(
      `*[_type == "servicePackage"] | order(coalesce(order, 0) asc) {
        "slug": coalesce(slug.current, _id),
        category,
        title,
        firstMonthPrice,
        secondMonthPrice,
        monthlyPrice,
        description,
        deliverables,
        impact
      }`
    );
  } catch (error) {
    console.warn("Sanity getServicePackages error:", error);
    return [];
  }
}

