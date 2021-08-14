import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.carts = [...state.carts, ...action.payload];
    },
    addToCart: (state, action) => {
      state.carts.forEach((cart, index) => {
        if (cart.foodId === action.payload[0].foodId) {
          state.carts[index] = {
            ...state.carts[index],
            quantity: state.carts[index].quantity + 1,
          };
          return;
        }
      });
      state.carts = [...state.carts, ...action.payload];
    },
    removeCart: (state, action) => {},
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
