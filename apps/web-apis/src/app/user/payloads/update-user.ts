import { InputType, PartialType, } from '@nestjs/graphql';
import { AddUser } from './add-user';

@InputType()
export class UpdateUser extends PartialType(AddUser)
{ }