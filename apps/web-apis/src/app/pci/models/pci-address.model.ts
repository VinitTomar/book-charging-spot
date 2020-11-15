import { ObjectType } from '@nestjs/graphql';
import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseAddress } from '../../address/models/base-address.model';
import { Pci } from './pci.model';

@Entity({
  name: PciAddress.name
})
@ObjectType()
export class PciAddress extends BaseAddress {

  @OneToOne(() => Pci, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  pci: Pci

}