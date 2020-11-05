import { Field, InputType, OmitType } from '@nestjs/graphql';
import { User } from '../models/user.model';


@InputType()
export class AddUser extends OmitType(User, ['id'], InputType) {

  @Field()
  password: string;

}