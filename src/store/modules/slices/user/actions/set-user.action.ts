import { PayloadAction } from '@reduxjs/toolkit';

import { User } from 'src/store/types/user.type';

export function setUser(state: User, action: PayloadAction<string>) {
  state.uuid = action.payload;
}
