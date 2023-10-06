import jwt from "jsonwebtoken";
import mongoose from "mongoose";

type AccountModelType = {
  email: string;
  username: string;
  password: string;
  _id: mongoose.ObjectId;
};

// takes a mongoose object
export const createJwt = (userObj: AccountModelType | null) => {
  if (!userObj) {
    throw new Error("Error in createJwt, recived null");
  }
  const response = jwt.sign(
    { id: String(userObj._id) },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "28d",
    }
  );
  return response;
};
