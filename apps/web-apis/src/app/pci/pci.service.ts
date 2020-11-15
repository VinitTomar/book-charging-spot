import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../user/models/user.model';
import { ChargerTypes } from './config/charger-types';
import { GpsCoordinate } from './models/gps-coordinate.model';
import { PciAddress } from './models/pci-address.model';
import { PciCharger } from './models/pci-charger.model';
import { Pci } from './models/pci.model';
import { AddPci } from './payloads/add-pci';
import { UpdatePci } from './payloads/update-pci';


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

  async getPciChargers(pci: Pci): Promise<PciCharger[]> {
    return await this._pciChargerRepository.find({ pci });
  }

  async getPciOwner(pci: Pci): Promise<User> {
    return (await this._pciRepository.findOne(pci.id, { relations: ['owner'] })).owner;
  }

  async addPci(addPci: AddPci, user: User): Promise<Pci> {
    const createdPci = this._pciRepository.create(addPci);
    createdPci.owner = user;
    const savedPci = await this._pciRepository.save(createdPci);

    const createdGpsCoordinates = this._gpsCoordinatesRepository.create(addPci.gpsCoordinate);
    createdGpsCoordinates.pci = savedPci;
    const savedGpsCoordinates = await this._gpsCoordinatesRepository.save(createdGpsCoordinates);
    savedPci.gpsCoordinate = savedGpsCoordinates;

    const createdPciAddress = this._pciAddressRepository.create(addPci.address);
    createdPciAddress.pci = savedPci;
    const savedPciAddress = await this._pciAddressRepository.save(createdPciAddress);
    savedPci.address = savedPciAddress;

    const savedPciChargers = await Promise.all(
      addPci.chargers.map(charger => {
        const createdCharger = this._pciChargerRepository.create(charger);
        createdCharger.pci = savedPci;
        return this._pciChargerRepository.save(createdCharger);
      })
    );

    savedPci.chargers = savedPciChargers;

    return savedPci;
  }

  async updatePci(pciId: string, updatePci: UpdatePci, user: User): Promise<Pci> {
    let currentPci = await this._pciRepository.findOne({ id: pciId, owner: user });

    if (!currentPci) {
      throw new BadRequestException(`No Pci found with id: ${pciId}`);
    }

    currentPci = Object.assign(currentPci, updatePci);

    const savedPci = await this._pciRepository.save(currentPci);

    if (updatePci.address) {
      const updatePciAddress = updatePci.address;
      let currentPciAddress = await this._pciAddressRepository.findOne({ id: updatePciAddress.id, pci: savedPci });
      currentPciAddress = Object.assign(currentPciAddress, updatePciAddress);
      const savedPciAddress = await this._pciAddressRepository.save(currentPciAddress);
      savedPci.address = savedPciAddress;
    }

    if (updatePci.gpsCoordinate) {
      const updateGpsCoordinate = updatePci.gpsCoordinate;
      let currentGpsCoordinate = await this._pciAddressRepository.findOne({ id: updateGpsCoordinate.id, pci: savedPci });
      currentGpsCoordinate = Object.assign(currentGpsCoordinate, updateGpsCoordinate);
      const savedGpsCoordinates = await this._pciAddressRepository.save(currentGpsCoordinate);
      savedPci.address = savedGpsCoordinates;
    }

    if (updatePci?.chargers?.length > 0) {
      const updatePciChargers = updatePci.chargers;

      const savedPciChargers = await Promise.all(
        updatePciChargers.map(async updateCharger => {
          let currentCharger = await this._pciChargerRepository.findOne({
            chargerType: updateCharger.chargerType,
            pci: currentPci
          });

          if (currentCharger) {
            currentCharger = Object.assign(currentCharger, updateCharger);
          } else {
            currentCharger = this._pciChargerRepository.create(updateCharger);
          }

          const savedCharger = await this._pciChargerRepository.save(currentCharger);

          return savedCharger;
        })
      );

      savedPci.chargers = savedPciChargers;
    }

    return savedPci;
  }

  async removeSameTypePciCharger(pciId: string, chargerType: ChargerTypes, user: User) {
    const currentPci = (await this._pciRepository.findOne(
      { id: pciId, owner: user },
      { relations: ['chargers'] })
    );

    if (!currentPci) {
      throw new BadRequestException(`No Pci found with id: ${pciId}`);
    }

    if (currentPci.chargers.length === 1) {
      throw new BadRequestException(`Pci ${pciId} has only ${chargerType} type of chargers`);
    }

    const currentChargers = currentPci.chargers.find(charger => charger.chargerType === chargerType);

    return await this._pciChargerRepository.delete(currentChargers);

  }

  async deletePci(pciId: string, user: User): Promise<DeleteResult> {
    return await this._pciRepository.delete({ id: pciId, owner: user });
  }

}