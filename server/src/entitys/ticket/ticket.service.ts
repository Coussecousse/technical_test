import { Injectable, Inject, HttpException } from "@nestjs/common";
import { Ticket } from "./entity/ticket.entity";
import { generateRandomId } from "./utils/ticketUtils";
import { ParkingPlaceService } from "../parking_place/parkingPlace.service";
import { errors } from "src/errors/errors";

@Injectable()
export class TicketService {
    constructor(
        @Inject('TICKET_REPOSITORY')
        private ticketRepository: typeof Ticket,
        private parkingPlaceService : ParkingPlaceService
    ) {}
    
    async createTicket(placeSelected: number | null = null): Promise<Ticket | Object> {
        try {
            // Check if parking is full
            const places_available = await this.parkingPlaceService.findAllAvailable();
            if (places_available.length === 0){
                throw new HttpException(errors.PARKING_FULL, 400);
            }
            
            const unique_id = await generateRandomId();
            let place: number;
            if (placeSelected) {
                // Check if placeSelected is available in parking
                const placeSelectedAvailable = places_available.find(place => place.place == placeSelected);
                if (placeSelectedAvailable) {
                    place = placeSelectedAvailable.place;
                } else {
                    throw new HttpException(errors.PLACE_TAKEN, 400);
                }
            } else {
                const randomIndex = Math.floor(Math.random() * places_available.length);
                place = places_available[randomIndex].place;
            }
            
            // Update parking place
            await this.parkingPlaceService.setTicket(place, unique_id);

            // Create ticket
            const ticket = await this.ticketRepository.create<Ticket>({
                unique_id : unique_id,
                parking_place_id : place
            })

            return ticket;
        }
        catch(err) {
            if (err === 'SequelizeUniqueConstraintError') {
                return this.createTicket();
            } else if (err.name === 'HttpException'){
                throw new HttpException(err.response, 400);
            }
            throw new HttpException(errors.DEFAULT, 400);
        }
    }

    async deleteTicket(unique_id : number): Promise<Object> {
        try { 
            const ticket = await this.ticketRepository.findOne<Ticket>({ where: { unique_id : unique_id } });

            if (!ticket) {
                throw new HttpException(errors.WRONG_ID, 400);
            }

            await ticket.destroy();
            await this.parkingPlaceService.removeTicket(unique_id);

            return { status: 'success' };
        } catch (err) {
            if (err.name === "TypeError")  {
                throw new HttpException(errors.EMPTY_ID, 400);
            }
            if (err.name = "HttpException") {
                throw new HttpException(err.response, 400);
            }
            throw new HttpException(errors.DEFAULT, 400);
        }
    }

    async updateTicket(unique_id : number, place : number): Promise<Object> {
        try {
            const ticket = await this.ticketRepository.findOne<Ticket>({ where: { unique_id : unique_id } });
            
            if (!ticket) {
                throw new HttpException(errors.WRONG_ID, 400);
            }   

            if (ticket.parking_place_id == place) {
                throw new HttpException(errors.SAME_PLACE, 400);
            }

            const newParkingPlace = await this.parkingPlaceService.findOne(place);
            if (newParkingPlace.occupied) {
                throw new HttpException(errors.PLACE_TAKEN, 400);
            }

            // Update previous place
            const previousPlaceID = ticket.parking_place_id;
            const previousPlace = await this.parkingPlaceService.findOne(previousPlaceID);
            previousPlace.update({ occupied : false, ticket_unique_id : null });

            // Update new place
            newParkingPlace.update({ occupied : true, ticket_unique_id : unique_id });

            // Update ticket
            await ticket.update({ parking_place_id : place });
            
            return { status: 'success'}
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                return errors.PLACE_TAKEN
            } else if (err.name === 'SequelizeValidationError') {
                throw new HttpException(errors.WRONG_ID, 400);
            } else if (err.name === 'HttpException') {
                throw new HttpException(err.response, 400);
            } 
            throw new HttpException(errors.DEFAULT, 400);
        }
    }
}
