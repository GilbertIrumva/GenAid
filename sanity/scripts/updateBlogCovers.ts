import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../..");
const clientPublicDir = path.resolve(projectRoot, "client/public");

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "fr1v7hol",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  apiVersion: "2024-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function downloadIfMissing(url: string, destPath: string): Promise<boolean> {
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
    console.log(`Already exists: ${destPath}`);
    return true;
  }
  try {
    console.log(`Downloading ${url} -> ${destPath}...`);
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    if (!res.ok) {
      console.warn(`Failed to download ${url}: status ${res.status}`);
      return false;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, buffer);
    console.log(`Saved ${destPath} (${buffer.length} bytes)`);
    return true;
  } catch (err) {
    console.warn(`Error downloading ${url}:`, err);
    return false;
  }
}

async function uploadAsset(absPath: string) {
  const stream = fs.createReadStream(absPath);
  return await client.assets.upload("image", stream, {
    filename: path.basename(absPath),
  });
}

async function main() {
  console.log("=== UPDATING BLOG COVERS FOR 2 BLOG POSTS ===");

  const blogDir = path.resolve(clientPublicDir, "blog");
  fs.mkdirSync(blogDir, { recursive: true });

  // 1. UNHCR Delegation Cover
  const unhcrCoverDest = path.resolve(blogDir, "unhcr-visit-cover.jpg");
  // The local photo IMG_20260611_111051_050.jpg is the actual UNHCR visit photo taken on June 11, 2026
  const localUnhcrPhoto = path.resolve(clientPublicDir, "IMG_20260611_111051_050.jpg");
  if (fs.existsSync(localUnhcrPhoto)) {
    fs.copyFileSync(localUnhcrPhoto, unhcrCoverDest);
    console.log(`Copied authentic UNHCR delegation photo to ${unhcrCoverDest}`);
  } else {
    await downloadIfMissing(
      "https://media.licdn.com/dms/image/v2/D4D22AQF7u2wlvntemA/feedshare-shrink_800/B4DZ64fL7PHgAk-/0/1781211644043?e=2147483647&v=beta&t=L6S7NtqPrDOTcWbkr2IoFNRW1fs507W4ouiiQ8vS7p8",
      unhcrCoverDest
    );
  }

  // 2. Remote Volunteers at Kalobeyei Cover
  const volunteersCoverDest = path.resolve(blogDir, "remote-volunteers-kalobeyei-cover.jpg");
  // Try downloading the LinkedIn banner or use a group photo
  const downloaded = await downloadIfMissing(
    "https://media.licdn.com/dms/image/v2/D4D22AQERAd3wDPcDWQ/feedshare-shrink_800/B4DZ712OlaKQAc-/0/1782241094415?e=2147483647&v=beta&t=bBUqLnRxJCCJNhZMvJebH5X50DswjRv9kEyvOkkhBjs",
    volunteersCoverDest
  );
  if (!downloaded) {
    // Try alternate group photo from the post
    await downloadIfMissing(
      "https://media.licdn.com/dms/image/v2/D4D22AQH_jt4anBzEkQ/feedshare-shrink_800/B4DZ712OLlKQAc-/0/1782241092704?e=2147483647&v=beta&t=xcPJagbxtRTvBsS5LGNHCKfEzjZqOaP-53I7X5Rjo9c",
      volunteersCoverDest
    );
  }
  // Fallback if network blocked: copy June 22/23 photo
  if (!fs.existsSync(volunteersCoverDest) || fs.statSync(volunteersCoverDest).size < 1000) {
    const fallbackPhoto = path.resolve(clientPublicDir, "Copy of IMG_20260622_152138_308.jpg");
    if (fs.existsSync(fallbackPhoto)) {
      fs.copyFileSync(fallbackPhoto, volunteersCoverDest);
      console.log(`Used classroom workshop photo as fallback: ${volunteersCoverDest}`);
    }
  }

  // Upload to Sanity
  console.log("\nUploading assets to Sanity...");
  const unhcrAsset = await uploadAsset(unhcrCoverDest);
  console.log(`✓ UNHCR cover uploaded to Sanity: ${unhcrAsset._id}`);

  const volAsset = await uploadAsset(volunteersCoverDest);
  console.log(`✓ Remote volunteers cover uploaded to Sanity: ${volAsset._id}`);

  // Patch Sanity documents
  console.log("\nPatching Sanity documents...");
  const unhcrDocId = "post-unhcr-and-australian-aid-delegation-visit-generation-aid";
  await client
    .patch(unhcrDocId)
    .set({
      coverImage: {
        _type: "image",
        asset: { _type: "reference", _ref: unhcrAsset._id },
      },
    })
    .commit();
  console.log(`✓ Patched ${unhcrDocId} with coverImage`);

  const volDocId = "post-welcoming-remote-team-to-kakuma-kalobeyei-facility";
  await client
    .patch(volDocId)
    .set({
      coverImage: {
        _type: "image",
        asset: { _type: "reference", _ref: volAsset._id },
      },
    })
    .commit();
  console.log(`✓ Patched ${volDocId} with coverImage`);

  console.log("\n=== ALL DONE ===");
}

main().catch(console.error);
