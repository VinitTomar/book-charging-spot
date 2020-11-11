import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, Matches, MaxLength } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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
  @MaxLength(255)
  @Field()
  fullname: string;

  @Column({ type: 'varchar', length: 255 })
  @IsEmail()
  @IsEmailAlreadyExist()
  @MaxLength(255)
  @Field()
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => UserTypes)
  userType: UserTypes;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Column({ type: "boolean", default: false })
  @Field({ nullable: true })
  emailVerified: boolean;

  @Column({ type: "varchar", length: 500, nullable: true })
  emailVerificationToken: string;

}

export type Users = User[];