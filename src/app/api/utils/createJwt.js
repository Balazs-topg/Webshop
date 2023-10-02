import jwt from "jsonwebtoken";

// takes a mongoose object
export const createJwt = (userObj) => {
  const response = jwt.sign(
    { id: String(userObj._id) },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "28d",
    }
  );
  return response;
};
