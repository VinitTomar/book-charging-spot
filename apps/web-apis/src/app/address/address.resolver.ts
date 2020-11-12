import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuth } from '../auth/jwt-auth.guard';
import { JwtUser } from '../auth/model/jwt-user';
import { CurrentUser } from '../util/current-user-decorator';
import { UserAddress } from './models/user-address';
import { AddUserAddress } from './payloads/add-user-address';
import { UpdateAddress } from './payloads/update-address';
import { UserAddressService } from './user-address.service';

@Resolver(() => UserAddress)
@UseGuards(JwtAuth)
export class AddressResolver {

  constructor(
    private readonly _userAddressService: UserAddressService
  ) { }

  @Query(() => [UserAddress], { name: 'UserAddresses', nullable: 'itemsAndList' })
  async getUserAddresses(@CurrentUser() currentUser: JwtUser) {
    return await this._userAddressService.getUserAddresses(currentUser);
  }

  @Query(() => UserAddress, { name: UserAddress.name })
  async getUserAddressById(@Args('id', { type: () => ID }) id: string, @CurrentUser() currentUser: JwtUser) {
    return await this._userAddressService.getUserAddressById(id, currentUser);
  }


  @Mutation(() => UserAddress, { name: 'AddUserAddress' })
  async addUserAddress(@Args('addUserAddress') addUserAddress: AddUserAddress, @CurrentUser() currentUser: JwtUser) {
    return await this._userAddressService.addUserAddress(addUserAddress, currentUser);
  }

  @Mutation(() => UserAddress, { name: 'UpdateUserAddress' })
  async updateUserAddress(@Args('updateUserAddress') updateUserAddress: UpdateAddress, @CurrentUser() currentUser: JwtUser) {
    return await this._userAddressService.addUserAddress(updateUserAddress, currentUser);
  }


  @Mutation(() => String, { name: 'DeleteUserAddress' })
  async deleteUserAddress(@Args('id', { type: () => ID }) addressId: string, @CurrentUser() currentUser: JwtUser) {
    return await this._userAddressService.deleteUserAddress(addressId, currentUser);
  }


}