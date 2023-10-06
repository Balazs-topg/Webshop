"use client";
import AdminNav from "../AdminNav";

import WebsiteHeader from "../../../components/WebsiteHeader";

export default function Home() {
  return (
    <div className=" font-poppins">
      <WebsiteHeader></WebsiteHeader>
      <AdminNav></AdminNav>
    </div>
  );
}
