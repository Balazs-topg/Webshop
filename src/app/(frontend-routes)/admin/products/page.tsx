"use client";
import ProductsPage from "./ProductsPage";
import React, { createContext, useState } from "react";
import { AdminProductsPageContext } from "./AdminProductsPageContext";

function Page() {
  const [adminContextState, setAdminContextState] = useState();

  return (
    <AdminProductsPageContext.Provider
      value={{ state: adminContextState, setState: setAdminContextState }}
    >
      <ProductsPage />
    </AdminProductsPageContext.Provider>
  );
}

export default Page;
