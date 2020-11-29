import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuth } from '../auth/jwt-auth.guard';
import { JwtUser } from '../auth/model/jwt-user';
import { CurrentUser } from '../util/current-user-decorator';
import { BookingService } from './booking.service';
import { Booking } from './models/booking.model';
import { AddBooking } from './payloads/add-booking';

@Resolver(() => Booking)
@UseGuards(JwtAuth)
export class BookingResolver {

  constructor(private readonly _bookingService: BookingService) { }

  @Query(() => [Booking], { name: 'Bookings', nullable: 'items' })
  async currentUserBooking(@CurrentUser() currentUser: JwtUser) {
    return await this._bookingService.getCurrentUsersBooking(currentUser);
  }

  @Mutation(() => Booking, { name: 'AddBooking' })
  async addBooking(@Args('addBooking', { type: () => AddBooking }) addBooking: AddBooking, @CurrentUser() user: JwtUser) {
    return this._bookingService.addNewBooking(addBooking, user);
  }

  async cancelBooking(bookingId: string, @CurrentUser() user: JwtUser) {
    const canceledBooking = await this._bookingService.cancelBooking(bookingId, user);
    if (!canceledBooking) {
      throw new BadRequestException(`No booking found with id: ${bookingId}`);
    }

    return canceledBooking;
  }

}