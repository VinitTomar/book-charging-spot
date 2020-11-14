import { InputType, OmitType } from '@nestjs/graphql';
import { GpsCoordinate } from '../models/gps-coordinate.model';

@InputType()
export class AddGpsCoordinates extends OmitType(GpsCoordinate, ['id'], InputType)
{ }