import jwt from "jsonwebtoken";

// takes a mongoose object
export const createJwt = (userObj) => {
  const response = jwt.sign(
    { id: userObj._id, username: userObj.username },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "28d" }
  );
  return response;
};
