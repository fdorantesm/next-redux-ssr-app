import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";
import { GetSettingsSuccessResponse } from "./types/get-settings.success.response";
import { Settings } from "src/types/settings.type";

export async function getSettings(
  config?: AxiosRequestConfig
): Promise<Settings> {
  const bearer = await getBearerAuth();
  const settings = {
    ...config,
    headers: {
      ...bearer,
      ...config?.headers,
    },
  };

  const { data: response } = await apiClient.get<GetSettingsSuccessResponse>(
    "/v1/settings",
    settings
  );

  return response.data;
}
