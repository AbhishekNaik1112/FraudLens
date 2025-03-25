// lib/mongoose.ts
import mongoose from 'mongoose';

// 1. Define the interface first
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// 2. Augment global scope with ESLint exception
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

// Initialize cached connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI || '';

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
