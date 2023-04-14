import { CartItem } from "./cart-item.type";

export type Cart = {
  uuid: string;
  items: CartItem[];
  total: number;
};
