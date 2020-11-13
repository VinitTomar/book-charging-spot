import { Module } from '@nestjs/common';
import { ChargerTypeResolver } from './charger-type.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ChargerTypeResolver
  ],
})
export class PciModule { }
