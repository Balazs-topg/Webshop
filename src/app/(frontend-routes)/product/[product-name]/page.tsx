import React from "react";
import WebsiteHeader from "@/app/components/WebsiteHeader";
import ProductModel from "@/app/api/models/ProductModel";
import Image from "next/image";
import "../../../api/utils/connectToDB";
import { Ripples } from "react-ripples-continued";
import BrandModel from "@/app/api/models/BrandModel";

export default async function Page({
  params,
}: {
  params: { "product-name": string };
}) {
  const productName = decodeURIComponent(params["product-name"]);
  const product = await ProductModel.findOne({ name: productName });
  const brand = await BrandModel.findById("" + product.brand);
  product.brandName = brand.name;
  // product.map(async (product) => {
  //   const frozenProduct = { ...product };
  //   const brandName = await brandModel.findById("" + product.brand);
  //   frozenProduct._doc.brandName = brandName.name;
  //   return frozenProduct;
  // });

  return (
    <>
      <WebsiteHeader />
      <div className="mx-auto mt-4 max-w-4xl p-4">
        <div className="flex w-full flex-col items-stretch gap-10 sm:flex-row">
          <div className="flex-1">
            <Image
              className="w-full rounded-xl bg-stone-100 p-2 mix-blend-multiply"
              src={product.imgs[0]}
              alt="picture of product"
              width={200}
              height={0}
            />
          </div>
          <div className="flex flex-1 shrink-0 flex-col">
            <div className="flex flex-col items-start whitespace-nowrap">
              <h2 className="text-2xl font-bold text-sky-800">
                {product.brandName}
              </h2>
              <h1 className="text-4xl font-semibold">{product.name}</h1>
            </div>
            <div className="text-2xl font-semibold">{product.price}:-</div>
            <button className="relative flex items-center justify-center overflow-hidden rounded-full bg-sky-800 px-6 py-2 font-medium uppercase text-white transition-all active:scale-95">
              Köp
              <Ripples opacity={0.5} duration={700} optimize />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
