import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAddress } from './models/user-address';

@Injectable()
export class UserAddressService {

  constructor(
    @InjectRepository(UserAddress) private readonly _userAddressRepository: Repository<UserAddress>
  ) { }

}
