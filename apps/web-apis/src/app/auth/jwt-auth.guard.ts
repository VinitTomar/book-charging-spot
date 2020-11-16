import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { UserTypes } from '../user/config/user-types';
import { JwtTokenPayload } from './model/jwt-token-payload';


@Injectable()
export class JwtAuth extends AuthGuard('jwt') {

  constructor(private _reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext) {
    const skipJwtAuth = this._reflector.get<boolean>('skip-jwt-auth', context.getHandler());

    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const jwtToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const expectedRole = this._reflector.get<UserTypes>('role', context.getHandler());

    if (expectedRole && !this.matchRole(jwtToken, expectedRole))
      return false;

    if (skipJwtAuth)
      return true;

    return super.canActivate(context);
  }


  matchRole(bearedToken: string, expectedRole: UserTypes) {
    const encodedPayload = bearedToken.split('.')[1];
    const jwtTokenPayload: JwtTokenPayload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString());

    return jwtTokenPayload.role === expectedRole;
  }

}