import { Module } from "@nestjs/common";
import { ParkingPlaceController } from "./parkingPlace.controller";
import { ParkingPlaceService } from "./parkingPlace.service";
import { parkingPlaceProviders } from "./providers/parkingPlace.providers";

@Module({
    controllers: [ParkingPlaceController],
    providers: [
        ParkingPlaceService,
        ...parkingPlaceProviders
    ],
    exports: [ ParkingPlaceService]
})

export class ParkingPlaceModule {}