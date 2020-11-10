import { Module } from '@nestjs/common';
import { UserAddressService } from './user-address.service';

@Module({
  imports: [],
  providers: [
    UserAddressService,
  ],
})
export class AddressModule { }
