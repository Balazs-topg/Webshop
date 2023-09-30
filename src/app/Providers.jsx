"use client";
import React from "react";

import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";

function Providers({ children }) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}

export default Providers;
