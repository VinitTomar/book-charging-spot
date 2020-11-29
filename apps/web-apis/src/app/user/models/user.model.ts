import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, Matches, MaxLength } from 'class-validator';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserAddress } from '../../address/models/user-address';
import { Booking } from '../../booking/models/booking.model';
import { Pci } from '../../pci/models/pci.model';
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

  @OneToMany(() => UserAddress, (address: UserAddress) => address.user)
  // @Field(() => [UserAddress], { nullable: 'itemsAndList' })
  addresses: UserAddress[]

  @OneToMany(() => Booking, (booking: Booking) => booking.booker)
  bookings: Booking[]

  @OneToMany(() => Pci, (pci: Pci) => pci.owner)
  @Field(() => [Pci])
  pcis: Pci[]

}
