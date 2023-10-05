"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import WebsiteHeader from "@/app/components/WebsiteHeader";

function Page() {
  return (
    <>
      <WebsiteHeader />
      <div className=" max-w-lg mx-auto p-6 space-y-4 flex justify-center flex-col">
        <h1 className="text-3xl font-semibold text-sky-800 text-center">
          Välkommen till webshop!
          <br /> Nu är du registrerad!
        </h1>
        <Link href={"./"} className=" mx-auto">
          <Button color="primary">Gå hem</Button>
        </Link>
      </div>
    </>
  );
}

export default Page;
