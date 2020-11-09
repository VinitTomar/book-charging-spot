import { UnauthorizedException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PasswordService } from '../auth/password.service';
import { TokenService } from '../auth/token.service';
import { JwtToken } from './config/jwt-token-scalar-types';
import { User } from './models/user.model';
import { Login } from './payloads/login';
import { UserService } from './user.service';


@Resolver(() => String)
export class LoginResolver {

  constructor(
    private readonly _userService: UserService,
    private readonly _passwordService: PasswordService,
    private readonly _tokenService: TokenService
  ) { }

  @Query(() => JwtToken, { name: 'JwtToken' })
  async getJwtToken(@Args('login') loginDetail: Login) {
    const user: User = await this._userService.findByEmail(loginDetail.email);
    const passwordMatched = await this._passwordService.matchPassword(loginDetail.password, user.password);
    if (passwordMatched) {
      return new JwtToken(await this._tokenService.getToken({
        username: user.email,
        sub: user.id
      }));
    } else {
      throw new UnauthorizedException('Invalid login credentials.', 'Email or password is invalid.');
    }
  }

}