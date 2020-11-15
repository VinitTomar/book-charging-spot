import { InputType, IntersectionType, PartialType, PickType } from '@nestjs/graphql';
import { PciAddress } from '../models/pci-address.model';
import { AddPciAddress } from './add-pci-address';


@InputType()
export class UpdatePciAddress extends IntersectionType(
  PickType(PciAddress, ['id'] as const, InputType),
  PartialType(AddPciAddress)
)
{ }