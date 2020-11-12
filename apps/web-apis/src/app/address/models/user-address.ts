import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne } from 'typeorm';
import { User } from '../../user/models/user.model';
import { BaseAddress } from '../models/base-address.model';

@Entity({
  name: 'UserAddress'
})
@ObjectType()
export class UserAddress extends BaseAddress {

  @ManyToOne(() => User, (user: User) => user.addresses)
  @Field(() => User)
  user: User

}