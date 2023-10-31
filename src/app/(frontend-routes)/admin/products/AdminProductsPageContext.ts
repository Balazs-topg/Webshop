interface adminContextType {
  state: any;
  setState: Function;
}

import { createContext } from "react";
export const AdminProductsPageContext = createContext<adminContextType>({
  state: undefined,
  setState: () => {},
});
