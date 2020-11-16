import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChargerTypes } from './config/charger-types';
import { PciCharger } from './models/pci-charger.model';
import { Pci } from './models/pci.model';


@Injectable()
export class PciChargerSerive {

  constructor(
    @InjectRepository(PciCharger) private readonly _pciChargerRepository: Repository<PciCharger>
  ) { }

  async getChargesByType(chargerType: ChargerTypes): Promise<PciCharger[]> {
    return await this._pciChargerRepository.find({ chargerType });
  }

  async getChargerById(chargerId: string): Promise<PciCharger> {
    return await this._pciChargerRepository.findOne(chargerId);
  }

  async getChargesPci(pciCharger: PciCharger): Promise<Pci> {
    return (await this._pciChargerRepository.findOne(pciCharger.id, { relations: ['pci'] })).pci;
  }

}