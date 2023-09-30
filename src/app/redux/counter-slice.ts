import { createSlice } from "@reduxjs/toolkit";

const initialState = { count: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addCount: (state, action) => {
      state.count = action.payload;
    },
    resetCounter: (state, action) => initialState,
  },
});

const counterReducer = counterSlice.reducer;
export default counterReducer;
export const { addCount, resetCounter } = counterSlice.actions;
