import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChargerTypes } from '../config/charger-types';
import { Pci } from './pci.model';


@Entity({
  name: PciCharger.name
})
@ObjectType()
export class PciCharger {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => ChargerTypes)
  chargerType: ChargerTypes;

  @Column()
  @Min(1)
  @Field(() => Int)
  numberOfPlatforms: number;

  @ManyToOne(() => Pci, (pci: Pci) => pci.chargers, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => Pci)
  pci: Pci

}