import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import admindProductsSlice from './admin/product-slice'
import shopProductsSlice from './shop/product-slice'
import shopCartSlice from './shop/cart-slice'
import shopAddressSlice from './shop/address-slice'
import shopOrderSlice from './shop/order-slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts : admindProductsSlice,
    shopProducts:shopProductsSlice,
    shopCart : shopCartSlice,
    shopAddress:shopAddressSlice,
    shopOrder:shopOrderSlice
  },
});


export default store;