import { Module } from '@nestjs/common';
import { databaseProviders } from './util/database.providers';
import { DatabaseModule } from './util/database.module';
import { TicketModule } from './entitys/ticket/ticket.module';
import { ParkingPlaceModule } from './entitys/parking_place/parkingPlace.module';

@Module({
  imports: [DatabaseModule, TicketModule, ParkingPlaceModule],
  providers: [...databaseProviders ],
  exports: [...databaseProviders],
})
export class AppModule {}
