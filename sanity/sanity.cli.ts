import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "fr1v7hol",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  studioHost: "generation-aid",
});
