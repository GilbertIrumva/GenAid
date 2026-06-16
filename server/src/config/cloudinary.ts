import { v2 as cloudinary } from "cloudinary";
import { env } from "./env";

// Configure the SDK once at boot. All uploader / destroy calls reuse this.
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };
