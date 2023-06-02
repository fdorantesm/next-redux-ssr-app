import { AuthState } from "./auth-state.type";
import { LayoutState } from "./layout-state.type";
import { UserState } from "./user-state.type";

export type RootState = {
  layout: LayoutState;
  auth: AuthState;
  user: UserState;
};
