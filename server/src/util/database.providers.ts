import { Sequelize } from "sequelize-typescript";
import { ParkingPlace } from "src/entitys/parking_place/entity/parking_place.entity";
import { Ticket } from "src/entitys/ticket/entity/ticket.entity";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '',
                database: 'parking',
            });
            sequelize.addModels([Ticket, ParkingPlace]);
            await sequelize.sync();
            return sequelize;
        }
    }
]