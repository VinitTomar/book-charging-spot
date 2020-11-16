import { UserTypes } from '../../user/config/user-types';

export interface JwtTokenPayload {
  username: string;
  sub: string;
  role: UserTypes;
}