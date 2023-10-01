import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counterSlice";
import cartReducer from "./userInfo";

const preloadedState = {
  counter: 5,
  cart: { items: [], totalValue: 0 },
};

const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
  },
  preloadedState,
});

export default store;
