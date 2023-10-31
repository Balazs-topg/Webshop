"use client";
import React, { ReactEventHandler, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";

interface SearchBar {
  isInFocus?: boolean;
  onSearch: Function;
  placeholder?: string;
  initalValue?: string;
}

function SearchBar({
  isInFocus = false,
  initalValue = "",
  onSearch = () => {
    console.log("searching");
  },
  placeholder = "placeholder",
}: SearchBar) {
  const [isInFocusState, setIsInFocusState] = useState(isInFocus);
  const [inputValue, setInputValue] = useState(initalValue);
  const [keepLeft, setKeepLeft] = useState(!!initalValue);
  const refInput = useRef<HTMLInputElement>(null);

  return (
    <div
      tabIndex={0}
      className={
        isInFocusState
          ? "group relative flex w-full cursor-text items-center overflow-hidden rounded-full border-2 border-primary px-4 py-2 text-sm font-medium"
          : "group relative flex w-full cursor-text items-center overflow-hidden rounded-full border-2 px-4 py-2 text-sm font-medium"
      }
      // placeholder="Search This Website"
      onFocus={() => {
        setIsInFocusState(true);
        setKeepLeft(true);
        refInput.current?.focus();
      }}
      onBlur={() => {
        setIsInFocusState(false);
        if (inputValue.length === 0) setKeepLeft(false);
      }}
    >
      <div
        className={
          keepLeft
            ? "relative ml-[0%] -translate-x-[0%]  transition-all"
            : "relative ml-[50%] -translate-x-[50%] transition-all"
        }
      >
        {/* just a "ghost element"*/}
        <div className="flex w-full gap-2 whitespace-nowrap">
          <div className="flex items-center justify-center">
            <MagnifyingGlassIcon
              stroke="rgb(148 163 184)"
              className="heroicon-sw-2 h-5 w-5"
            />
          </div>
          <span style={{ whiteSpace: "pre" }}>
            {inputValue.length == 0 ? placeholder : inputValue}
          </span>
        </div>
        {/* the real element*/}
        <div className="absolute left-0 top-0 flex w-full gap-2">
          <div className="flex items-center justify-center">
            <MagnifyingGlassIcon
              stroke={inputValue.length == 0 ? "rgb(148 163 184)" : "black"}
              className={
                keepLeft
                  ? "heroicon-sw-2 h-5 w-5 transition-all"
                  : "heroicon-sw-2 h-5 w-5 transition-all"
              }
            />
          </div>
          <input
            ref={refInput}
            type="text"
            className="placeholder:text-base-400 w-full bg-stone-100 outline-none transition-all"
            placeholder={placeholder}
            value={inputValue}
            onInput={(e: any) => {
              setInputValue(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch(inputValue);
            }}
          />
        </div>
      </div>
    </div>
  );
}

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
