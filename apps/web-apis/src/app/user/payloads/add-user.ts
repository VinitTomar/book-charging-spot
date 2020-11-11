import { Field, InputType, OmitType } from '@nestjs/graphql';
import { MinLength, MaxLength } from 'class-validator';
import { User } from '../models/user.model';


@InputType()
export class AddUser extends OmitType(User, ['id'], InputType) {

  @MinLength(3, {
    message: 'Password is too short. Minlength should be 3.',
  })
  @MaxLength(50, {
    message: 'Password is too long. Maxlength should be 50.',
  })
  @Field()
  password: string;

}