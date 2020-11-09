import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { IsEmailAlreadyExistConstraint } from './validators/is-email-already-exist';
import { AuthModule } from '../auth/auth.module';
import { LoginResolver } from './login.resolver';
import { JwtTokenScalar } from './config/jwt-token-scalar-types';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
  providers: [
    UserService,
    UserResolver,
    LoginResolver,
    IsEmailAlreadyExistConstraint,
    JwtTokenScalar
  ]
})
export class UserModule {
}