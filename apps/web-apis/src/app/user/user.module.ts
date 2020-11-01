import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';


@Module({
  imports: [],
  providers: [
    UserService,
    UserResolver
  ]
})
export class UserModule {
}