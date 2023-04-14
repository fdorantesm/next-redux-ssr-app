import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Reducer } from "../reducers.enum";
import { CartState } from "src/store/types/cart-state.type";

const initialState: CartState = {
  key: "",
  items: [],
  total: 0,
  discount: 0,
};

const cartSlice = createSlice({
  name: Reducer.CART,
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<Omit<CartState, "discount">>) {
      state.key = action.payload.key;
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
    setDiscount(state, action: PayloadAction<number>) {
      state.discount = action.payload;
    },
    setCartKey(state, action: PayloadAction<string>) {
      state.key = action.payload;
    },
  },
});

export const { setCartKey, setCart, setDiscount } = cartSlice.actions;
export default cartSlice.reducer;
