import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
    strict: false,
  }
);

const tagModel =
  mongoose.models.tags || mongoose.model("tags", tagSchema);

export default tagModel;
