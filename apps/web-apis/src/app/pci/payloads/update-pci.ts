import { InputType, IntersectionType, PartialType, PickType } from '@nestjs/graphql';
import { Pci } from '../models/pci.model';
import { AddPci } from './add-pci';


@InputType()
export class UpdatePci extends IntersectionType(
  PickType(Pci, ['id'] as const),
  PartialType(AddPci)
)
{ }