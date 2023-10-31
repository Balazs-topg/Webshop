"use client";
import React, { useRef, useState, useEffect } from "react";
import WebsiteHeader from "@/app/components/WebsiteHeader";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeCookie, getCookie } from "../../utils/manageCookies";

function Page() {
  const router = useRouter();
  const [userData, setUserData] = useState();

  const getUserInfo = async (userId: string) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        jwt: getCookie("jwt")!,
      },
    });
    const data = await response.json();
    setUserData(data);
  };

  useEffect(() => {
    try {
      const userInfo = localStorage.getItem("userInfo");
      if (!(userInfo !== null && JSON.parse(userInfo))) {
        router.push("./view-account");
      }
    } catch {}
  }, [router]);

  useEffect(() => {
    try {
      const userInfoFromLocalStorage = localStorage.getItem("userInfo");
      const userInfo = JSON.parse(userInfoFromLocalStorage!);
      getUserInfo(userInfo.id);
    } catch {}
  }, []);

  const storedUserInfo = localStorage.getItem("userInfo");
  const parsedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
  const initialUsername = parsedUserInfo ? parsedUserInfo.username : "";
  const [username, setUsername] = useState(initialUsername);

  return (
    <>
      <WebsiteHeader />
      <div className=" mx-auto max-w-lg space-y-4 p-6">
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
        {userData && userData.isAdmin && (
          <Button
            size="lg"
            color="default"
            fullWidth
            onClick={() => {
              router.push("/admin");
            }}
          >
            Gå till admin panel
          </Button>
        )}
      </div>
    </>
  );
}

export default Page;
