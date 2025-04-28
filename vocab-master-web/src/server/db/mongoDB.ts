import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/vocabMasterDb";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

async function dbConnect() {
  try {
    await mongoose.connect(MONGODB_URI);
    // console.log("Current DB:", mongoose.connection.name);
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

export default dbConnect;
