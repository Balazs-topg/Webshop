import React from "react";
import Search from "./Search";
import getIsLoggedInFrontEndServerSide from "../utils/getIsLoggedInFrontEndServerSide";
import { cookies } from "next/headers";

function Page() {
  const cookieJar = cookies();
  const isLoggedIn = getIsLoggedInFrontEndServerSide(cookieJar);
  return (
    <>
      <Search isLoggedIn={isLoggedIn} />
    </>
  );
}

export default Page;
