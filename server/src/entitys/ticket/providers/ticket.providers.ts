import { Ticket } from "../entity/ticket.entity";

export const ticketProviders = [
    {
        provide: 'TICKET_REPOSITORY',
        useValue: Ticket,
    }
]