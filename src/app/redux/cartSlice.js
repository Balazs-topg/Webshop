import { createSlice } from "@reduxjs/toolkit";

const cartReducer = createSlice({
  name: "cart",
  initialState: { items: [], totalValue: 0 },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      state.totalValue += action.payload.price; // Assuming each item has a 'price' property
    },
  },
});

export const { addToCart } = cartReducer.actions;
export default cartReducer.reducer;
