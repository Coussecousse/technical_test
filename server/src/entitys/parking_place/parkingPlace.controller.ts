import { Controller, Get } from "@nestjs/common";
import { ParkingPlaceService } from "./parkingPlace.service";

@Controller()
export class ParkingPlaceController {
    constructor(private parkingPlace: ParkingPlaceService) {}

    @Get('/get-places')
    getAllPlaces(): Promise<Object> {
        return this.parkingPlace.getAllPlaces();
    }
}