import { ParkingPlace } from "../entity/parking_place.entity";

export const parkingPlaceProviders = [
    {
        provide: 'PARKING_PLACE_REPOSITORY',
        useValue: ParkingPlace,
    },
];