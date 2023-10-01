"use client";
import { Card, useSelect } from "@nextui-org/react";

import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";

import AdminNav from "../AdminNav";

import WebsiteHeader from "../../../components/WebsiteHeader";
import adminIcons from "../adminIcons";

export default function Home() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter);
  const cart = useSelector((state) => state.cart);

  return (
    <div className=" font-poppins">
      <WebsiteHeader></WebsiteHeader>
      <AdminNav></AdminNav>
    </div>
  );
}
