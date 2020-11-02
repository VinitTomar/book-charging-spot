import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypes } from './config/user-types';
import { User, Users } from './models/user.model';
import { AddUser } from './payloads/add-user';
import { UpdateUser } from './payloads/update-user';

@Injectable()
export class UserService {

  users: Users = [];

  constructor(
    @InjectRepository(User) private readonly _userReposity: Repository<User>
  ) {
    this.users = [
      {
        id: '1',
        email: 'abc@mail.com',
        fullname: 'full abc',
        password: 'asdf',
        userType: UserTypes.E_VEHICLE_OWNER
      },
      {
        id: '2',
        email: 'abc2@mail.com',
        fullname: 'full abc2',
        password: 'asdf',
        userType: UserTypes.E_VEHICLE_OWNER
      },
      {
        id: '3',
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

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }

  async findAll() {
    return this.users;
  }

  async addUser(addUser: AddUser): Promise<User> {
    const newUser = { ...addUser, id: this.users.length + '' };
    this.users.push(newUser as User);
    return (newUser as User);
  }

  async updateUser(updateUser: UpdateUser): Promise<User> {
    let currentUser = await this.findById(updateUser.id);
    currentUser = { ...currentUser, ...updateUser };
    this.users = this.users.map(user => {
      if (user.id === currentUser.id) {
        return currentUser;
      }
      return user;
    });
    return currentUser;
  }

}
