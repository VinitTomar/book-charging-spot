import { Field, GraphQLISODateTime, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PciCharger } from '../../pci/models/pci-charger.model';
import { Pci } from '../../pci/models/pci.model';
import { User } from '../../user/models/user.model';
import { BookingStatus } from '../config/booking-status';


@Entity({
  name: Booking.name
})
@ObjectType()
export class Booking {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'timestamp' })
  @Field(() => GraphQLISODateTime)
  start: Date;

  @Column()
  @Field(() => Int)
  duration: number;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => BookingStatus)
  status: BookingStatus;

  @Column()
  @Field(() => Int)
  chargerIndex: number;

  @ManyToOne(() => Pci, (pci: Pci) => pci.bookings, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => Pci)
  pci: Pci;

  @ManyToOne(() => PciCharger, (charger: PciCharger) => charger.bookings, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => PciCharger)
  charger: PciCharger;

  @ManyToOne(() => User, (booker: User) => booker.bookings, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => User)
  booker: User;
}