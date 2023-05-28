import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Reducer } from "../reducers.enum";
import { AuthState } from "src/store/types/auth-state.type";

const initialState: AuthState = { token: null };

const authSlice = createSlice({
  name: Reducer.AUTH,
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    removeToken(state) {
      state.token = null;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
