import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PciCharger } from '../../pci/models/pci-charger.model';
import { Pci } from '../../pci/models/pci.model';
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
  @Field()
  duration: number;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => BookingStatus)
  status: BookingStatus;

  @Column()
  @Field()
  chargerIndex: number;

  @ManyToOne(() => Pci, (pci: Pci) => pci.bookings, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => Pci)
  pci: Pci;

  @ManyToOne(() => PciCharger, (charger: PciCharger) => charger.bookings, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => PciCharger)
  charger: PciCharger;
}