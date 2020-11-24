import { Field, ID, InputType, OmitType } from '@nestjs/graphql';
import { Booking } from '../models/booking.model';


@InputType()
export class AddBooking extends OmitType(Booking, ['id', 'status', 'pci', 'charger'], InputType)
{

  @Field(() => ID)
  chargerId: string;

}