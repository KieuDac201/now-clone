import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.carts = [...action.payload];
    },
    addToCart: (state, action) => {
      let temp = false;
      state.carts.forEach((cart, i) => {
        if (cart?.foodId === action.payload?.foodId) {
          state.carts[i] = { ...cart, quantity: cart.quantity + 1 };
          temp = true;
        }
      });
      if (!temp) {
        state.carts.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCart: (state, action) => {},
  },
});

export const { addToCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
