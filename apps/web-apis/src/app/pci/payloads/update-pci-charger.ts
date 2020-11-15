import { InputType, IntersectionType, PartialType, PickType } from '@nestjs/graphql';
import { PciCharger } from '../models/pci-charger.model';
import { AddPciCharger } from './add-pci-charger';


@InputType()
export class UpdatePciCharger extends IntersectionType(
  PickType(PciCharger, ['id'] as const, InputType),
  PartialType(AddPciCharger)
)
{ }