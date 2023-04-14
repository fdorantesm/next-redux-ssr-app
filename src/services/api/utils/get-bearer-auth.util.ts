import { getTokenFromLocalStorage } from "./get-token.util";

export async function getBearerAuth(): Promise<{ Authorization: string }> {
  const token = await getTokenFromLocalStorage();
  return {
    Authorization: `Bearer ${token}`,
  };
}
