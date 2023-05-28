import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";

export async function me(config?: AxiosRequestConfig) {
  const bearer = await getBearerAuth();
  const response = await apiClient.get("/auth/me", {
    ...config,
    headers: {
      ...bearer,
      ...config?.headers,
    },
  });

  return response.data;
}
