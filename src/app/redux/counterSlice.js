// redux/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    incrementBy10: (state) => state + 10,
    decrement: (state) => state - 1,
    decrementBy10: (state) => state - 10,
  },
});

export const { increment, incrementBy10, decrement, decrementBy10 } =
  counterSlice.actions;
export default counterSlice.reducer;
