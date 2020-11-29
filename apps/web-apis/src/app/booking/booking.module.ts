import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PciCharger } from '../pci/models/pci-charger.model';
import { Pci } from '../pci/models/pci.model';
import { User } from '../user/models/user.model';
import { BookingResolver } from './booking.resolver';
import { BookingService } from './booking.service';
import { Booking } from './models/booking.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Booking, Pci, PciCharger])
  ],
  controllers: [],
  providers: [
    BookingResolver,
    BookingService
  ],
})
export class BookingModule { }
