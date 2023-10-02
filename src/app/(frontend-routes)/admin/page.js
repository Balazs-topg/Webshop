import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import accountModel from "@/app/api/models/accountModel";
import { redirect } from "next/navigation";
import "../../api/utils/connectToDB";

export default async function Home() {
  const cookiesAll = cookies().getAll();
  let requestJwt, decodedJwt, userId, user, isAdmin;
  try {
    requestJwt = cookiesAll.find((cookie) => cookie.name === "jwt").value;
    decodedJwt = jwt.decode(requestJwt);
    userId = decodedJwt.id;
    user = await accountModel.findById(userId);
    isAdmin = user.isAdmin;
  } catch {}

  if (isAdmin) {
    redirect("./admin/home", "push");
  }

  redirect("./admin/access-denied", "push");
}
