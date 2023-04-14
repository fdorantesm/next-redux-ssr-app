import { apiClient } from "..";

export async function getCart(uuid?: string): Promise<any> {
  const { data: body } = await apiClient.get<any>(`/v1/cart/${uuid || ""}`);
  return body.data;
}
