"use client";
import React, { ReactEventHandler, useState } from "react";
import WebsiteHeader from "@/app/components/WebsiteHeader";
import WebsiteFooter from "@/app/components/WebsiteFooter";
import addSpacesForPrice from "../utils/addSpacesForPrice";
import adminIcons from "../admin/adminIcons";

import { Ripples } from "react-ripples-continued";

interface CartItemInterface {
  name: string;
  price: number;
  img: string;
  brand: string;
  count: number;
}

function CartItem({ name, price, img, brand, count }: CartItemInterface) {
  const [productCount, setProductCount] = useState(0);

  return (
    <div className="pb-2 px-2 flex gap-2 border-b-2 border-stone-100 rounded-lg">
      <div className="w-24 aspect-square rounded-sm overflow-hidden flex">
        <img src={img} alt="" />
      </div>
      <div className="flex flex-col">
        <strong className="text-sky-800 font-semibold text-sm">{brand}</strong>
        <strong className="font-medium mb-auto">{name}</strong>
        <strong className="font-bold text-sky-800">
          {addSpacesForPrice(price * count)} kr
        </strong>
      </div>
      <div className="ml-auto flex flex-col items-end">
        <div className="mb-auto flex gap-1">
          <button className="active:scale-95 transition-all relative overflow-hidden bg-stone-100 p-1 rounded-full flex justify-center items-center">
            {adminIcons.trash}
            <Ripples fillAndHold color="gray" opacity={0.5} optimize />
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <button className="active:scale-95 transition-all w-8 h-8  relative overflow-hidden bg-stone-100 p-1 rounded-full flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
            <Ripples fillAndHold color="gray" opacity={0.5} optimize />
          </button>

          <div className="ml-auto bg-stone-100 rounded-full p-1 flex gap-1 text-lg font-semibold">
            <button
              onClick={() => setProductCount(productCount - 1)}
              className="relative select-none overflow-hidden bg-white rounded-full w-8 h-8 flex items-center justify-center hover:shadow active:scale-95 transition-all"
            >
              -
              <Ripples fillAndHold color="gray" opacity={0.5} optimize />
            </button>
            <input
              type="number"
              className="w-10 flex justify-center text-center bg-stone-100 outline-none"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                setProductCount(+e.currentTarget.value);
              }}
              value={productCount}
            />
            <button
              onClick={() => setProductCount(productCount + 1)}
              className="relative select-none overflow-hidden bg-white rounded-full w-8 h-8 flex items-center justify-center hover:shadow active:scale-95 transition-all"
            >
              +
              <Ripples fillAndHold color="gray" opacity={0.5} optimize />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const tempImg =
  "https://external-preview.redd.it/inWIpQ4kwOsX0RsF1RMqDSWiX1YnQlPYUqa4zEFU5m8.jpg?auto=webp&s=2a13426c7340d7b08cc24b101129e1fd5a2eff28";

function Page() {
  return (
    <>
      <WebsiteHeader />
      <div className="max-w-lg min-h-screen mx-auto p-6 space-y-4">
        <h1 className="text-3xl font-semibold text-sky-800 flex">
          Kundvagn <span className="ml-auto opacity-50">(99)</span>
        </h1>
        <div className="rounded-lg mt-4 flex flex-col gap-2">
          <CartItem
            name="andre tate"
            price={10000}
            img={tempImg}
            brand={"Adidas"}
            count={1}
          />
          <CartItem
            name="andre tate"
            price={10000}
            img={tempImg}
            brand={"Adidas"}
            count={1}
          />
          <CartItem
            name="andre tate"
            price={10000}
            img={tempImg}
            brand={"Adidas"}
            count={1}
          />
          <CartItem
            name="andre tate"
            price={10000}
            img={tempImg}
            brand={"Adidas"}
            count={1}
          />
          <div className="px-2 mt-2 gap-2 border-stone-100 font-semibold flex justify-between">
            Total summa:
            <span>{1000} kr</span>
          </div>
        </div>
        <button className="bg-sky-800 outline-offset-4 rounded-sm w-full p-3 text-white active:scale-[0.97] transition-all relative overflow-hidden">
          Till kassan
          <Ripples fillAndHold opacity={0.5} optimize />
        </button>
      </div>
      <WebsiteFooter />
    </>
  );
}

export default Page;
