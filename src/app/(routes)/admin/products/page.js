"use client";
import { Card, useSelect } from "@nextui-org/react";

import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";

import AdminNav from "../AdminNav";

import { Button } from "@nextui-org/react";

import WebsiteHeader from "../../../components/WebsiteHeader";

import adminIcons from "../adminIcons";

import AddProduct from "./AddProduct";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export default function Home() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter);
  const cart = useSelector((state) => state.cart);

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
