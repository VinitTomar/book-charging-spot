import { registerEnumType } from '@nestjs/graphql';

export enum UserTypes {
  PCI_OWNER = "pci-owner",
  E_VEHICLE_OWNER = "e-vehicle-owner"
}

registerEnumType(UserTypes, { name: "UserTypes" })