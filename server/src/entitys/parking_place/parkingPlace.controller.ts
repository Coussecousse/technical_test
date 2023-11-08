import { Controller, Get } from "@nestjs/common";
import { ParkingPlaceService } from "./parkingPlace.service";

@Controller()
export class ParkingPlaceController {
    constructor(private parkingPlace: ParkingPlaceService) {}

}