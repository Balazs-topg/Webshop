"use client";
import React, { useRef, useState, useEffect } from "react";
import WebsiteHeader from "@/app/components/WebsiteHeader";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeCookie } from "../../utils/manageCookies";

function Page() {
  const router = useRouter();

  useEffect(() => {
    try {
      const userInfo = localStorage.getItem("userInfo");
      if (!(userInfo !== null && JSON.parse(userInfo))) {
        router.push("./view-account");
      }
    } catch {}
  }, [router]);

  const storedUserInfo = localStorage.getItem("userInfo");
  const parsedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
  const initialUsername = parsedUserInfo ? parsedUserInfo.username : "";
  const [username, setUsername] = useState(initialUsername);

  return (
    <>
      <WebsiteHeader />
      <div className=" max-w-lg mx-auto p-6 space-y-4">
        <h1 className="text-3xl font-semibold text-sky-800">
          Du är inloggad som {username}
        </h1>
        <Button
          size="lg"
          color="primary"
          fullWidth
          onClick={() => {
            localStorage.removeItem("jwt");
            removeCookie("jwt");
            localStorage.removeItem("userInfo");
            router.push("./login");
          }}
        >
          Logga ut
        </Button>
      </div>
    </>
  );
}

export default Page;
