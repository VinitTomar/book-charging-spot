import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { Pci } from '../models/pci.model';
import { AddOrUpdatePciCharger } from './add-or-update-pci-charger';
import { UpdateGpsCoordinates } from './update-gps-coordinates';
import { UpdatePciAddress } from './update-pci-address';

@InputType()
export class UpdatePci extends PartialType(PickType(Pci, ['name', 'highwayName'] as const, InputType))
{

  @Field(() => [AddOrUpdatePciCharger], { nullable: 'itemsAndList' })
  chargers: AddOrUpdatePciCharger[];

  @Field(() => UpdatePciAddress, { nullable: true })
  address: UpdatePciAddress;

  @Field(() => UpdateGpsCoordinates, { nullable: true })
  gpsCoordinate: UpdateGpsCoordinates;

}