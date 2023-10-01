import mongoose from "mongoose";
import { config } from "dotenv";
config();
let isConnected;
console.log("uwdnwjdwnued");
const connectToDb = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }
  console.log("Creating new database connection");
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = db.connections[0].readyState;
};
connectToDb();
