import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    strict: false,
  }
);

const accountModel =
  mongoose.models.accounts || mongoose.model("accounts", accountSchema);

export default accountModel;
