import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";
import { Settings } from "src/types/settings.type";
import { UpdateSettingsSuccessResponse } from "./types/update-settings.success.response";

export async function updateSettings(
  payload: Omit<Settings, "uuid">,
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

  const { data: response } =
    await apiClient.patch<UpdateSettingsSuccessResponse>(
      "/v1/settings",
      payload,
      settings
    );

  return response.data;
}
