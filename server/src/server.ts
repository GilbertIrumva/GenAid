import { env } from "./config/env";
import app from "./app";
import { connectDB } from "./config/db";

async function start() {
  try {
    await connectDB(env.MONGODB_URI);
    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT} [${env.NODE_ENV}]`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
