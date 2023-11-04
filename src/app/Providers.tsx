"use client";
import React, { createContext, useEffect, useState } from "react";

import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import { getCookie } from "./(frontend-routes)/utils/manageCookies";
import { setCookie } from "./(frontend-routes)/utils/manageCookies";

type childrenType = {
  children: React.ReactNode;
};

// function Providers({ children }: childrenType) {
//   return <ReduxProvider store={store}>{children}</ReduxProvider>;
// }
// export default Providers;

export const webshopContext = createContext<any>(null);

function Providers({ children }: childrenType) {
  const [webshopContextState, setwebshopContextState] = useState({
    cartCount: 0,
  });

  const setGuestCart = async () => {
    if (!getCookie("guestCart")) {
      const response = await fetch("http://localhost:3000/api/guest-cart", {
        method: "post",
      });
      const data = await response.json();
      const newCartId = data.cartId;
      setCookie("guestCart", newCartId);
    }
  };

  useEffect(() => {
    setGuestCart();
  }, []);

  return (
    <webshopContext.Provider
      value={[webshopContextState, setwebshopContextState]}
    >
      {children}
    </webshopContext.Provider>
  );
}

export default Providers;
