"use client";
import WebsiteHeader from "../../components/WebsiteHeader";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

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
