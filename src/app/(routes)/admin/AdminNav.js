"use client";
import { Card, useSelect } from "@nextui-org/react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { Button, Tooltip } from "@nextui-org/react";
import { useState } from "react";

import adminIcons from "./adminIcons";

function TabButton({ name, currentTab }) {
  return (
    <Tooltip
      content={name}
      showArrow={true}
      color="primary"
      placement="right-start"
    >
      <Link href={`./${name}`}>
        <Button
          isIconOnly
          variant={currentTab == name ? "solid" : "flat"}
          color="primary"
        >
          {adminIcons[name]}
        </Button>
      </Link>
    </Tooltip>
  );
}

function AdminNav({ children }) {
  const pathname = usePathname();
  const currentTab = pathname.split("/")[2];

  return (
    <div className="flex">
      <div className="relative">
        <div className="sticky top-0 flex flex-col gap-6 p-4">
          <div className="absolute top-0 left-0 bg-stone-100 h-screen w-full"></div>
          <TabButton currentTab={currentTab} name="home"></TabButton>
          <TabButton currentTab={currentTab} name="products"></TabButton>
          <TabButton currentTab={currentTab} name="users"></TabButton>
          <Tooltip
            content="users"
            showArrow={true}
            color="primary"
            placement="right-start"
          >
            <Button
              isIconOnly
              variant="solid"
              color="primary"
              className=" fixed bottom-5"
            >
              {adminIcons.settings}
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default AdminNav;
