import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ParkingPlace } from '../../parking_place/entity/parking_place.entity';

@Table
export class Ticket extends Model<Ticket> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ unique: true })
  unique_id: number;

  @ForeignKey(() => ParkingPlace)
  @Column({ allowNull: false })
  parking_place_id: number;

  @BelongsTo(() => ParkingPlace)
  parking_place: ParkingPlace;
}
