import { Prize } from "./prize.type";
import { Ticket } from "./ticket.type";

export type Raffle = {
  uuid: string;
  name: string;
  price: number;
  ticketsQuantity: number;
  prizeId: string;
  eventUrl: string;
  drawDate: Date;
  status: string;
  ticketBook: Ticket[];
  prize: Prize;
};
