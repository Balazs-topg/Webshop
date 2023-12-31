import "./globals.css";
import { Imprima, Inter } from "next/font/google";
import Providers from "./Providers";
import WebsiteFooter from "./components/WebsiteFooter";
import WebsiteHeader from "./components/WebsiteHeaderNew/WebsiteHeaderNew";
// import WebsiteHeader from "./components/WebsiteHeader";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <WebsiteHeader />
          {children}
          <WebsiteFooter />
        </Providers>
      </body>
    </html>
  );
}
