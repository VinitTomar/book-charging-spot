import { Field, InputType, PickType } from '@nestjs/graphql';
import { Pci } from '../models/pci.model';
import { AddGpsCoordinates } from './add-gps-coordinates';
import { AddPciAddress } from './add-pci-address';
import { AddPciCharger } from './add-pci-charger';


@InputType()
export class AddPci extends PickType(Pci, ['name', 'highwayName'] as const, InputType) {

  @Field(() => AddPciAddress)
  address: AddPciAddress;

  @Field(() => [AddPciCharger])
  chargers: AddPciCharger[];

  @Field(() => AddGpsCoordinates)
  gpsCoordinate: AddGpsCoordinates;

}