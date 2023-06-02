import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Reducer } from "../reducers.enum";
import { LayoutState } from "src/store/types/layout-state.type";

const initialState: LayoutState = { isLoading: false };

const layoutSlice = createSlice({
  name: Reducer.LAYOUT,
  initialState,
  reducers: {
    setLoader(state: LayoutState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoader } = layoutSlice.actions;
export default layoutSlice.reducer;
