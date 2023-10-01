"use client";
import React from "react";
import WebsiteHeader from "@/app/components/WebsiteHeader";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

function Page() {
  return (
    <>
      <WebsiteHeader />
      <div className=" max-w-lg mx-auto p-6 space-y-4">
        <h1 className="text-3xl font-semibold text-sky-800">Logga in</h1>
        <Input
          className="overflow-hidden rounded-xl"
          variant="bordered"
          label="Email"
        ></Input>
        <Input
          className="overflow-hidden rounded-xl"
          variant="bordered"
          label="Lösenord"
        ></Input>
        <Button size="lg" color="primary" fullWidth>
          Logga in
        </Button>
        <p>
          Är du inte registerad?{" "}
          <Link className="text-sky-800 font-semibold" href="./signup">
            registrera dig här
          </Link>
        </p>
      </div>
    </>
  );
}

export default Page;
