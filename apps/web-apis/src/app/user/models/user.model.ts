import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { UserTypes } from '../config/user-types';


@ObjectType()
export class User {

  @Field()
  fullname: string;

  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => UserTypes)
  userType: UserTypes;

}

export type Users = User[];