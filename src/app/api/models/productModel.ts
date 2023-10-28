import mongoose, { Schema, Document, ObjectId } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    brand: { type: Schema.Types.ObjectId, required: true },
    category: { type: Schema.Types.ObjectId, required: true },
    imgs: { type: Array, required: true },
    tags: [{ type: Schema.Types.ObjectId }],
  },
  {
    versionKey: false,
    strict: false,
  }
);

const productModel =
  mongoose.models.products || mongoose.model("products", productSchema);

export default productModel;
