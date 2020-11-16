import { SetMetadata } from '@nestjs/common';
import { UserTypes } from '../user/config/user-types';


export const Role = (userRole: UserTypes) => SetMetadata('role', userRole);