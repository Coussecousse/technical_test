
import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Ticket } from '../../ticket/entity/ticket.entity';

@Table
export class ParkingPlace extends Model<ParkingPlace> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ unique: true})
    place: number;

    @Column({ defaultValue: false })
    occupied: boolean;

    @ForeignKey(() => Ticket)
    @Column({ defaultValue: null})
    ticket_unique_id: number;
}
