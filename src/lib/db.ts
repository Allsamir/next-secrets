import mongoose from "mongoose";

const MONGODB_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

if (!MONGODB_URL) {
  throw new Error("No MongoDB URL provided.");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URL ?? "", {
        bufferCommands: false,
        connectTimeoutMS: 5000,
      })
      .then((mongoose) => {
        return mongoose;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}

export default dbConnect;
