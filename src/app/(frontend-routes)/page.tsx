"use client";
import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import WebsiteHeader from "../components/WebsiteHeader";

function CategoryBtn({
  title,
  isLoading,
}: {
  title?: string;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <button className=" bg-white relative overflow-hidden px-4 py-1 rounded-md text-sm font-medium select-none active:scale-95 transition-all shadow">
        <div className=" absolute top-0 left-0 w-full h-full bg-stone-400 animate-pulse"></div>
        <div className="opacity-0">loading...</div>
      </button>
    );
  }
  return (
    <button className="relative whitespace-nowrap bg-white px-4 py-1 rounded-md text-sm font-medium select-none active:scale-95 transition-all shadow">
      {title}
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
      },
    });
    const data = await response.json();
    setProducts(data);
    console.log(data);
  }

  useEffect(() => {
    getBrandsList();
    getProducts();
  }, []);

  return (
    <div className="font-poppins">
      <WebsiteHeader />
      <div className="flex gap-2 px-4 py-3 bg-stone-200 overflow-auto">
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
            <CategoryBtn isLoading />
            <CategoryBtn isLoading />
            <CategoryBtn isLoading />
          </>
        )}
      </div>
      <div className="p-4 flex items-center gap-2 overflow-scroll selection:bg-sky-200">
        {products.map((product) => {
          return (
            <ItemCard
              key={product._id}
              brandName={product.brand}
              productName={product.name}
              imageSrc={product.imgs[0]}
              price={product.price}
              isFavourite={false}
              isInstock={true}
            ></ItemCard>
          );
        })}
      </div>
    </div>
  );
}
