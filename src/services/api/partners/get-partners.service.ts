import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";
import { GetPartnersSuccessResponse } from "./type/get-partners.success.response";
import { User } from "src/types/user.type";

export async function getPartners(
  config?: AxiosRequestConfig
): Promise<User[]> {
  const bearer = await getBearerAuth();
  const settings = {
    ...config,
    headers: {
      ...bearer,
      ...config?.headers,
    },
  };

  const { data: response } = await apiClient.get<GetPartnersSuccessResponse>(
    "/v1/partners",
    settings
  );

  return response.data;
}
