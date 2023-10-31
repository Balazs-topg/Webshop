"use client";
import { Card, useSelect } from "@nextui-org/react";
import Link from "next/link";
import AdminNav from "../AdminNav";
import WebsiteHeader from "../../../components/WebsiteHeader";

export default function Home() {
  return (
    <div className=" font-poppins">
      <WebsiteHeader></WebsiteHeader>
      <div className="flex">
        <AdminNav></AdminNav>
        <div className="mx-auto w-full max-w-xl">
          <h1 className=" p-8 text-center text-3xl font-semibold">
            Welcome back Admin!
          </h1>
        </div>
      </div>
    </div>
  );
}
