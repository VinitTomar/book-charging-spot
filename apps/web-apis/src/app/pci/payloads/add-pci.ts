import { InputType, OmitType } from '@nestjs/graphql';
import { Pci } from '../models/pci.model';


@InputType()
export class AddPci extends OmitType(Pci, ['id'] as const) { }