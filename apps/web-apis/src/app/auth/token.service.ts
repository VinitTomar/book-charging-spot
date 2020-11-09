import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenPayload } from './model/jwt-token-payload';

@Injectable()
export class TokenService {

  constructor(
    private readonly _jwtSerice: JwtService
  ) { }

  async getToken(tokenPayload: JwtTokenPayload): Promise<string> {
    return await this._jwtSerice.signAsync(tokenPayload);
  }

}