import { Field, InputType, IntersectionType, PartialType, PickType } from '@nestjs/graphql';
import { Pci } from '../models/pci.model';
import { UpdateGpsCoordinates } from './update-gps-coordinates';
import { UpdatePciAddress } from './update-pci-address';

@InputType()
export class UpdatePci extends IntersectionType(
  PickType(Pci, ['id'] as const, InputType),
  PartialType(PickType(Pci, ['name', 'highwayName'] as const, InputType))
)
{

  @Field(() => UpdatePciAddress, { nullable: true })
  address: UpdatePciAddress;

  @Field(() => UpdateGpsCoordinates, { nullable: true })
  gpsCoordinate: UpdateGpsCoordinates;

}