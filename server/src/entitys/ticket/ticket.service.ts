import { Injectable, Inject } from "@nestjs/common";
import { Ticket } from "./entity/ticket.entity";
import { generateRandomId } from "./utils/ticketUtils";
import { ParkingPlaceService } from "../parking_place/parkingPlace.service";
import { TicketDto } from "./dto/ticket.dto";
import { ParkingPlace } from "../parking_place/entity/parking_place.entity";

@Injectable()
export class TicketService {
    constructor(
        @Inject('TICKET_REPOSITORY')
        private ticketRepository: typeof Ticket,
        private parkingPlaceService : ParkingPlaceService
    ) {}
    
    async createTicket(): Promise<Ticket> {
        try {
            const unique_id = await generateRandomId();
            const places_available = await this.parkingPlaceService.findAllAvailable();
            const randomIndex = Math.floor(Math.random() * places_available.length);
            const place = places_available[randomIndex];

            await this.parkingPlaceService.setTicket(place.place, unique_id);

            const ticket = await this.ticketRepository.create<Ticket>({
                unique_id : unique_id,
                parking_place_id : place.place
            })

            return ticket;
        }
        catch(err) {
            if (err === 'SequelizeUniqueConstraintError') {
                return this.createTicket();
            } 
            else {
                throw err;
            }
        }
    }

    async deleteTicket(unique_id : number): Promise<Object> {
        try {
            const ticket = await this.ticketRepository.findOne<Ticket>({ where: { unique_id : unique_id } });
            await ticket.destroy();
            await this.parkingPlaceService.removeTicket(unique_id);
            return { status: 'success' };
        } catch (error) {
            if (error) {
                return { status: 'error', message: 'Mauvais ID.' };
            }
        }
    }
}
