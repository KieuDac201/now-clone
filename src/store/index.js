import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/product";
import cartReducer from "../features/cart/cart";

const reducer = {
  product: productReducer,
  cart: cartReducer,
};

const store = configureStore({
  reducer,
});

export default store;
