import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PciCharger } from '../../pci/models/pci-charger.model';
import { Pci } from '../../pci/models/pci.model';
import { BookingStatusTypes } from '../config/booking-status-types';


@Entity({
  name: Booking.name
})
@ObjectType()
export class Booking {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLISODateTime)
  start: Date;

  @Field()
  duration: number;

  @Field(() => BookingStatusTypes)
  status: BookingStatusTypes;

  @Field()
  chargerIndex: number;

  @Field(() => Pci)
  pci: Pci;

  @Field(() => PciCharger)
  charger: PciCharger;
}