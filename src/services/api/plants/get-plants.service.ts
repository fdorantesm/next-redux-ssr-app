import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";
import { GetPlantSuccessResponse } from "./types/get-plant.type";
import { Plant } from "src/types/plant.type";

export async function getPlants(config?: AxiosRequestConfig): Promise<Plant[]> {
  const bearer = await getBearerAuth();
  const settings = {
    ...config,
    headers: {
      ...bearer,
      ...config?.headers,
    },
  };

  const { data: response } = await apiClient.get<GetPlantSuccessResponse>(
    "/v1/plants",
    settings
  );

  return response.data;
}
