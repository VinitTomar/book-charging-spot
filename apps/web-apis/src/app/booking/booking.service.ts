import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PciCharger } from '../pci/models/pci-charger.model';
import { Pci } from '../pci/models/pci.model';
import { User } from '../user/models/user.model';
import { BookingStatus } from './config/booking-status';
import { Booking } from './models/booking.model';
import { AddBooking } from './payloads/add-booking';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private readonly _bookingRepository: Repository<Booking>,
    @InjectRepository(Pci) private readonly _pciRepository: Repository<Pci>,
    @InjectRepository(PciCharger) private readonly _pciChargerRepository: Repository<PciCharger>,
    @InjectRepository(Booking) private readonly _userRepository: Repository<User>
  ) { }

  async getCurrentUsersBooking(user: User): Promise<Booking[]> {
    return await this._bookingRepository.find({ booker: user });
  }

  async addNewBooking(booking: AddBooking, user: User): Promise<Booking> {
    const pciCharger = await this._pciChargerRepository.findOne(
      { id: booking.chargerId }, { relations: ['pci'] }
    );

    const createdBooking = this._bookingRepository.create(booking);
    createdBooking.charger = pciCharger;
    createdBooking.pci = pciCharger.pci;
    createdBooking.booker = user;

    return await this._bookingRepository.save(createdBooking);
  }

  async cancelBooking(bookingId: string, user: User): Promise<Booking> {
    const currentBooking = await this._bookingRepository.findOne({
      id: bookingId,
      booker: user
    });

    if (!currentBooking)
      return null;

    currentBooking.status = BookingStatus.CANCEL;
    return await this._bookingRepository.save(currentBooking);
  }
}