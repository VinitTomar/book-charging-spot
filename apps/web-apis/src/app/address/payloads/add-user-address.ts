import { InputType, OmitType } from '@nestjs/graphql';
import { BaseAddress } from '../models/base-address.model';

@InputType()
export class AddUserAddress extends OmitType(BaseAddress, ['id'] as const, InputType)
{ }