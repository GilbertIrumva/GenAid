import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Generation Aid & Jobs Studio")
    .items([
      // 💼 GENERATION JOBS SECTION
      S.listItem()
        .title("💼 Generation Jobs Content & Imagery")
        .child(
          S.document()
            .schemaType("jobsContent")
            .documentId("jobsContent")
            .title("Generation Jobs Content & Imagery")
        ),
      S.listItem()
        .title("👨‍💼 Talent Profiles")
        .child(S.documentTypeList("talentProfile").title("Talent Profiles")),
      S.listItem()
        .title("📥 Placement Requests")
        .child(S.documentTypeList("placementRequest").title("Placement Requests")),

      S.divider(),

      // 🌟 PUBLIC MARKETING CONTENT
      S.listItem()
        .title("🏠 Homepage Trust Content")
        .child(
          S.document()
            .schemaType("homepageTrustContent")
            .documentId("homepageTrustContent")
            .title("Homepage Trust Content")
        ),
      S.listItem()
        .title("📰 Blog Posts")
        .child(S.documentTypeList("post").title("Blog Posts")),
      S.listItem()
        .title("📢 News & Press")
        .child(S.documentTypeList("news").title("News & Press")),
      S.listItem()
        .title("📖 Impact Stories")
        .child(S.documentTypeList("story").title("Impact Stories")),
      S.listItem()
        .title("🎓 Programs")
        .child(S.documentTypeList("program").title("Programs")),
      S.listItem()
        .title("📊 Reports & Downloads")
        .child(S.documentTypeList("report").title("Reports & Downloads")),

      S.divider(),

      // 👥 PEOPLE & ORGANIZATIONS
      S.listItem()
        .title("👥 Team Members")
        .child(S.documentTypeList("teamMember").title("Team Members")),
      S.listItem()
        .title("🤝 Partners & Sponsors")
        .child(S.documentTypeList("partner").title("Partners & Sponsors")),

      S.divider(),

      // 🖼️ MEDIA & SETTINGS
      S.listItem()
        .title("🖼️ Photo Gallery")
        .child(S.documentTypeList("photo").title("Photo Gallery")),
      S.listItem()
        .title("🎥 Video Library")
        .child(S.documentTypeList("video").title("Video Library")),
      S.listItem()
        .title("⚙️ Site Settings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings")
        ),
    ]);
