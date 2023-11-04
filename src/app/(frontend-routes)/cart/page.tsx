import WebsiteHeader from "@/app/components/WebsiteHeader";
import React from "react";

import Cart from "./Cart";
import getIsLoggedInFrontEndServerSide from "../utils/getIsLoggedInFrontEndServerSide";
import { cookies } from "next/headers";

function Page() {
  const cookieStore = cookies();
  const isLoggedIn = getIsLoggedInFrontEndServerSide(cookieStore);
  return (
    <>
      <Cart isLoggedIn={isLoggedIn} />
    </>
  );
}

export default Page;
