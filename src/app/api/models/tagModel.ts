import mongoose, { Document } from "mongoose";

export interface Tag extends Document {
  name: string;
}

const tagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
    strict: false,
  },
);

const TagModel = mongoose.models.tags || mongoose.model("tags", tagSchema);

export default TagModel;
