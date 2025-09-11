import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import admindProductsSlice from './admin/product-slice'
import shopProductsSlice from './shop/product-slice'
import shopCartSlice from './shop/cart-slice'
import shopAddresstSlice from './shop/adress-slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts : admindProductsSlice,
    shopProducts:shopProductsSlice,
    shopCart : shopCartSlice,
    shopAddress:shopAddresstSlice
    
  },
});


export default store;