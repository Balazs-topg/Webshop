"use client";
import React, { ReactEventHandler, useEffect, useState } from "react";
import Link from "next/link";
import { Button, Input } from "@nextui-org/react";
import { Ripples } from "react-ripples-continued";
import { useRouter } from "next/navigation";

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
          <Input
            placeholder={`Sök bland ${productCount} produkter`}
            className="overflow-hidden rounded-full"
            startContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
            }
            radius="full"
            color="primary"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                handleSearch(e.currentTarget.value);
              }
            }}
            variant="faded"
            onInput={(e) => {
              setCurrentSearch(e.currentTarget.value);
            }}
            value={currentSearch}
          ></Input>

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
