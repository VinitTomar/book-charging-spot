import { SetMetadata } from '@nestjs/common';

export const SkipJwtAuth = (skip = true) => SetMetadata('skip-jwt-auth', skip);