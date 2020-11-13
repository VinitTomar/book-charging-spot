import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GpsCoordinate } from './gps-coordinate.model';
import { PciAddress } from './pci-address.model';
import { PciCharger } from './pci-charger.model';

@Entity({
  name: Pci.name
})
@ObjectType()
export class Pci {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  highwayName: string;

  @OneToMany(() => PciCharger, (charger: PciCharger) => charger.pci)
  @Field(() => [PciCharger])
  chargers: PciCharger[];

  @OneToOne(() => PciAddress, (pciAddress: PciAddress) => pciAddress.pci)
  @Field(() => PciAddress)
  address: PciAddress;

  @OneToOne(() => GpsCoordinate, (coordinates: GpsCoordinate) => coordinates.pci)
  @Field(() => GpsCoordinate)
  gpsCoordinate: GpsCoordinate;

}