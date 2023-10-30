import mongoose, { Document } from "mongoose";

export interface Brand extends Document {
  name: string;
}

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
    strict: false,
  }
);

const CategoryModel =
  mongoose.models.categories || mongoose.model("categories", categorySchema);

export default CategoryModel;
