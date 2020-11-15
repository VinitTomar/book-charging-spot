import { InputType, IntersectionType, PartialType, PickType } from '@nestjs/graphql';
import { GpsCoordinate } from '../models/gps-coordinate.model';
import { AddGpsCoordinates } from './add-gps-coordinates';


@InputType()
export class UpdateGpsCoordinates extends IntersectionType(
  PickType(GpsCoordinate, ['id'] as const, InputType),
  PartialType(AddGpsCoordinates)
)
{ }