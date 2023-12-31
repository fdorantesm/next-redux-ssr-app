import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";
import { MeUserSuccess } from "./types/me-user.success.type";

export async function me(config?: AxiosRequestConfig) {
  const bearer = await getBearerAuth();
  const { data: response } = await apiClient.get<MeUserSuccess>("/auth/me", {
    ...config,
    headers: {
      ...bearer,
      ...config?.headers,
    },
  });

  return response.data;
}
