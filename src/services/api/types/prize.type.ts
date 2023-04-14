import { PrizeImage } from "./prize-image.type";

export type Prize = {
  uuid: string;
  name: string;
  description: string;
  images: PrizeImage[];
};
