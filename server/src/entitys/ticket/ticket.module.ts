import { Module } from "@nestjs/common";
import { TicketController } from "./ticket.controller";
import { TicketService } from "./ticket.service";
import { ticketProviders } from "./providers/ticket.providers";
import { ParkingPlaceModule } from "../parking_place/parkingPlace.module";

@Module({
    imports: [ParkingPlaceModule],
    controllers: [TicketController],
    providers: [
        TicketService,
        ...ticketProviders
    ]
})

export class TicketModule {}