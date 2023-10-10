import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    imgs: { type: Array, required: true },
    tags: { type: Array, required: true },
  },
  {
    versionKey: false,
    strict: false,
  }
);

const productModel = mongoose.models.products || mongoose.model("products", productSchema);

export default productModel;
