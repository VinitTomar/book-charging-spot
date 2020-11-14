import { InputType, OmitType } from '@nestjs/graphql';
import { PciCharger } from '../models/pci-charger.model';

@InputType()
export class AddPciCharger extends OmitType(PciCharger, ['id', 'pci'], InputType)
{ }