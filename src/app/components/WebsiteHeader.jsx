"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";

function WebsiteHeader() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    try {
      setUsername(JSON.parse(localStorage.getItem("userInfo")).username);
    } catch {}
  }, []);

  const router = useRouter();
  return (
    <nav className=" sticky z-10 w-full bg-stone-100 flex justify-center font-poppins">
      <div className="max-w-5xl w-full p-4">
        <div className="text-3xl font-semibold flex gap-2">
          <Link href="/" className="whitespace-nowrap mr-2">
            web <span className="text-sky-800">shop</span>
          </Link>
          <Input
            placeholder="Sök bland 0 produkter"
            className="overflow-hidden rounded-full"
            startContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
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
            variant="faded"
          ></Input>

          {!username ? (
            <Button
              onClick={() => {
                router.push("/login");
              }}
              isIconOnly
              className=" bg-sky-800 w-10 h-10 flex justify-center items-center rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          ) : (
            <Button
              onClick={() => {
                router.push("/view-account");
              }}
              isIconOnly
              className=" bg-sky-800 w-10 h-10 flex justify-center items-center rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          )}
          <Button
            isIconOnly
            className=" bg-sky-800 w-10 h-10 flex justify-center items-center rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-6 h-6"
            >
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default WebsiteHeader;
