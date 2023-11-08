import { Body, Controller, Get, Post } from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { Ticket } from "./entity/ticket.entity";
import { TicketDto } from "./dto/ticket.dto";

@Controller()
export class TicketController {
    constructor(private ticketService: TicketService) {}

    @Get('/create-ticket')
    createTicket(): Promise<Ticket> {
        return this.ticketService.createTicket();
    }

    @Post('/leave-parking')
    deleteTicket(@Body() dto: TicketDto): Promise<Object> {
        return this.ticketService.deleteTicket(dto.unique_id);
    }
}