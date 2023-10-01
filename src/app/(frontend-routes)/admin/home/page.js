"use client";
import { Card, useSelect } from "@nextui-org/react";

import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";

import AdminNav from "../AdminNav";

import WebsiteHeader from "../../../components/WebsiteHeader";

export default function Home() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter);
  const cart = useSelector((state) => state.cart);

  return (
    <div className=" font-poppins">
      <WebsiteHeader></WebsiteHeader>
      <div className="flex">
        <AdminNav></AdminNav>
        <div className="w-full mx-auto max-w-xl">
          <h1 className=" text-3xl font-semibold p-8 text-center">
            Welcome back Admin!
          </h1>
        </div>
      </div>
    </div>
  );
}
