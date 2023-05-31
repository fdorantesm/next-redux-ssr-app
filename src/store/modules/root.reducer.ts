import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./slices/auth.slice";
import userSlice from "./slices/user.slice";

export const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
});
