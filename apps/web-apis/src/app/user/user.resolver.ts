import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { VerifyEmailMessageTypes } from './config/verify-email-message-types';
import { User } from './models/user.model';
import { AddUser } from './payloads/add-user';
import { UpdateUser } from './payloads/update-user';
import { VerifyEmail } from './payloads/verify-email';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {

  constructor(
    private _userService: UserService
  ) { }

  @Query(() => [User], { name: User.name + 's', nullable: 'items' })
  async allUsers() {
    return await this._userService.findAll();
  }

  @Mutation(() => User, { name: 'AddUser' })
  async addUser(@Args('addUser') newUser: AddUser) {
    return await this._userService.addUser(newUser);
  }

  @Mutation(() => User, { name: 'UpdateUser' })
  async updateUser(@Args('updateUser') updateUser: UpdateUser) {
    return await this._userService.updateUser(updateUser);
  }

  @Mutation(() => VerifyEmailMessageTypes, { name: "VerifyEmail" })
  async verifyEmail(@Args('verifyEmail') verifyEmail: VerifyEmail) {
    return await this._userService.verifyEmail(verifyEmail);
  }

}