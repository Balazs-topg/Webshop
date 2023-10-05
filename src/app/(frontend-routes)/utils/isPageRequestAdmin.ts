import jwt from "jsonwebtoken";
import accountModel from "@/app/api/models/accountModel";
import "../../api/utils/connectToDB";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default async function isPageRequestAdmin(allCookies: RequestCookie[]) {
  if (!allCookies) return false;

  const jwtCookie = String(
    allCookies.find((cookie) => cookie.name === "jwt")?.value
  );
  if (!jwtCookie) return false;

  const decodedJwt = jwt.decode(jwtCookie);
  console.log("decodedJwt: ", decodedJwt);
  if (!(decodedJwt && typeof decodedJwt === "object" && "id" in decodedJwt))
    return false;
  const userId = decodedJwt.id;
  console.log("isPageRequestAdmin called");
  if (!userId) return false;

  const user = await accountModel.findById(userId);
  const isAdmin = user ? user.isAdmin : false;

  return isAdmin;
}
