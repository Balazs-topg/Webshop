import React from "react";
import WebsiteHeader from "../components/WebsiteHeader";
import { Spinner } from "@nextui-org/react";

function Loading() {
  // return <WebsiteHeader />;
  return (
    <div className=" absolute flex h-[100dvh] w-full items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}

export default Loading;
