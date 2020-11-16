import { InputType, PartialType } from '@nestjs/graphql';
import { AddPciAddress } from './add-pci-address';


@InputType()
export class UpdatePciAddress extends PartialType(AddPciAddress)
{ }