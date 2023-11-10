import { Body, Controller, Get, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './entity/ticket.entity';
import { TicketDto } from './dto/ticket.dto';

@Controller()
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Get('/create-ticket')
  createTicket(): Promise<Ticket | Object | Error> {
    return this.ticketService.createTicket();
  }

  @Post('/create-ticket')
  createTicketPost(@Body() dto: TicketDto): Promise<Ticket | Object> {
    return this.ticketService.createTicket(dto.parking_place_id);
  }

  @Post('/leave-parking')
  deleteTicket(@Body() dto: TicketDto): Promise<Object> {
    return this.ticketService.deleteTicket(dto.unique_id);
  }

  @Post('/update-ticket')
  UpdateTicket(@Body() ticket: TicketDto): Promise<Object> {
    return this.ticketService.updateTicket(ticket.unique_id, ticket.place);
  }
}
