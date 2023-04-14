import { CartItem } from "src/types/cart-item.type";

export function getCartItemIdByTicket(
  items: CartItem[],
  raffleId: string,
  reference: string
): string | undefined {
  const item = items.find(
    (item) => item.raffleId === raffleId && item.reference === reference
  );

  if (item) {
    return item?.id;
  }
}
