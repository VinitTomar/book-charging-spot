import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { JwtAuth } from '../auth/jwt-auth.guard';
import { JwtUser } from '../auth/model/jwt-user';
import { SkipJwtAuth } from '../auth/skip-jwt-auth.decorator';
import { User } from '../user/models/user.model';
import { CurrentUser } from '../util/current-user-decorator';
import { GpsCoordinate } from './models/gps-coordinate.model';
import { PciAddress } from './models/pci-address.model';
import { PciCharger } from './models/pci-charger.model';
import { Pci } from './models/pci.model';
import { AddPci } from './payloads/add-pci';
import { PciService } from './pci.service';


@Resolver(() => Pci)
@UseGuards(JwtAuth)
export class PciResolver {

  constructor(
    private readonly _pciSerive: PciService
  ) { }

  @Query(() => [Pci], { name: 'Pcis', nullable: 'items' })
  @SkipJwtAuth()
  async getAllPci() {
    return await this._pciSerive.getAllPcis();
  }

  @Mutation(() => Pci, { name: 'AddPci' })
  async addNewPci(@Args('addPci', { type: () => AddPci }) addPci: AddPci, @CurrentUser() user: JwtUser) {
    return await this._pciSerive.addPci(addPci, user);
  }

  @ResolveField(() => [PciCharger], { name: 'chargers' })
  async getPciChargers(@Parent() pci: Pci) {
    return await this._pciSerive.getPciChargers(pci);
  }

  @ResolveField(() => PciAddress, { name: 'address' })
  async getPciAddress(@Parent() pci: Pci) {
    return pci.address;
    // return await this._pciSerive.getPciAddress(pci);
  }

  @ResolveField(() => GpsCoordinate, { name: 'gpsCoordinate' })
  async getGpsCoordinates(@Parent() pci: Pci) {
    return pci.gpsCoordinate;
    // return await this._pciSerive.getPciGpsCoordinates(pci);
  }

  @ResolveField(() => User, { name: 'owner' })
  async getPciOwner(@Parent() pci: Pci) {
    return pci.owner;
    // return await this._pciSerive.getPciOwner(pci);
  }

}