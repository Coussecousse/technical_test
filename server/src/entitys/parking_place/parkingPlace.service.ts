import { Injectable, Inject } from '@nestjs/common';
import { ParkingPlace } from './entity/parking_place.entity';

@Injectable()
export class ParkingPlaceService {
  constructor(
    @Inject('PARKING_PLACE_REPOSITORY')
    private parkingPlaceRepository: typeof ParkingPlace,
  ) {}

  async findAll(): Promise<ParkingPlace[]> {
    return this.parkingPlaceRepository.findAll<ParkingPlace>();
  }

  async findOne(place_id: number): Promise<ParkingPlace> {
    return this.parkingPlaceRepository.findOne({ where: { place: place_id } });
  }

  async findAllAvailable(): Promise<ParkingPlace[]> {
    return this.parkingPlaceRepository.findAll<ParkingPlace>({
      where: { occupied: false },
    });
  }

  async setTicket(
    place_id: number,
    ticket_unique_id: number,
  ): Promise<ParkingPlace> {
    const place = await this.parkingPlaceRepository.findOne({
      where: { place: place_id },
    });

    return place.update({ occupied: true, ticket_unique_id: ticket_unique_id });
  }

  async deletePlaces(): Promise<boolean> {
    try {
      const places = await this.parkingPlaceRepository.findAll<ParkingPlace>();
      await Promise.all(places.map((ticket) => ticket.destroy()));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
