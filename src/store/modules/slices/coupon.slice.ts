import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Reducer } from "../reducers.enum";
import { CouponState } from "src/store/types/coupon-state.type";

const initialState: CouponState = {
  code: "",
  description: "",
  discount: 0,
  discountType: "amount",
};

const couponSlice = createSlice({
  name: Reducer.COUPON,
  initialState,
  reducers: {
    setCoupon(state, action: PayloadAction<any>) {
      state.code = action.payload.code;
      state.description = action.payload.description;
      state.discount = action.payload.discount;
      state.discountType = action.payload.discountType;
    },
    removeCoupon(state) {
      state.code = initialState.code;
      state.description = initialState.description;
      state.discount = initialState.discount;
      state.discountType = initialState.discountType;
    },
  },
});

export const { setCoupon, removeCoupon } = couponSlice.actions;
export default couponSlice.reducer;
