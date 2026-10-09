import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../..");
const clientPublicDir = path.resolve(projectRoot, "client/public");

async function downloadGoogleDriveImage(fileId: string, destPath: string): Promise<boolean> {
  const candidateUrls = [
    `https://lh3.googleusercontent.com/d/${fileId}`,
    `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`,
    `https://drive.google.com/uc?export=download&id=${fileId}`,
  ];

  for (const url of candidateUrls) {
    try {
      console.log(`Attempting download from: ${url}`);
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        redirect: "follow",
      });

      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        const header = buffer.slice(0, 100).toString("utf8");
        if (!header.includes("<!DOCTYPE") && !header.includes("<html") && buffer.length > 3000) {
          fs.mkdirSync(path.dirname(destPath), { recursive: true });
          fs.writeFileSync(destPath, buffer);
          console.log(`✓ Successfully downloaded ${buffer.length} bytes to ${destPath}`);
          return true;
        } else {
          console.warn(`URL returned non-image content (${buffer.length} bytes)`);
        }
      } else {
        console.warn(`Fetch returned status ${res.status} for ${url}`);
      }
    } catch (err: any) {
      console.warn(`Error fetching ${url}: ${err.message}`);
    }
  }
  return false;
}

async function main() {
  const pillarsDest = path.join(clientPublicDir, "img/about/four-pillars.png");
  const hubertDest = path.join(clientPublicDir, "img/about/hubert-origin.jpg");

  console.log("Downloading Four Pillars image (1qZTdg2QtwY7Yh_S-Y7Xhfl8Ger8nqsyc)...");
  const pSuccess = await downloadGoogleDriveImage("1qZTdg2QtwY7Yh_S-Y7Xhfl8Ger8nqsyc", pillarsDest);
  console.log("Pillars download result:", pSuccess);

  console.log("Downloading Hubert Where It All Began photo (1lRZEMjZJHGgNGk5-VHPY7g2Ia9strsZT)...");
  const hSuccess = await downloadGoogleDriveImage("1lRZEMjZJHGgNGk5-VHPY7g2Ia9strsZT", hubertDest);
  console.log("Hubert download result:", hSuccess);
}

main().catch(console.error);
