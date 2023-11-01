import type { Metadata } from "next";
import { Inter } from "next/font/google";
import isPageRequestAdmin from "../utils/isPageRequestAdmin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (await isPageRequestAdmin(cookies().getAll())) {
    return <div className={inter.className}>{children}</div>;
  } else {
    redirect("/");
  }
}
