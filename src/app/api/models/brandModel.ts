import mongoose, { Document } from "mongoose";

export interface Brand extends Document {
  name: string;
}

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
    strict: false,
  },
);

const BrandModel =
  mongoose.models.brands || mongoose.model("brands", brandSchema);

export default BrandModel;
