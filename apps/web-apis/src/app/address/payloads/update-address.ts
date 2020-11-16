import { InputType, IntersectionType, OmitType, PartialType, PickType } from '@nestjs/graphql';
import { UserAddress } from '../models/user-address';

@InputType()
export class UpdateUserAddress extends IntersectionType(
  PickType(UserAddress, ['id', 'current'], InputType),
  PartialType(OmitType(UserAddress, ['id', 'user'], InputType))
)
{ }