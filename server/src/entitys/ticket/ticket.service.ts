import { Injectable, Inject } from "@nestjs/common";
import { Ticket } from "./entity/ticket.entity";
import { generateRandomId } from "./utils/ticketUtils";
import { ParkingPlaceService } from "../parking_place/parkingPlace.service";

@Injectable()
export class TicketService {
    constructor(
        @Inject('TICKET_REPOSITORY')
        private ticketRepository: typeof Ticket,
        private parkingPlaceService : ParkingPlaceService
    ) {}
    
    async createTicket(placeSelected: number | null = null): Promise<Ticket> {
        try {
            const unique_id = await generateRandomId();
            const places_available = await this.parkingPlaceService.findAllAvailable();

            let place: number;
            if (placeSelected) {
                // Check if placeSelected is available in parking
                const placeSelectedAvailable = places_available.find(place => place.place == placeSelected);
                if (placeSelectedAvailable) {
                    place = placeSelectedAvailable.place;
                } else {
                    throw new Error('Place non disponible');
                }
            } else {
                const randomIndex = Math.floor(Math.random() * places_available.length);
                place = places_available[randomIndex].place;
                
            }
            
            await this.parkingPlaceService.setTicket(place, unique_id);

            const ticket = await this.ticketRepository.create<Ticket>({
                unique_id : unique_id,
                parking_place_id : place
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
