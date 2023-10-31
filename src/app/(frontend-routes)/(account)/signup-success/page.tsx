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
      <div className=" mx-auto flex max-w-lg flex-col justify-center space-y-4 p-6">
        <h1 className="text-center text-3xl font-semibold text-sky-800">
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
