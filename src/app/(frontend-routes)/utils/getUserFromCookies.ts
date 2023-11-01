import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import AccountModel, { Account } from "@/app/api/models/AccountModel";
/**
 * For use in server components
 */
export default async function getUserFromCookies(): Promise<Account> {
  const cookieStore = cookies();
  const jwtCookie = cookieStore.get("jwt");
  if (!jwtCookie) throw new Error("Didn't find jwt in cookies");
  const reqJwt = jwtCookie.value;
  const verifiedJwt = jwt.verify(reqJwt, process.env.JWT_SECRET_KEY!);
  if (!(verifiedJwt && typeof verifiedJwt === "object" && "id" in verifiedJwt))
    throw new Error("Content of jwt is invalid");
  const userId = verifiedJwt.id;
  const user = await AccountModel.findById(userId).select("-password");
  if (!user) new Error("User does not exist");

  return user;
}
