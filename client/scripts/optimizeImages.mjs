import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

sharp.cache(false);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");

let totalOriginal = 0;
let totalOptimized = 0;

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "dist" || entry.name === ".git") continue;
      await processDirectory(fullPath);
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      try {
        const fileBuffer = fs.readFileSync(fullPath);
        const originalSize = fileBuffer.length;
        totalOriginal += originalSize;
        const ext = path.extname(entry.name).toLowerCase();

        let pipeline = sharp(fileBuffer);
        const meta = await pipeline.metadata();

        // Limit maximum width to 1920px (standard 1080p / 2x Retina width)
        if (meta.width && meta.width > 1920) {
          pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
        }

        let buffer;
        if (ext === ".jpg" || ext === ".jpeg") {
          buffer = await pipeline
            .jpeg({ quality: 82, mozjpeg: true, progressive: true })
            .toBuffer();
        } else if (ext === ".png") {
          if (originalSize > 80 * 1024) {
            buffer = await pipeline
              .png({ quality: 82, compressionLevel: 9, palette: true })
              .toBuffer();
          } else {
            buffer = await pipeline
              .png({ compressionLevel: 9 })
              .toBuffer();
          }
        }

        if (buffer && buffer.length < originalSize) {
          const savingsKb = ((originalSize - buffer.length) / 1024).toFixed(1);
          const percent = (((originalSize - buffer.length) / originalSize) * 100).toFixed(0);
          fs.writeFileSync(fullPath, buffer);
          totalOptimized += buffer.length;
          console.log(`✓ ${entry.name}: ${(originalSize / 1024).toFixed(1)} KB -> ${(buffer.length / 1024).toFixed(1)} KB (-${percent}%, saved ${savingsKb} KB)`);
        } else {
          totalOptimized += originalSize;
        }
      } catch (err) {
        console.error(`✕ Error on ${entry.name}:`, err.message);
      }
    }
  }
}

console.log("Starting buffer-based image optimization...");
processDirectory(publicDir).then(() => {
  const totalSavedKb = ((totalOriginal - totalOptimized) / 1024).toFixed(1);
  const totalPercent = totalOriginal > 0 ? (((totalOriginal - totalOptimized) / totalOriginal) * 100).toFixed(1) : 0;
  console.log(`\n🎉 Image optimization complete!`);
  console.log(`Original: ${(totalOriginal / 1024).toFixed(1)} KB`);
  console.log(`Optimized: ${(totalOptimized / 1024).toFixed(1)} KB`);
  console.log(`Total data saved: ${totalSavedKb} KB (-${totalPercent}%)`);
});
