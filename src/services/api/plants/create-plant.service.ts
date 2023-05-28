import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";
import { Plant } from "src/types/plant.type";
import { PlantPayload } from "./types/plant.payload.type";
import { CreatePlantSuccessResponse } from "./types/create-plant.success.response";

export async function createPlant(
  plant: PlantPayload,
  config?: AxiosRequestConfig
): Promise<Plant> {
  const bearer = await getBearerAuth();
  const settings = {
    ...config,
    headers: {
      ...bearer,
      ...config?.headers,
    },
  };

  const { data: response } = await apiClient.post<CreatePlantSuccessResponse>(
    "/v1/plants",
    plant,
    settings
  );

  return response.data;
}
