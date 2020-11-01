import { Injectable } from '@nestjs/common';
import { UserTypes } from './config/user-types';
import { User, Users } from './models/user.model';
import { AddUser } from './payloads/add-user';

@Injectable()
export class UserService {

  users: Users = [];

  constructor() {
    this.users = [
      {
        email: 'abc@mail.com',
        fullname: 'full abc',
        password: 'asdf',
        userType: UserTypes.E_VEHICLE_OWNER
      },
      {
        email: 'abc2@mail.com',
        fullname: 'full abc2',
        password: 'asdf',
        userType: UserTypes.E_VEHICLE_OWNER
      },
      {
        email: 'abc2@mail.com',
        fullname: 'full abc2',
        password: 'asdf',
        userType: UserTypes.E_VEHICLE_OWNER
      }
    ];
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(usr => usr.email === email);
  }

  async findAll() {
    return this.users;
  }

  async addUser(newUser: AddUser): Promise<User> {
    return (newUser as User);
  }

}
