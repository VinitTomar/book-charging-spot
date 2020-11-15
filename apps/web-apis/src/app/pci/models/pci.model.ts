import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/models/user.model';
import { IsPciNameAlreadyExist } from '../validators/is-pci-name-already-exist';
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
  @MaxLength(255)
  @IsPciNameAlreadyExist()
  @Field()
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @MaxLength(255)
  @Field()
  highwayName: string;

  @OneToMany(() => PciCharger, (charger: PciCharger) => charger.pci)
  @Field(() => [PciCharger])
  chargers: PciCharger[];

  @Field(() => PciAddress)
  address: PciAddress;

  @Field(() => GpsCoordinate)
  gpsCoordinate: GpsCoordinate;

  @ManyToOne(() => User, (owner: User) => owner.pcis, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => User)
  owner: User;

}