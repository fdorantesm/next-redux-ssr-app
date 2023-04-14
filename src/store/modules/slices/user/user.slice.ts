import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../../types/user.type";
import { Reducer } from "../../reducers.enum";

const initialState: User = {
  uuid: "",
  email: "",
  profile: {
    name: "",
    phone: "",
  },
};

const userSlice = createSlice({
  name: Reducer.USER,
  initialState,
  reducers: {
    setUser(state: User, action: PayloadAction<string>) {
      state.uuid = action.payload;
    },
    unsetUser(state: User) {
      state.uuid = null;
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;
export default userSlice.reducer;
