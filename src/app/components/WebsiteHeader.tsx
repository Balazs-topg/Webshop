"use client";
import React, { ReactEventHandler, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button, Input } from "@nextui-org/react";
import { Ripples } from "react-ripples-continued";
import { useRouter } from "next/navigation";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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
        <span className="flex gap-2 whitespace-nowrap">
          <div className="flex items-center justify-center">
            <MagnifyingGlassIcon
              stroke="rgb(148 163 184)"
              className="heroicon-sw- h-5 w-5"
            />
          </div>
          <div>{inputValue.length == 0 ? placeholder : inputValue}</div>
        </span>
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

function WebsiteHeader({ searchValue }: { searchValue?: string }) {
  const [username, setUsername] = useState("");
  const [productCount, setProductCount] = useState(0);

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
    fetchCount();
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
            placeholder={`Sök bland ${productCount} produkter`}
          />

          {!username ? (
            <button
              onClick={() => {
                router.push("/login");
              }}
              className=" relative flex items-center justify-center rounded-full bg-sky-800 p-2 transition-all active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => {
                router.push("/view-account");
              }}
              className=" relative flex items-center justify-center rounded-full bg-sky-800 p-2 transition-all active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          <button
            onClick={() => {
              router.push("/cart");
            }}
            className=" relative flex items-center justify-center rounded-full bg-sky-800 p-2 transition-all active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="h-6 w-6"
            >
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default WebsiteHeader;
