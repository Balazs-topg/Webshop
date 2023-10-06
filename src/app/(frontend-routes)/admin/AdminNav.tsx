"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Tooltip } from "@nextui-org/react";
import adminIcons from "./adminIcons";

function TabButton({
  name,
  currentTab,
}: {
  name: "home" | "products" | "users";
  currentTab: "home" | "products" | "users";
}) {
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

function AdminNav({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname == null) return <div>check usePathname</div>;
  const currentTab = pathname
    ? (pathname.split("/")[2] as "home" | "products" | "users")
    : "home";

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
