import { Controller, Get } from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { Ticket } from "./entity/ticket.entity";

@Controller()
export class TicketController {
    constructor(private ticketService: TicketService) {}

    @Get('/create-ticket')
    createTicket(): Promise<Ticket> {
        return this.ticketService.createTicket();
    }

    @Get('/delete-all-tickets')
    deleteAllTickets(): Promise<boolean> {
        return this.ticketService.deleteAllTickets();
    }
}