import React from "react";
import WebsiteHeader from "@/app/components/WebsiteHeader";
import productModel from "@/app/api/models/productModel";
import Image from "next/image";
import "../../../api/utils/connectToDB";
import { Ripples } from "react-ripples-continued";

export default async function Page({
  params,
}: {
  params: { "product-name": string };
}) {
  const productName = decodeURIComponent(params["product-name"]);
  const product = await productModel.findOne({ name: productName });
  return (
    <>
      <WebsiteHeader />
      <div className="mt-4 p-4 mx-auto max-w-4xl">
        <div className="w-full flex items-stretch flex-col gap-10 sm:flex-row">
          <div className="flex-1">
            <Image
              className="rounded-xl bg-stone-100 p-2 mix-blend-multiply w-full"
              src={product.imgs[0]}
              alt="picture of product"
              width={200}
              height={0}
            />
          </div>
          <div className="flex-1 shrink-0 flex flex-col">
            <div className="whitespace-nowrap flex flex-col items-start">
              <h2 className="font-bold text-2xl text-sky-800">
                {product.brand}
              </h2>
              <h1 className="font-semibold text-4xl">{product.name}</h1>
            </div>
            <div className="font-semibold text-2xl">{product.price}:-</div>
            <button className="active:scale-95 relative overflow-hidden font-medium uppercase bg-sky-800 flex items-center transition-all rounded-full justify-center px-6 py-2 text-white">
              Köp
              <Ripples opacity={0.5} duration={700} optimize />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
