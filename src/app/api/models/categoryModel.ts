import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
    strict: false,
  }
);

const categoryModel =
  mongoose.models.categories || mongoose.model("categories", categorySchema);

export default categoryModel;
