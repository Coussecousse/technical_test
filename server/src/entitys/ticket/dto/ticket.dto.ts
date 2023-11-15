import { IsNotEmpty, IsNumber } from "class-validator"

export class PlaceDto {
    @IsNumber()
    @IsNotEmpty()
    parking_place_id: number
}

export class DeleteTicketDto {
    @IsNumber()
    @IsNotEmpty()
    unique_id: number
}

export class UpdateTicketDto {
    @IsNumber()
    @IsNotEmpty()
    unique_id: number

    @IsNumber()
    @IsNotEmpty()
    place: number
}
