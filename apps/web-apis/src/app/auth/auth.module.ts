import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { environment } from '../../environments/environment';
import { JwtStrategy } from './jwt.strategy';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';

@Module({
  imports: [
    JwtModule.register({
      secret: environment.jwt.secret,
      signOptions: {
        expiresIn: environment.jwt.expiresIn
      }
    }),
  ],
  controllers: [],
  providers: [
    PasswordService,
    JwtStrategy,
    TokenService
  ],
  exports: [
    PasswordService,
    TokenService
  ]
})
export class AuthModule { }
