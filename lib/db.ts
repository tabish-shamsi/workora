import mongoose from "mongoose";

let isConnected: boolean;

const db = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default db;
