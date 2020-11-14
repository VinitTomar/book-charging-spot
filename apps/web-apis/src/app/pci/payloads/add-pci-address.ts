import { InputType, OmitType } from '@nestjs/graphql';
import { PciAddress } from '../models/pci-address.model';


@InputType()
export class AddPciAddress extends OmitType(PciAddress, ['id'], InputType)
{ }