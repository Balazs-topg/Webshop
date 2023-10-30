import jwt from "jsonwebtoken";
import AccountModel, { Account } from "../models/AccountModel";
/**
 * Takes request
 */
export default async function getUser(request: Request): Promise<Account> {
  const reqJwt = request.headers.get("jwt");
  if (!reqJwt) throw new Error("Header didn't include jwt");
  const verifiedJwt = jwt.verify(reqJwt, process.env.JWT_SECRET_KEY!);
  if (!(verifiedJwt && typeof verifiedJwt === "object" && "id" in verifiedJwt))
    throw new Error("Content of jwt is invalid");
  const userId = verifiedJwt.id;
  const user = await AccountModel.findById(userId);
  if (!user) new Error("User does not exist");
  return user;
}
