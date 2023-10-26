import jwt from "jsonwebtoken";
import accountModel from "@/app/api/models/accountModel";
import "../../api/utils/connectToDB";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default async function isPageRequestAdmin(allCookies: RequestCookie[]) {
  if (!allCookies) return false;

  const jwtToken = String(
    allCookies.find((cookie) => cookie.name === "jwt")?.value
  );

  if (!jwtToken) return false;

  try {
    jwt.verify(jwtToken, process.env.JWT_SECRET_KEY!);
  } catch {
    return false;
  }

  const decodedJwt = jwt.decode(jwtToken);
  if (!(decodedJwt && typeof decodedJwt === "object" && "id" in decodedJwt))
    return false;

  const userId = decodedJwt.id;
  if (!userId) return false;

  const user = await accountModel.findById(userId);
  console.log("userrrr", user);
  const isAdmin = user ? user.isAdmin : false;

  return isAdmin;
}
