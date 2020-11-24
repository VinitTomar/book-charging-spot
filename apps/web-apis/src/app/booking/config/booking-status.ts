import { registerEnumType } from '@nestjs/graphql';

export enum BookingStatus {
  CONFIRM = 'confirm',
  CANCEL = 'cancel'
}

registerEnumType(BookingStatus, { name: 'BookingStatus' })