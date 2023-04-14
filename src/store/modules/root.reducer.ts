import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./slices/auth.slice";
import cartSlice from "./slices/cart.slice";
import couponSlice from "./slices/coupon.slice";

export const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  coupon: couponSlice,
});
