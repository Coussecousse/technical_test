import { IsNotEmpty, IsNumber, isNumber } from "class-validator"

export class TicketDto {
    @IsNumber()
    @IsNotEmpty()
    unique_id: number

    @IsNotEmpty()
    @IsNumber()
    parking_place_id: number
}