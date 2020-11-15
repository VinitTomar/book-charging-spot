import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/models/user.model';
import { GpsCoordinate } from './models/gps-coordinate.model';
import { PciAddress } from './models/pci-address.model';
import { PciCharger } from './models/pci-charger.model';
import { Pci } from './models/pci.model';
import { AddPci } from './payloads/add-pci';


@Injectable()
export class PciService {

  constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
    @InjectRepository(Pci) private readonly _pciRepository: Repository<Pci>,
    @InjectRepository(PciCharger) private readonly _pciChargerRepository: Repository<PciCharger>,
    @InjectRepository(PciAddress) private readonly _pciAddressRepository: Repository<PciAddress>,
    @InjectRepository(GpsCoordinate) private readonly _gpsCoordinatesRepository: Repository<GpsCoordinate>,
  ) { }

  async getOwnersPcis(user: User): Promise<Pci[]> {
    return (await this._userRepository.findOne(user.id, { relations: ['pcis'] })).pcis;
  }

  async findByName(pciName: string): Promise<Pci> {
    return await this._pciRepository.findOne({ name: pciName });
  }

  async getAllPcis(): Promise<Pci[]> {
    return this._pciRepository.find();
  }

  async findPciById(pciId: string) {
    return await this._pciRepository.findOne(pciId);
  }

  async addPci(addPci: AddPci, user: User): Promise<Pci> {
    const createdPci = this._pciRepository.create(addPci);
    createdPci.owner = user;

    const createdGpsCoordinates = this._gpsCoordinatesRepository.create(addPci.gpsCoordinate);
    const savedGpsCoordinates = await this._gpsCoordinatesRepository.save(createdGpsCoordinates);
    createdPci.gpsCoordinate = savedGpsCoordinates;

    const createdPciAddress = this._pciAddressRepository.create(addPci.address);
    const savedPciAddress = await this._pciAddressRepository.save(createdPciAddress);
    createdPci.address = savedPciAddress;

    const savedPci = await this._pciRepository.save(createdPci);

    await Promise.all(
      addPci.chargers.map(charger => {
        const createdCharger = this._pciChargerRepository.create(charger);
        createdCharger.pci = savedPci;
        return this._pciChargerRepository.save(createdCharger);
      })
    );

    return savedPci;
  }

  async getPciChargers(pci: Pci): Promise<PciCharger[]> {
    return await this._pciChargerRepository.find({ pci });
  }

  async getPciOwner(pci: Pci): Promise<User> {
    return (await this._pciRepository.findOne(pci.id, { relations: ['owner'] })).owner;
  }


}