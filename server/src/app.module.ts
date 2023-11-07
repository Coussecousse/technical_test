import { Module } from '@nestjs/common';
import { TestModule } from './test/test.module';
import { databaseProviders } from './util/database.providers';
import { DatabaseModule } from './util/database.module';
import { TicketModule } from './entitys/ticket/ticket.module';
import { ParkingPlaceModule } from './entitys/parking_place/parkingPlace.module';

@Module({
  imports: [TestModule, DatabaseModule, TicketModule, ParkingPlaceModule],
  providers: [...databaseProviders ],
  exports: [...databaseProviders],
})
export class AppModule {}
