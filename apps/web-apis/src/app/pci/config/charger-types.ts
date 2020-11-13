import { registerEnumType } from '@nestjs/graphql';

export enum ChargerTypes {
  FAST_CCS = "Fast CCS (min 50 kW), 200-1000V",
  FAST_CHA_DE_MO = "Fast CHAdeMO (min 50 kW), 200-1000V",
  FAST_TYPE_2_AC = "Fast Type-2 AC (min 22 kW), 380-480V",
  MODERATE_BHARAT_DC = "Moderate Bharat DC-001 (min 15kW), 72-200V",
  SLOW_BHARAT_AC = "Slow Bharat AC-001 (min 10kW), 230V"
}


registerEnumType(ChargerTypes, { name: "ChargerTypes" });