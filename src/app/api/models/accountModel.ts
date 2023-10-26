import mongoose from "mongoose";
const { Schema } = mongoose;

const accountSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    favourites: [
      {
        type: Schema.Types.ObjectId,
        ref: "SomeModel", // Replace 'SomeModel' with the name of the model these ObjectIds reference, if applicable
      },
    ],
    isAdmin: { type: String, required: false },
  },
  {
    versionKey: false,
    strict: false,
  }
);

const accountModel =
  mongoose.models.accounts || mongoose.model("accounts", accountSchema);

export default accountModel;
