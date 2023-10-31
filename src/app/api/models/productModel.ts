import mongoose, { Schema, Document } from "mongoose";

export interface ProductToPlainObject {
  _id: string; //*
  name: string;
  price: string;
  brand: string;
  imgs: string;
  tags: string[];
  category: string;
  //* not from db, but will be set by other functions n shit:
  isFavourite?: boolean;
  brandName?: boolean;
}

export interface Product extends Document {
  name: string;
  price: string;
  brand: Schema.Types.ObjectId;
  imgs: string;
  tags: Schema.Types.ObjectId[];
  category: Schema.Types.ObjectId;
}

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
  },
);

const ProductModel =
  mongoose.models.products || mongoose.model("products", productSchema);

export default ProductModel;
