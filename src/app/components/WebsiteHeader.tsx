"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";

import SearchBar from "./WebsiteHeader-subcomponents/searchBar";

function WebsiteHeader({
  searchValue,
  productCountProp = 0,
  productCountInCart = 0,
}: {
  searchValue?: string;
  productCountProp?: number;
  productCountInCart?: number;
}) {
  const [username, setUsername] = useState("");
  const [productCount, setProductCount] = useState(productCountProp);

  const [currentSearch, setCurrentSearch] = useState(searchValue);

  const fetchCount = async () => {
    const response = await fetch("/api/products/count", { method: "get" });
    const data = await response.json();
    setProductCount(data.count);
  };

  useEffect(() => {
    try {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        if (parsedUserInfo && parsedUserInfo.username) {
          setUsername(parsedUserInfo.username);
        }
      }
    } catch (error) {
      console.error("Error parsing userInfo from localStorage:", error);
    }
    //fetchCount();
  }, []);

  const router = useRouter();

  const handleSearch = (value: string) => {
    console.log(value);
    router.push(`/search?q=${value}`);
  };

  return (
    <nav className=" sticky z-10 flex w-full justify-center bg-stone-100 font-poppins">
      <div className="w-full max-w-5xl p-4">
        <div className="flex gap-2 text-3xl font-semibold">
          <Link href="/" className="mr-2 whitespace-nowrap">
            web <span className="text-sky-800">shop</span>
          </Link>
          <SearchBar
            onSearch={handleSearch}
            initalValue={currentSearch}
            placeholder={`Sök bland ${productCountProp} produkter`}
          />

          {!username ? (
            <button
              onClick={() => {
                router.push("/login");
              }}
              className=" relative flex items-center justify-center rounded-full bg-sky-800 p-2 transition-all active:scale-95"
            >
              <UserIcon className="h-6 w-6 fill-white" />
            </button>
          ) : (
            <button
              onClick={() => {
                router.push("/view-account");
              }}
              className=" relative flex items-center justify-center rounded-full bg-sky-800 p-2 transition-all active:scale-95"
            >
              <UserIcon className="h-6 w-6 fill-white" />
            </button>
          )}
          <button
            onClick={() => {
              router.push("/cart");
            }}
            className="relative flex items-center justify-center rounded-full bg-sky-800 p-2 transition-all active:scale-95"
          >
            <div className="absolute bottom-0 left-0 flex h-5 w-5 -translate-x-1 translate-y-1 items-center justify-center rounded-full bg-red-500 text-xs font-light text-white">
              {productCountInCart}
            </div>
            <ShoppingCartIcon className="h-6 w-6 fill-white" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default WebsiteHeader;
