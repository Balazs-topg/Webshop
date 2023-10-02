import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import accountModel from "@/app/api/models/accountModel";
import { redirect } from "next/navigation";
import Home from "./Home";

export default async function page() {
  console.log("bruhhhh");
  const cookiesAll = cookies().getAll();
  const requestJwt = cookiesAll.find((cookie) => cookie.name === "jwt").value;
  const decodedJwt = jwt.decode(requestJwt);
  const userId = decodedJwt.id;
  const user = await accountModel.findById(userId);
  const isAdmin = user.isAdmin;

  if (isAdmin) {
    return <Home />;
  } else {
    redirect("/.admin/access-denied");
  }
}
