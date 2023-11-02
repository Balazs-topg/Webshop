"use client";
import React, { createContext, useState } from "react";

import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";

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
  return (
    <webshopContext.Provider
      value={[webshopContextState, setwebshopContextState]}
    >
      {children}
    </webshopContext.Provider>
  );
}

export default Providers;
