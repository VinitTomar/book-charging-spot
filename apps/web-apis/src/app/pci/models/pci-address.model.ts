import { ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';
import { BaseAddress } from '../../address/models/base-address.model';

@Entity({
  name: PciAddress.name
})
@ObjectType()
export class PciAddress extends BaseAddress {
}