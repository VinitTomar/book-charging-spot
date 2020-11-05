import { registerEnumType } from '@nestjs/graphql';


export enum VerifyEmailMessageTypes {
  INVALID_DETAILS = "Invalid detail provided.",
  EMAIL_VERIFIED = "Email verified Successfully"
}

registerEnumType(VerifyEmailMessageTypes, { name: "VerifyEmailMessageTypes" })