import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { AddUser } from './payloads/add-user';
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

}