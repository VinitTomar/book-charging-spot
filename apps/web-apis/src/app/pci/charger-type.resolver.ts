import { Args, Query, Resolver } from '@nestjs/graphql';
import { ChargerTypes } from './config/charger-types';


@Resolver(() => String)
export class ChargerTypeResolver {

  @Query(() => String, { name: 'ChargerType' })
  getChargerTypeDescription(@Args('chargerType', { type: () => ChargerTypes }) chargerType: ChargerTypes) {
    return chargerType;
  }

}