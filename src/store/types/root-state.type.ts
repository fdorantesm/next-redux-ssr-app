import { AuthState } from "./auth-state.type";
import { UserState } from "./user-state.type";

export type RootState = {
  auth: AuthState;
  user: UserState;
};
