import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';


@InputType()
export class VerifyEmail {

  @Field()
  @IsEmail()
  email: string;

  @Field()
  token: string;

}