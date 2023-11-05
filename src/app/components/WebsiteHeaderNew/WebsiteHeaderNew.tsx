"use client";
import Link from "next/link";

import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";

import SearchBar from "../WebsiteHeader-subcomponents/searchBar";

import { cookies } from "next/headers";
import getIsLoggedIn from "../../api/utils/getIsLoggedIn";
import getIsLoggedInFrontEndServerSide from "../../(frontend-routes)/utils/getIsLoggedInFrontEndServerSide";
import { useEffect, useState } from "react";
import { getCookie } from "../../(frontend-routes)/utils/manageCookies";

import { webshopContext } from "@/app/Providers";
import { useContext } from "react";


function WebsiteHeader({
  searchValue,
  productCountProp = 0,
  cartCountProp = 0,
}: {
  searchValue?: string;
  productCountProp?: number;
  cartCountProp?: number;
}) {
  // const cookieStore = cookies();
  // const isLoggedIn = getIsLoggedInFrontEndServerSide(cookieStore);
  // const jwt = cookieStore.get("jwt");
  const [webshopContextState, setWebshopContextState] =
    useContext(webshopContext);

  const jwt = getCookie("jwt");
  const [productCount, setProductCount] = useState(0);
  const cartCount = webshopContextState.cartCount;
  let isLoggedIn: boolean = false;
  if (getCookie("jwt")) isLoggedIn = true;

  async function fetchProductCount() {
    try {
      const response = await fetch("http://localhost:3000/api/products/count");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProductCount(data.count);
    } catch (error) {
      console.error("Failed to fetch product count:", error);
      setProductCount(0); // Return a default value or handle the error as appropriate
    }
  }

  async function fetchCartCount() {
    // revalidatePath("/");
    try {
      const response = await fetch(
        "http://localhost:3000/api/cart/get-item-count",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            jwt: isLoggedIn ? jwt! : "",
            isGuest: isLoggedIn ? false : true,
            guestCartId: getCookie("guestCart"),
          },
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setWebshopContextState((prevState: any) => ({
        ...prevState,
        cartCount: data.itemCount,
      }));
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
      setWebshopContextState((prevState: any) => ({
        ...prevState,
        cartCount: 0,
      }));
    }
  }

  useEffect(() => {
    fetchCartCount();
    fetchProductCount();
  }, []);

  return (
    <nav className="sticky top-0 z-10 flex w-full justify-center bg-stone-100 font-poppins">
      <div className="w-full max-w-5xl p-4">
        <div className="flex gap-2 text-3xl font-semibold">
          <Link href="/" className="mr-2 whitespace-nowrap">
            web <span className="text-sky-800">shop</span>
          </Link>
          <SearchBar
            initalValue={searchValue}
            placeholder={`Sök bland ${productCount} produkter`}
          />

          {!isLoggedIn ? (
            <Link
              href={"/login"}
              className="relative flex items-center justify-center rounded-full bg-sky-800 p-2 transition-all active:scale-95 "
            >
              <UserIcon className="h-6 w-6 fill-white" />
            </Link>
          ) : (
            <Link
              className="relative flex items-center justify-center rounded-full bg-sky-800 p-2 transition-all active:scale-95 "
              href={"/view-account"}
            >
              <UserIcon className="h-6 w-6 fill-white" />
            </Link>
          )}
          <Link
            href={"/cart"}
            className="relative flex items-center justify-center rounded-full bg-sky-800 p-2 transition-all active:scale-95 "
          >
            <div className="absolute bottom-0 left-0 ">
              <div
                className={
                  cartCount > 0
                    ? "flex h-5 w-5 origin-center -translate-x-1 translate-y-1 items-center justify-center rounded-full bg-red-500 text-xs font-light text-white transition-all"
                    : "flex h-5 w-5 origin-center -translate-x-1 translate-y-1 scale-0 items-center justify-center rounded-full bg-red-500 text-xs font-light text-white transition-all"
                }
              >
                {cartCount > 0 && cartCount}
              </div>
            </div>
            <ShoppingCartIcon className="h-6 w-6 fill-white" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default WebsiteHeader;
