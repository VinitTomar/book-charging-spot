import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: GpsCoordinate.name
})
@ObjectType()
export class GpsCoordinate {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Min(-90)
  @Max(90)
  @Field()
  latitude: number;

  @Column()
  @Min(-180)
  @Max(180)
  @Field()
  longitude: number;

}