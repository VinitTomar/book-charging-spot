import { InputType, IntersectionType, OmitType, PartialType, PickType } from '@nestjs/graphql';
import { BaseAddress } from '../models/base-address.model';

@InputType()
export class UpdateAddress extends IntersectionType(
  PickType(BaseAddress, ['id'], InputType),
  PartialType(OmitType(BaseAddress, ['id'], InputType))
)
{ }