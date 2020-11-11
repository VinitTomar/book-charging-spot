import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';
import { BaseAddress } from '../models/base-address.model';

@ObjectType()
export class UserAddress extends BaseAddress {

  @Field(() => User)
  user: User

}