"use client";
import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import WebsiteHeader from "../components/WebsiteHeader";
import WebsiteFooter from "../components/WebsiteFooter";

import { Ripples } from "react-ripples-continued";
import { getCookie } from "./utils/manageCookies";
import { ProductType } from "../types/ProductType";

function CategoryBtn({
  title,
  isSkeleton,
}: {
  title?: string;
  isSkeleton?: boolean;
}) {
  if (isSkeleton) {
    return (
      <button className=" relative select-none overflow-hidden rounded-md bg-white px-4 py-1 text-sm font-medium transition-all hover:shadow active:scale-95">
        <div className=" absolute left-0 top-0 h-full w-full animate-pulse bg-stone-300"></div>
        <div className="opacity-0">loading...</div>
      </button>
    );
  }
  return (
    <button className="relative select-none whitespace-nowrap rounded-md border-0 px-4 py-1 text-sm font-medium outline-2 outline-offset-2 outline-sky-800 transition-all focus-visible:outline [&>.background]:hover:scale-[1.1] [&>.background]:active:scale-[1]">
      <div className="relative z-[2]">{title}</div>
      <div className="background absolute left-0 top-0 z-[1] h-full w-full rounded-full bg-white transition-all"></div>
      <div className="background absolute left-0 top-0 z-[2] h-full w-full overflow-hidden rounded-full transition-all">
        <Ripples fillAndHold color="black" opacity={0.2} optimize />
      </div>
    </button>
  );
}

export default function Home() {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);

  async function getBrandsList() {
    const response = await fetch("/api/products/categories/get", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setCategory(data);
  }

  async function getProducts() {
    const response = await fetch("/api/products/get", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        jwt: getCookie("jwt")!, //! TODO it acutally can be null tho, if the user isn't logged it, it will be null
      },
    });
    const data = await response.json();
    setProducts(data);
  }

  useEffect(() => {
    getBrandsList();
    getProducts();
  }, []);

  return (
    <>
      <div className="min-h-screen font-poppins">
        <WebsiteHeader />
        <div className="flex gap-2 overflow-auto bg-stone-200 px-4 py-3">
          {category.length > 0 ? (
            category.map((category) => {
              return (
                <div key={category.id}>
                  <CategoryBtn title={category.name} />
                </div>
              );
            })
          ) : (
            <>
              <CategoryBtn isSkeleton />
              <CategoryBtn isSkeleton />
              <CategoryBtn isSkeleton />
            </>
          )}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto overflow-y-hidden p-4 selection:bg-sky-200">
          {products.length > 0 ? (
            products.map((product: ProductType) => {
              return (
                <ItemCard
                  key={product._id}
                  id={product._id}
                  brandName={product.brandName}
                  productName={product.name}
                  imageSrc={product.imgs[0]}
                  price={product.price}
                  isFavourite={product.isFavourite}
                  isInstock={true}
                />
              );
            })
          ) : (
            <>
              <ItemCard isSkeleton />
              <ItemCard isSkeleton />
              <ItemCard isSkeleton />
            </>
          )}
        </div>
      </div>
      <WebsiteFooter />
    </>
  );
}
