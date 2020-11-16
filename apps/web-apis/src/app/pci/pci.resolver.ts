import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { JwtAuth } from '../auth/jwt-auth.guard';
import { JwtUser } from '../auth/model/jwt-user';
import { Role } from '../auth/role.decorator';
import { SkipJwtAuth } from '../auth/skip-jwt-auth.decorator';
import { UserTypes } from '../user/config/user-types';
import { User } from '../user/models/user.model';
import { CurrentUser } from '../util/current-user-decorator';
import { ChargerTypes } from './config/charger-types';
import { GpsCoordinate } from './models/gps-coordinate.model';
import { PciAddress } from './models/pci-address.model';
import { PciCharger } from './models/pci-charger.model';
import { Pci } from './models/pci.model';
import { AddPci } from './payloads/add-pci';
import { UpdatePci } from './payloads/update-pci';
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
  @Role(UserTypes.PCI_OWNER)
  async addNewPci(@Args('addPci', { type: () => AddPci }) addPci: AddPci, @CurrentUser() user: JwtUser) {
    return await this._pciSerive.addPci(addPci, user);
  }

  @Mutation(() => Pci, { name: "UpdatePci" })
  @Role(UserTypes.PCI_OWNER)
  async updatePci(
    @Args('updatePci') updatePci: UpdatePci,
    @Args('id', { type: () => ID }) pciId: string,
    @CurrentUser() currentUser: JwtUser
  ): Promise<Pci> {
    return await this._pciSerive.updatePci(pciId, updatePci, currentUser);
  }

  @Mutation(() => String, { name: 'RemoveSameTypePciChargers' })
  @Role(UserTypes.PCI_OWNER)
  async removeSameTypePciChargers(
    @Args('type', { type: () => ChargerTypes }) chargerType: ChargerTypes,
    @Args('pciId', { type: () => ID }) pciId: string,
    @CurrentUser() user: JwtUser
  ) {
    const deleted = await this._pciSerive.removeSameTypePciCharger(pciId, chargerType, user);

    if (deleted.affected > 0)
      return `Charger of type ${chargerType} removed, for pci ${pciId}.`

    return `No charger removed of type ${chargerType}, for pci ${pciId}.`;
  }

  @Mutation(() => String, { name: 'DeletePci' })
  @Role(UserTypes.PCI_OWNER)
  async deletePci(@Args('pciId', { type: () => ID }) pciId: string, @CurrentUser() user: JwtUser) {
    const deleted = await this._pciSerive.deletePci(pciId, user);

    if (deleted.affected > 0)
      return `Pci with id: ${pciId} is deleted.`

    return `No pci found with id: ${pciId}`;
  }

  @ResolveField(() => [PciCharger], { name: 'chargers' })
  async getPciChargers(@Parent() pci: Pci): Promise<PciCharger[]> {
    const chargers = this._pciSerive.getPciChargers(pci);
    return await chargers;
  }

  @ResolveField(() => PciAddress, { name: 'address' })
  async getPciAddress(@Parent() pci: Pci) {
    return await this._pciSerive.getPciAddress(pci);
  }

  @ResolveField(() => GpsCoordinate, { name: 'gpsCoordinate' })
  async getGpsCoordinates(@Parent() pci: Pci) {
    return await this._pciSerive.getPciGpsCoordinates(pci);
  }

  @ResolveField(() => User, { name: 'owner' })
  async getPciOwner(@Parent() pci: Pci) {
    return await this._pciSerive.getPciOwner(pci);
  }

}