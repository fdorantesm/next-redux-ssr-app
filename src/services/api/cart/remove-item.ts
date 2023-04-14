import { Cart } from "src/types/cart.type";
import { apiClient } from "..";
import { RemoveItemResponse } from "./types/remove-item.response.type";

export async function removeItem(key: string, item: string): Promise<Cart> {
  const { data: body } = await apiClient.delete<RemoveItemResponse>(
    `/v1/cart/${key}/items/${item}`
  );
  return body.data;
}
