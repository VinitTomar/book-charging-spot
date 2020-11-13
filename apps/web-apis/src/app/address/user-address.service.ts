import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../user/models/user.model';
import { UserAddress } from './models/user-address';
import { AddUserAddress } from './payloads/add-user-address';
import { UpdateAddress } from './payloads/update-address';

@Injectable()
export class UserAddressService {

  constructor(
    @InjectRepository(UserAddress) private readonly _userAddressRepository: Repository<UserAddress>,
    @InjectRepository(User) private readonly _userReposity: Repository<User>,
  ) { }

  async getUserAddresses(user: User): Promise<UserAddress[]> {
    return await this._userAddressRepository.find({ user });
  }

  async getUserAddressById(userAddressId: string, user: User): Promise<UserAddress> {
    return await this._userAddressRepository.findOne({ id: userAddressId, user });
  }

  async addUserAddress(addUserAddress: AddUserAddress, user: User): Promise<UserAddress> {
    const newAddress = this._userAddressRepository.create(addUserAddress);
    newAddress.user = user;

    const userWithAddress = await this._userReposity.findOne(user.id, { relations: ['addresses'] })

    if (userWithAddress.addresses.length === 0)
      newAddress.current = true;

    return await this._userAddressRepository.save(newAddress);
  }

  async updateUserAddress(addressId: string, updateAddress: UpdateAddress, user: User): Promise<UserAddress> {
    let currentAddress = await this.getUserAddressById(addressId, user);
    if (!currentAddress) {
      throw new BadRequestException(`No address found with id: ${addressId}`);
    }

    currentAddress = Object.assign(currentAddress, updateAddress);

    return await this._userAddressRepository.save(currentAddress);
  }

  async deleteUserAddress(addressId: string, user: User): Promise<DeleteResult> {
    const deletedResult = await this._userAddressRepository.delete({ id: addressId, user });
    return deletedResult;
  }

  async getAddressUser(addressId: string): Promise<User> {
    return (await this._userAddressRepository.findOne(addressId, { relations: ['user'] })).user;
  }

}
