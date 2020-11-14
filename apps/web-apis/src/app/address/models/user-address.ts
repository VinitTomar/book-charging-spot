import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../user/models/user.model';
import { BaseAddress } from '../models/base-address.model';

@Entity({
  name: 'UserAddress'
})
@ObjectType()
export class UserAddress extends BaseAddress {

  @Column({ default: false })
  @Field()
  current: boolean;

  @ManyToOne(() => User, (user: User) => user.addresses)
  @Field(() => User)
  user: User

}