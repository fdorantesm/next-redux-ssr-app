import { Plant } from "src/types/plant.type";

export type PlantPayload = Omit<Plant, "uuid">;
