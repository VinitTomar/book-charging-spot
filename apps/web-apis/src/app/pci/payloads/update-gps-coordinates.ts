import { InputType, PartialType } from '@nestjs/graphql';
import { AddGpsCoordinates } from './add-gps-coordinates';

@InputType()
export class UpdateGpsCoordinates extends PartialType(AddGpsCoordinates)
{ }