import React from "react";
import WebsiteHeader from "@/app/components/WebsiteHeader";

function page() {
  return (
    <>
      <WebsiteHeader />
      <div className=" w-full flex justify-center items-center">
        <h1 className="text-3xl font-semibold text-sky-800 p-10">
          Du är inte en admin
        </h1>
      </div>
    </>
  );
}

export default page;
