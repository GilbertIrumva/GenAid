import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dest = path.resolve(__dirname, "../../client/public/gen jobs/hubert-leadership-partnership.jpg");

function download(url: string, filePath: string) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, filePath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error("Status code: " + res.statusCode));
      }
      const file = fs.createWriteStream(filePath);
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", reject);
  });
}

download("https://drive.google.com/uc?export=download&id=18yz7DP5EvXpzABsF0AhSdA_NfKP8-ur1", dest)
  .then(() => {
    const stats = fs.statSync(dest);
    console.log("Successfully downloaded to:", dest, "Size:", stats.size);
  })
  .catch((err) => {
    console.error("Error downloading:", err);
    process.exit(1);
  });
