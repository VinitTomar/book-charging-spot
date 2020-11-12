import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AddressResolver } from './address.resolver';
import { UserAddress } from './models/user-address';
import { UserAddressService } from './user-address.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAddress]),
    AuthModule
  ],
  providers: [
    AddressResolver,
    UserAddressService,
  ],
})
export class AddressModule { }
