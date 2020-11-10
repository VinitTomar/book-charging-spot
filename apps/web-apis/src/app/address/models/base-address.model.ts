import { Field, ID, ObjectType } from '@nestjs/graphql';

ObjectType({
  isAbstract: true
})
export class BaseAddress {

  @Field(() => ID)
  id: string;

  @Field()
  line1: string;

  @Field()
  line2: string;

  @Field()
  landmark: string;

  @Field()
  district: string;

  @Field()
  state: string;

  @Field()
  pincode: string;

  @Field()
  current: boolean;

}