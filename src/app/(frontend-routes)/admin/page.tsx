import { cookies } from "next/headers";
import accountModel from "@/app/api/models/accountModel";
import { redirect } from "next/navigation";
import "../../api/utils/connectToDB";
import isPageRequestAdmin from "../utils/isPageRequestAdmin";

export default async function Home() {
  (await isPageRequestAdmin(cookies().getAll()))
    ? redirect("./admin/home")
    : redirect("/admin/access-denied");
}
