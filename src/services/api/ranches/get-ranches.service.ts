import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";
import { GetRanchSuccessResponse } from "./types/get-ranches.success.response";
import { Ranch } from "src/types/ranche.type";

export async function getRanches(
  config?: AxiosRequestConfig
): Promise<Ranch[]> {
  const bearer = await getBearerAuth();
  const settings = {
    ...config,
    headers: {
      ...bearer,
      ...config?.headers,
    },
  };

  const { data: response } = await apiClient.get<GetRanchSuccessResponse>(
    "/v1/ranches",
    settings
  );

  return response.data;
}
