import { Controller, Get } from "@nestjs/common";
import { ParkingPlaceService } from "./parkingPlace.service";

@Controller()
export class ParkingPlaceController {
    constructor(private parkingPlace: ParkingPlaceService) {}

    @Get('/delete-all-places') 
    deletePlaces(): Promise<boolean> {
        return this.parkingPlace.deletePlaces();
    }
}