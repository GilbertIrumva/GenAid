import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dest = path.resolve(__dirname, "../../client/public/blog/guardian-kakuma-workspace.jpg");

const url = "https://i.guim.co.uk/img/media/53d66ebd8b4c6838ae365637ba65b0178b71b3f3/1075_391_4346_3477/master/4346.jpg?width=1200&quality=85&auto=format&fit=max&s=785aac10f2662a03bd8be75d91065ef3";

console.log("Downloading Guardian cover image to:", dest);
const file = fs.createWriteStream(dest);

https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
  if (res.statusCode !== 200) {
    console.error("Failed to download, status code:", res.statusCode);
    return;
  }
  res.pipe(file);
  file.on("finish", () => {
    file.close();
    console.log("Successfully downloaded Guardian image! Size:", fs.statSync(dest).size, "bytes");
  });
}).on("error", (err) => {
  console.error("Error downloading image:", err.message);
});
