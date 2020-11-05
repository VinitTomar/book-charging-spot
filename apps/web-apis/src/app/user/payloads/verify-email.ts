import { Field, InputType } from '@nestjs/graphql';


@InputType()
export class VerifyEmail {

  @Field()
  email: string;

  @Field()
  token: string;

}