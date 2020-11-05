import { InputType, IntersectionType, OmitType, PartialType, PickType } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { AddUser } from './add-user';


@InputType()
export class UpdateUser extends IntersectionType(
  PickType(User, ['id'] as const, InputType),
  PartialType(
    IntersectionType(
      OmitType(User, ['id'] as const, InputType),
      PickType(AddUser, ['password'] as const),
    )
  )
)
{ }