// "use client";
import WebsiteHeader from "@/app/components/WebsiteHeader";
import { Button } from "@nextui-org/react";
import { redirect } from "next/navigation";
import getUserFromCookies from "../../utils/getUserFromCookies";
import { cookies } from "next/headers";
import Link from "next/link";

interface UserData {
  id: string;
  username: string;
  isAdmin: boolean;
  // Add other fields as necessary
}

async function Page() {
  let user;
  try {
    user = await getUserFromCookies();
  } catch {
    redirect("./login");
  }
  // try {
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (!(userInfo !== null && JSON.parse(userInfo))) {
  //     redirect("./view-account");
  //   }
  // } catch {}

  // try {
  //   const userInfoFromLocalStorage = localStorage.getItem("userInfo");
  //   const userInfo = JSON.parse(userInfoFromLocalStorage!);
  //   getUserInfo(userInfo.id);
  // } catch {}

  const logOut = async () => {
    "use server";
    cookies().delete("jwt");
    redirect("./login");
  };

  return (
    <>
      <WebsiteHeader />
      <div className=" mx-auto max-w-lg space-y-4 p-6">
        <h1 className="text-3xl font-semibold text-sky-800">
          Du är inloggad som {user.username}
        </h1>
        <form action={logOut}>
          <Button size="lg" color="primary" type="submit" fullWidth>
            Logga ut
          </Button>
        </form>
        {user.isAdmin && <Link href="./admin">Gå till admin panel</Link>}
      </div>
    </>
  );
}

export default Page;
