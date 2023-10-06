"use client";
import AdminNav from "../AdminNav";
import WebsiteHeader from "../../../components/WebsiteHeader";
import AddProduct from "./AddProduct";

import { useDisclosure } from "@nextui-org/react";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className=" font-poppins">
        <WebsiteHeader></WebsiteHeader>
        <div className="flex">
          <AdminNav></AdminNav>
          <div className="w-full p-4">
            <div className="flex justify-end w-full"></div>
            <AddProduct />
            <div className=" rounded-2xl bg-stone-100 p-4">
              <div>items here</div>
              <div>items here</div>
              <div>items here</div>
              <div>items here</div>
              <div>items here</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
