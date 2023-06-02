import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";

export async function deletePartner(
  uuid: string,
  config?: AxiosRequestConfig
): Promise<void> {
  const bearer = await getBearerAuth();
  const settings = {
    ...config,
    headers: {
      ...bearer,
      ...config?.headers,
    },
  };

  await apiClient.delete(`/v1/partners/${uuid}`, settings);

  return undefined;
}
