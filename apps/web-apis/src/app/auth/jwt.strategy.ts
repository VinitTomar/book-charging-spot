import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { environment } from '../../environments/environment';
import { JwtTokenPayload } from './model/jwt-token-payload';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/models/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectRepository(User) private readonly _userReposity: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.jwt.secret,
    });
  }

  async validate(payload: JwtTokenPayload): Promise<User> {
    const currentUser = await this._userReposity.findOne({ id: payload.sub });

    if (!currentUser) {
      throw new UnauthorizedException('Invalid jwt token or user does not exist.');
    }

    return currentUser;
  }
}