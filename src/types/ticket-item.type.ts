import { Ticket } from "src/services/api/types/ticket.type";

export type TicketItem = Omit<Ticket, "index"> & {
  sold?: boolean;
  selected?: boolean;
};
