import { Plant } from "./plant.type";

export type Ranch = {
  uuid: string;
  name: string;
  description: string;
  harvestDate: string;
  harvestMonths: number;
  seedDate: Date;
  isActive: boolean;
  plants?: Plant[];
  plantWeight: number;
  plantKilogramSalesPrice: number;
  fee: number;
};
