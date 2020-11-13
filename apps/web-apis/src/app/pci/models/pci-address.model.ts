import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, OneToOne } from 'typeorm';
import { BaseAddress } from '../../address/models/base-address.model';
import { Pci } from './pci.model';


@Entity({
  name: PciAddress.name
})
@ObjectType()
export class PciAddress extends BaseAddress {

  @OneToOne(() => Pci, (pci: Pci) => pci.address)
  @Field(() => Pci)
  pci: Pci;

}