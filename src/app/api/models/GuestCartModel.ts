import mongoose, { Document } from "mongoose";
const { Schema } = mongoose;

interface CartItem {
  item: mongoose.Types.ObjectId;
  quantity?: number;
}

export interface GuestCart extends Document {
  favourites: mongoose.Types.ObjectId[];
  cart: CartItem[];
}

const guestCartSchema = new mongoose.Schema(
  {
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
  },
  {
    versionKey: false,
    strict: false,
  },
);

const GuestCartModel =
  mongoose.models.guestCarts || mongoose.model("guestCarts", guestCartSchema);

export default GuestCartModel;
