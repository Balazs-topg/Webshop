import mongoose, { Document } from "mongoose";
const { Schema } = mongoose;

interface CartItem {
  item: mongoose.Types.ObjectId;
  quantity?: number;
}

export interface Account extends Document {
  email: string;
  username: string;
  password: string;
  favourites: mongoose.Types.ObjectId[];
  cart: CartItem[];
  isAdmin?: string;
}

const accountSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    favourites: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    cart: [
      {
        item: {
          type: Schema.Types.ObjectId,
        },
        quantity: { type: Number, required: false },
      },
    ],
    isAdmin: { type: String, required: false },
  },
  {
    versionKey: false,
    strict: false,
  }
);

const AccountModel =
  mongoose.models.accounts || mongoose.model("accounts", accountSchema);

export default AccountModel;
