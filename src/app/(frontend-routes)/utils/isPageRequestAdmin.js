import jwt from "jsonwebtoken";
import accountModel from "@/app/api/models/accountModel";
import "../../api/utils/connectToDB";

export default async function isPageRequestAdmin(allCookies) {
  let requestJwt;
  try {
    requestJwt = allCookies.find((cookie) => cookie.name === "jwt").value;
  } catch {
    return false;
  }

  const userId = jwt.decode(requestJwt).id;
  const user = await accountModel.findById(userId);
  const isAdmin = user ? user.isAdmin : false;

  return isAdmin;
}
