import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypes } from '../config/user-types';
import { IsEmailAlreadyExist } from '../validators/is-email-already-exist';

@Entity({ name: 'User' })
@ObjectType()
export class User {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @Matches(/^[a-zA-Z ]+$/, {
    message: 'Fullname $value is invalid. Only alphabets and space allowed.'
  })
  @Field()
  fullname: string;

  @Column({ type: 'varchar', length: 255 })
  @IsEmail()
  @IsEmailAlreadyExist()
  @Field()
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @MinLength(7, {
    message: 'Password is too short. Minlength should be 7.',
  })
  @MaxLength(50, {
    message: 'Password is too long. Maxlength should be 50.',
  })
  @Field()
  password: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => UserTypes)
  userType: UserTypes;

}

export type Users = User[];