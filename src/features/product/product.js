import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.products = [...state.products, ...action.payload];
    },
  },
});

export const { setProduct, setPrevPage } = productSlice.actions;
export default productSlice.reducer;
