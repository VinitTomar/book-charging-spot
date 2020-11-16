import { Args, ID, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ChargerTypes } from './config/charger-types';
import { PciCharger } from './models/pci-charger.model';
import { Pci } from './models/pci.model';
import { PciChargerSerive } from './pci-charger.service';

@Resolver(() => PciCharger)
export class PciChargerResolver {

  constructor(
    private readonly _pciChargerService: PciChargerSerive
  ) { }

  @Query(() => [PciCharger], { name: 'PciChargers', nullable: 'itemsAndList' })
  async getPciChargerByType(@Args('chargerType', { type: () => ChargerTypes }) chargerType: ChargerTypes) {
    return await this._pciChargerService.getChargesByType(chargerType);
  }

  @Query(() => PciCharger, { name: 'PciCharger' })
  async getPciChargerById(@Args('chargerId', { type: () => ID }) chargerId: string) {
    return await this._pciChargerService.getChargerById(chargerId);
  }

  @ResolveField(() => Pci, { name: 'pci' })
  async getChargerPci(@Parent() pciCharger: PciCharger) {
    return await this._pciChargerService.getChargesPci(pciCharger);
  }

}