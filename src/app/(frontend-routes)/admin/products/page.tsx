"use client";
import ProductsPage from "./ProductsPage";
import React, { createContext, useState } from "react";

interface adminContextType {
  state: any;
  setState: Function;
}

export const AdminProductsPageContext = createContext<adminContextType>({
  state: undefined,
  setState: () => {},
});

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
