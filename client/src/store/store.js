import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import admindProductsSlice from './admin/product-slice'
import shopProductsSlice from './shop/product-slice'
import shopCartSlice from './shop/cart-slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts : admindProductsSlice,
    shopProducts:shopProductsSlice,
    shopCart : shopCartSlice
  },
});


export default store;