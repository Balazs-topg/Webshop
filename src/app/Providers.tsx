import React from "react";

import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";

type childrenType = {
  children: React.ReactNode;
};

function Providers({ children }: childrenType) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}

export default Providers;
