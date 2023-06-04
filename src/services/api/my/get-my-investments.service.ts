import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";
import { Investment } from "src/types/investment.type";
import { GetMyInvestmentsSuccessResponse } from "./types/get-my-investments.response.type";

export async function getMyInvestments(
  config?: AxiosRequestConfig
): Promise<Investment[]> {
  const bearer = await getBearerAuth();
  const settings = {
    ...config,
    headers: {
      ...bearer,
      ...config?.headers,
    },
  };

  const { data: response } =
    await apiClient.get<GetMyInvestmentsSuccessResponse>(
      "/v1/my/investments",
      settings
    );

  return response.data;
}
