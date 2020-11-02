import { InputType, IntersectionType, OmitType, PartialType, PickType } from '@nestjs/graphql';
import { User } from '../models/user.model';


@InputType()
export class UpdateUser extends IntersectionType(
  PickType(User, ['id'] as const, InputType),
  PartialType(OmitType(User, ['id'] as const, InputType))
)
{ }