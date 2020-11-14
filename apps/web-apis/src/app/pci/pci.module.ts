import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { User } from '../user/models/user.model';
import { ChargerTypeResolver } from './charger-type.resolver';
import { GpsCoordinate } from './models/gps-coordinate.model';
import { PciAddress } from './models/pci-address.model';
import { PciCharger } from './models/pci-charger.model';
import { Pci } from './models/pci.model';
import { PciResolver } from './pci.resolver';
import { PciService } from './pci.service';
import { IsPciNameAlreadyExistConstraint } from './validators/is-pci-name-already-exist';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Pci, PciCharger, PciAddress, GpsCoordinate, User])
  ],
  controllers: [],
  providers: [
    ChargerTypeResolver,
    PciResolver,
    PciService,
    IsPciNameAlreadyExistConstraint
  ],
})
export class PciModule { }
