import { Cart } from "src/types/cart.type";
import { apiClient } from "..";
import { CartItemRequestType } from "./types/cart-item.request.type";
import { AddItemResponse } from "./types/add-item.response.type";

export async function addItem(
  slug: string,
  ticket: CartItemRequestType
): Promise<Cart> {
  const { data: body } = await apiClient.post<AddItemResponse>(
    `/v1/cart/${slug}/items`,
    ticket
  );
  return body.data;
}
