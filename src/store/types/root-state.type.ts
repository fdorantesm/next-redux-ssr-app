import { AuthState } from "./auth-state.type";
import { CartState } from "./cart-state.type";
import { CouponState } from "./coupon-state.type";

export type RootState = {
  auth: AuthState;
  cart: CartState;
  coupon: CouponState;
};
