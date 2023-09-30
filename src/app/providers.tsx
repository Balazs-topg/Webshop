"use client";
import { NextUIProvider } from "@nextui-org/react";

import { Provider as ReduxProvider } from "react-redux";

import store from "./redux/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <NextUIProvider>{children}</NextUIProvider>
    </ReduxProvider>
  );
}
