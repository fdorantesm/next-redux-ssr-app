import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";
import { Investment } from "src/types/investment.type";
import { CreateInvestmentSuccessResponse } from "./types/create-investment.success";
import { InvestmentPayload } from "src/types/investment.payload.type";

export async function createInvestment(
  investment: InvestmentPayload,
  config?: AxiosRequestConfig
): Promise<Investment> {
  const bearer = await getBearerAuth();
  const settings = {
    ...config,
    headers: {
      ...bearer,
      ...config?.headers,
    },
  };

  const { data: response } =
    await apiClient.post<CreateInvestmentSuccessResponse>(
      "/v1/investments",
      investment,
      settings
    );

  return response.data;
}
