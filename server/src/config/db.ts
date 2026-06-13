import mongoose from "mongoose";

export async function connectDB(uri: string): Promise<void> {
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to server/.env");
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(uri);

  console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });
}
