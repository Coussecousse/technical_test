import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator"

export class ParkingPlaceDto {
    @IsNumber()
    @IsNotEmpty()
    place: number

    @IsBoolean()
    @IsNotEmpty()
    occupied : boolean

    @IsNumber()
    ticket_unique_id : number
}