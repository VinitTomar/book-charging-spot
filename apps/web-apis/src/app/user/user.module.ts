import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { IsEmailAlreadyExistConstraint } from './validators/is-email-already-exist';


@Module({
  imports: [],
  providers: [
    UserService,
    UserResolver,
    IsEmailAlreadyExistConstraint
  ]
})
export class UserModule {
}