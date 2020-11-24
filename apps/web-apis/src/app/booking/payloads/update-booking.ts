import { InputType, PartialType } from '@nestjs/graphql';
import { AddBooking } from './add-booking';


@InputType()
export class UpdateBooking extends PartialType(AddBooking)
{ }