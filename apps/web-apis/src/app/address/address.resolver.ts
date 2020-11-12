import { UseGuards } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { JwtAuth } from '../auth/jwt-auth.guard';
import { JwtUser } from '../auth/model/jwt-user';
import { CurrentUser } from '../util/current-user-decorator';
import { UserAddress } from './models/user-address';

@Resolver(() => UserAddress)
@UseGuards(JwtAuth)
export class AddressResolver {

  @Query(() => [UserAddress], { name: 'UserAddresses', nullable: 'itemsAndList' })
  async getUserAddresses(@CurrentUser() currentUser: JwtUser) {
    console.log({ currentUser })
    return [];
  }

  @Query(() => UserAddress, { name: UserAddress.name })
  async getByAddressId(@Args('id', { type: () => ID }) id: string, @CurrentUser() currentUser: JwtUser) {
    console.log({ id, currentUser })
    return []
  }

}