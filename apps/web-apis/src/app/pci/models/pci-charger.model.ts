import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from '../../booking/models/booking.model';
import { ChargerTypes } from '../config/charger-types';
import { Pci } from './pci.model';

@Entity({
  name: PciCharger.name
})
@ObjectType()
export class PciCharger {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => ChargerTypes)
  chargerType: ChargerTypes;

  @Column()
  @Min(1)
  @Field(() => Int)
  numberOfPlatforms: number;

  @ManyToOne(() => Pci, (pci: Pci) => pci.chargers, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => Pci)
  pci: Pci

  @OneToMany(() => Booking, (booking: Booking) => booking.charger)
  bookings: Booking[];

}