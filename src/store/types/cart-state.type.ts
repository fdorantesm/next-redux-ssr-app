import { CartItem } from "src/types/cart-item.type";

export type CartState = {
  key: string;
  items: CartItem[];
  total: number;
  discount: number;
};
