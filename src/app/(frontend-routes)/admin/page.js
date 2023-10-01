"use client";
import { Card, useSelect } from "@nextui-org/react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "@nextui-org/react";
import AdminNav from "./AdminNav";
import { useRouter } from "next/navigation";
import WebsiteHeader from "../../components/WebsiteHeader";

export default function Home() {
  const router = useRouter();

  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter);
  const cart = useSelector((state) => state.cart);

  return (
    <>
      <WebsiteHeader />
      <div className=" w-full flex justify-center items-center">
        <div className=" max-w-2xl space-y-4">
          <h1></h1>
          <Input label="username"></Input>
          <Input label="password"></Input>
          <Button fullWidth color="primary" size="lg">
            Log in to dashboard
          </Button>
        </div>
      </div>
    </>
  );
}
