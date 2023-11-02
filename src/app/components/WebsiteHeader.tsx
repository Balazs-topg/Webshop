import Link from "next/link";

import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";

import SearchBar from "./WebsiteHeader-subcomponents/searchBar";
import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";
import getIsLoggedIn from "../api/utils/getIsLoggedIn";
import getIsLoggedInFrontEndServerSide from "../(frontend-routes)/utils/getIsLoggedInFrontEndServerSide";

async function WebsiteHeader({
  searchValue,
  productCountProp = 0,
  cartCountProp = 0,
}: {
  searchValue?: string;
  productCountProp?: number;
  cartCountProp?: number;
}) {
  console.log("header is being rerendereddd");
  const cookieStore = cookies();
  const isLoggedIn = getIsLoggedInFrontEndServerSide(cookieStore);
  const jwt = cookieStore.get("jwt");

  const loggedIn = true;
  let currentSearch = searchValue;

  async function fetchProductCount() {
    try {
      const response = await fetch("http://localhost:3000/api/products/count");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.count;
    } catch (error) {
      console.error("Failed to fetch product count:", error);
      return 0; // Return a default value or handle the error as appropriate
    }
  }
  const productCount = await fetchProductCount();

  async function fetchCartCount() {
    // revalidatePath("/");
    try {
      const response = await fetch(
        "http://localhost:3000/api/cart/get-item-count",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            jwt: isLoggedIn ? jwt!.value : "",
          },
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.itemCount;
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
      return 0; // Return a default value or handle the error as appropriate
    }
  }
  const cartCount = await fetchCartCount();
  console.log("productCount", cartCount);

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

          {!loggedIn ? (
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
              {cartCount}
            </div>
            <ShoppingCartIcon className="h-6 w-6 fill-white" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default WebsiteHeader;
