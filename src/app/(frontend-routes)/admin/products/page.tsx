"use client";
import AdminNav from "../AdminNav";
import WebsiteHeader from "../../../components/WebsiteHeader";

import EditOrAddProduct from "./components/EditOrAddProduct";

import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import adminIcons from "../adminIcons";

import { getCookie } from "../../utils/manageCookies";

import { ProductType } from "@/app/types/ProductType";

export default function Home() {
  const [displayProducts, setDisplayProducts] = useState([]);

  async function getProducts() {
    const response = await fetch("/api/products/get", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        jwt: getCookie("jwt")!,
      },
    });
    const data = await response.json();
    setDisplayProducts(data);
  }

  async function removeProduct(id: string) {
    const response = await fetch(`/api/products/${id}/remove`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        jwt: getCookie("jwt")!,
      },
    });
    getProducts();
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className=" font-poppins">
        <WebsiteHeader />
        <div className="flex">
          <AdminNav />
          <div className="w-full p-4 space-y-4 max-w-2xl mx-auto">
            <div className="w-full">
              <EditOrAddProduct isNew updateParent={getProducts} />
            </div>
            <div className=" rounded-2xl bg-stone-100 p-4 space-y-2">
              {displayProducts
                ? displayProducts.map((product: ProductType, index) => {
                    return (
                      <div
                        className=" bg-white rounded-lg py-2 px-4 flex items-center justify-between"
                        key={product._id}
                      >
                        <div>{product.name}</div>
                        <div className="flex gap-3">
                          <EditOrAddProduct
                            brand={product.brand}
                            name={product.name}
                            price={product.price}
                            imageUrl={product.imgs}
                            category={product.category}
                            tags={product.tags}
                            productId={product._id}
                            updateParent={getProducts}
                          />
                          <Button
                            size="sm"
                            isIconOnly
                            color="danger"
                            onClick={() => {
                              if (
                                confirm(
                                  `Are you sure you want to remove ${product.name}?`
                                )
                              ) {
                                removeProduct(product._id);
                              }
                            }}
                          >
                            {adminIcons.trash}
                          </Button>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
