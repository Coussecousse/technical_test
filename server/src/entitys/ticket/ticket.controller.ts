import { Body, Controller, Get, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './entity/ticket.entity';
import { DeleteTicketDto, PlaceDto, UpdateTicketDto } from './dto/ticket.dto';

@Controller()
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Get('/create-ticket')
  createTicket(): Promise<Ticket | Object | Error> {
    return this.ticketService.createTicket();
  }

  @Post('/create-ticket')
  createTicketPost(@Body() dto: PlaceDto): Promise<Ticket | Object> {
      return this.ticketService.createTicket(dto.place);
  }

  @Post('/leave-parking')
  deleteTicket(@Body() dto: DeleteTicketDto): Promise<Object> {
    return this.ticketService.deleteTicket(dto.unique_id);
  }

  @Post('/update-ticket')
  UpdateTicket(@Body() ticket: UpdateTicketDto): Promise<Object> {
    return this.ticketService.updateTicket(ticket.unique_id, ticket.place);
  }
}
