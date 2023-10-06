import mongoose from "mongoose";
import { config } from "dotenv";
config();

let isConnected: boolean | undefined;

const connectToDb = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables.");
  }

  if (isConnected === true) {
    console.log("Using existing database connection");
    return;
  }

  console.log("Creating new database connection");
  const db = await mongoose.connect(process.env.MONGODB_URI);

  isConnected = Boolean(db.connections[0].readyState);
};

connectToDb();
