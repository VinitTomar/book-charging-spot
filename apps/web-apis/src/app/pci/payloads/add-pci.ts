import { Field, InputType, PickType } from '@nestjs/graphql';
import { Pci } from '../models/pci.model';
import { AddGpsCoordinates } from './add-gps-coordinates';
import { AddPciAddress } from './add-pci-address';
import { AddOrUpdatePciCharger } from './add-or-update-pci-charger';


@InputType()
export class AddPci extends PickType(Pci, ['name', 'highwayName'] as const, InputType) {

  @Field(() => AddPciAddress)
  address: AddPciAddress;

  @Field(() => [AddOrUpdatePciCharger])
  chargers: AddOrUpdatePciCharger[];

  @Field(() => AddGpsCoordinates)
  gpsCoordinate: AddGpsCoordinates;

}