import { apiClient } from "..";

export async function health(): Promise<void> {
  await apiClient.get("/health");
}
