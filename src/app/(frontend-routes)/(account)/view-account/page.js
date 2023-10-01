"use client";
import React, { useRef, useState } from "react";
import WebsiteHeader from "@/app/components/WebsiteHeader";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  if (!JSON.parse(localStorage.getItem("userInfo")).username) {
    router.push("./login");
  }

  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem("userInfo")).username
  );

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
