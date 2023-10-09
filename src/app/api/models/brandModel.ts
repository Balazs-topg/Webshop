import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
    strict: false,
  }
);

const brandModel =
  mongoose.models.brands || mongoose.model("brands", brandSchema);

export default brandModel;
