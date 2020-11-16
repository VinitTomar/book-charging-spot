import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({
  isAbstract: true
})
export class BaseAddress {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  line1: string;

  @Column()
  @Field()
  line2: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  landmark: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  district: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  state: string;

  @Column({ type: 'varchar', length: 6 })
  @Length(6, 6)
  @Field()
  pincode: string;

}