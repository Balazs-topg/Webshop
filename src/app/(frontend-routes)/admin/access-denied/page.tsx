import React from "react";
import WebsiteHeader from "@/app/components/WebsiteHeader";

function page() {
  return (
    <>
      <div className=" flex w-full items-center justify-center">
        <h1 className="p-10 text-3xl font-semibold text-sky-800">
          Du är inte en admin
        </h1>
      </div>
    </>
  );
}

export default page;
