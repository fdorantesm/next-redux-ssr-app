import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Reducer } from "../reducers.enum";
import { UserState } from "src/store/types/user-state.type";
import { User } from "src/types/user.type";

const initialState: UserState = {
  uuid: null,
  email: null,
  profile: {
    name: null,
    phone: null,
  },
};

const userSlice = createSlice({
  name: Reducer.USER,
  initialState,
  reducers: {
    setUser(state: UserState, action: PayloadAction<User>) {
      const { uuid, email, profile } = action.payload;
      state.uuid = uuid || null;
      state.email = email || null;
      state.profile = profile || null;
    },
    unsetUser() {
      return initialState;
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;
export default userSlice.reducer;
