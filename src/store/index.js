import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/product";

const store = configureStore({
  reducer: productReducer,
});

export default store;
