import Link from "next/link";

import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";

import SearchBar from "./WebsiteHeader-subcomponents/searchBar";

async function WebsiteHeader({
  searchValue,
  productCountProp = 0,
  productCountInCart = 0,
}: {
  searchValue?: string;
  productCountProp?: number;
  productCountInCart?: number;
}) {
  let username = "username";
  let currentSearch = searchValue;

  let productCount = 0;
  // const response = await fetch("http://localhost:3000/api/products/count", {
  //   method: "get",
  // });
  // const data = await response.json();
  // productCount = data.count;

  // try {
  //   const storedUserInfo = localStorage.getItem("userInfo");
  //   if (storedUserInfo) {
  //     const parsedUserInfo = JSON.parse(storedUserInfo);
  //     if (parsedUserInfo && parsedUserInfo.username) {
  //       username = parsedUserInfo.username;
  //     }
  //   }
  // } catch (error) {
  //   console.error("Error parsing userInfo from localStorage:", error);
  // }

  return (
    <nav className=" sticky z-10 flex w-full justify-center bg-stone-100 font-poppins">
      <div className="w-full max-w-5xl p-4">
        <div className="flex gap-2 text-3xl font-semibold">
          <Link href="/" className="mr-2 whitespace-nowrap">
            web <span className="text-sky-800">shop</span>
          </Link>
          <SearchBar
            initalValue={currentSearch}
            placeholder={`Sök bland ${productCount} produkter`}
          />

          {!username ? (
            <Link
              href={"/login"}
              className=" relative flex items-center justify-center rounded-full bg-sky-800 p-2 transition-all active:scale-95"
            >
              <UserIcon className="h-6 w-6 fill-white" />
            </Link>
          ) : (
            <Link
              className=" relative flex items-center justify-center rounded-full bg-sky-800 p-2 transition-all active:scale-95"
              href={"/view-account"}
            >
              <UserIcon className="h-6 w-6 fill-white" />
            </Link>
          )}
          <Link
            href={"/cart"}
            className="relative flex items-center justify-center rounded-full bg-sky-800 p-2 transition-all active:scale-95"
          >
            <div className="absolute bottom-0 left-0 flex h-5 w-5 -translate-x-1 translate-y-1 items-center justify-center rounded-full bg-red-500 text-xs font-light text-white">
              {productCountInCart}
            </div>
            <ShoppingCartIcon className="h-6 w-6 fill-white" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default WebsiteHeader;
