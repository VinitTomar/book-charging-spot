import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';


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

    if (skipJwtAuth)
      return true;

    return super.canActivate(context);
  }

}