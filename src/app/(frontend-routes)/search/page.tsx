"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import WebsiteHeader from "@/app/components/WebsiteHeader";
import WebsiteFooter from "@/app/components/WebsiteFooter";
import ItemCard from "@/app/components/ItemCard";
import { ProductType } from "@/app/types/ProductType";
import { getCookie } from "../utils/manageCookies";

function Page() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q") || "none";

  const [fetchedSearchResults, setFetchedSearchResults] = useState([]);
  const [searchComplete, setSearchComplete] = useState(false);

  const getSearchResults = async (search: string) => {
    setSearchComplete(false);
    const response = await fetch(`/api/products/search/${search}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        jwt: getCookie("jwt")!,
      },
    });
    const data = await response.json();
    setFetchedSearchResults(data);
    setSearchComplete(true);
  };
  useEffect(() => {
    getSearchResults(search);
  }, [search]);

  return (
    <>
      <WebsiteHeader searchValue={search} />
      <div className=" min-h-screen">
        <div className="bg-stone-200">
          <h2 className=" text-center p-2">Visar sökresultat för {search}</h2>
        </div>
        <div className="flex gap-4 p-4 overflow-x-auto overflow">
          {searchComplete && fetchedSearchResults.length === 0 && (
            <h2 className=" w-full text-center p-2">
              vi hittade tyvärr inget 😔
            </h2>
          )}
          {!searchComplete && (
            <>
              <ItemCard isSkeleton />
              <ItemCard isSkeleton />
              <ItemCard isSkeleton />
              <ItemCard isSkeleton />
              <ItemCard isSkeleton />
            </>
          )}
          {fetchedSearchResults.map((product: ProductType) => {
            return (
              <ItemCard
                key={product._id}
                brandName={product.brandName}
                productName={product.name}
                imageSrc={product.imgs[0]}
                price={product.price}
                isInstock={false}
                isFavourite={product.isFavourite}
                id={product._id}
              />
            );
          })}
        </div>
      </div>
      <WebsiteFooter />
    </>
  );
}

export default Page;
