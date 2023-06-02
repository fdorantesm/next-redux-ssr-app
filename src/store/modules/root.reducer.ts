import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./slices/auth.slice";
import userSlice from "./slices/user.slice";
import layoutSlice from "./slices/layout.slice";

export const rootReducer = combineReducers({
  layout: layoutSlice,
  auth: authSlice,
  user: userSlice,
});
