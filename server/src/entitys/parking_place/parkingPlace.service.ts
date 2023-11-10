import { Injectable, Inject, HttpException } from '@nestjs/common';
import { ParkingPlace } from './entity/parking_place.entity';
import { errors } from 'src/errors/errors';

@Injectable()
export class ParkingPlaceService {
  constructor(
    @Inject('PARKING_PLACE_REPOSITORY')
    private parkingPlaceRepository: typeof ParkingPlace,
  ) {}

  async findAll(): Promise<ParkingPlace[]> {
    try {
      return this.parkingPlaceRepository.findAll<ParkingPlace>();
    }
    catch (error) {
      throw new HttpException(errors.DEFAULT, 400)
    }
  }

  async findOne(place_id: number): Promise<ParkingPlace> {
    try {
      return this.parkingPlaceRepository.findOne({ where: { place: place_id } });
    }
    catch (error) {
      throw new HttpException(errors.DEFAULT, 400)
    }
  }

  async findAllAvailable(): Promise<ParkingPlace[]> {
    try {
      return this.parkingPlaceRepository.findAll<ParkingPlace>({
        where: { occupied: false },
      });
    }
    catch (error) {
      throw new HttpException(errors.DEFAULT, 400)
    }
  }

  async setTicket(
    place_id: number,
    ticket_unique_id: number,
  ): Promise<ParkingPlace> {
    try {
      const place = await this.parkingPlaceRepository.findOne({
        where: { place: place_id },
      });
    
      return place.update({ occupied: true, ticket_unique_id: ticket_unique_id });
    }
    catch (error) {
      throw new HttpException(errors.DEFAULT, 400)
    }
  }

  async removeTicket(ticket_id: number): Promise<ParkingPlace> {
    try {
      const place = await this.parkingPlaceRepository.findOne({
        where: {
          ticket_unique_id: ticket_id,
        },
      });
      return place.update({ occupied: false, ticket_unique_id: null });
    }
    catch (error) {
      throw new HttpException(errors.DEFAULT, 400)
    }
  }

  async getAllPlaces(): Promise<ParkingPlace[]> {
    try {
      return this.parkingPlaceRepository.findAll<ParkingPlace>({
        attributes: ['place', 'occupied'],
      });
    }
    catch (error) {
      throw new HttpException(errors.DEFAULT, 400)  
    }
  }
}
