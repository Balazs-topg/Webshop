"use client";
import AdminNav from "../AdminNav";
import WebsiteHeader from "../../../components/WebsiteHeader";

import EditOrAddProduct from "./components/EditOrAddProduct";

import { Button } from "@nextui-org/react";
import { useEffect, useState, useContext } from "react";
import adminIcons from "../adminIcons";

import { getCookie } from "../../utils/manageCookies";
import { ProductType } from "@/app/types/ProductType";

import { AdminProductsPageContext } from "./AdminProductsPageContext";

export default function ProductsPage() {
  const productsPageContext = useContext(AdminProductsPageContext);
  const contextState = productsPageContext.state;
  const contextSetState = productsPageContext.setState;
  const [displayProducts, setDisplayProducts] = useState([]);

  //get values for the context
  async function getBrandsList() {
    const response = await fetch("/api/products/brands/get", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        jwt: getCookie("jwt")!,
        isGuest: false,
      },
    });
    const data = await response.json();

    contextSetState((prevState: any) => ({
      ...prevState,
      fetchedBrandsList: data,
    }));
  }
  async function getCategoryList() {
    const response = await fetch("/api/products/categories/get", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        jwt: getCookie("jwt")!,
        isGuest: false,
      },
    });
    const data = await response.json();
    contextSetState((prevState: any) => ({
      ...prevState,
      fetchedCategoryList: data,
    }));
  }
  async function getTagsList() {
    const response = await fetch("/api/products/tags/get", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        jwt: getCookie("jwt")!,
        isGuest: false,
      },
    });
    const data = await response.json();
    contextSetState((prevState: any) => ({
      ...prevState,
      fetchedTagsList: data,
    }));
  }
  useEffect(() => {
    getBrandsList();
    getCategoryList();
    getTagsList();

    getProducts();
    //add these functions to the context state
    contextSetState((prevState: any) => ({
      ...prevState,
      getBrandsList,
      getCategoryList,
      getTagsList,
    }));
  }, []);

  async function getProducts() {
    const response = await fetch("/api/products/get", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        jwt: getCookie("jwt")!,
        isGuest: false,
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
        isGuest: false,
      },
    });
    getProducts();
  }

  return (
    <div className="font-poppins">
      {/* <WebsiteHeader /> */}
      <div className="flex">
        <AdminNav />
        <div className="mx-auto w-full max-w-2xl space-y-4 p-4">
          <div className="w-full">
            <EditOrAddProduct isNew updateParent={getProducts} />
          </div>
          <div className=" space-y-2 rounded-2xl bg-stone-100 p-4">
            {displayProducts
              ? displayProducts.map((product: ProductType, index) => {
                  return (
                    <div
                      className=" flex items-center justify-between rounded-lg bg-white px-4 py-2"
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
                                `Are you sure you want to remove ${product.name}?`,
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
  );
}
