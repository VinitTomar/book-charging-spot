import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { environment } from '../../environments/environment';

@Injectable()
export class PasswordService {

  async generatePasswordHash(plainPassword: string): Promise<string> {
    return await hash(plainPassword, environment.bcryptHashRounds);
  }

  async matchPassword(plainPassword: string, passwordHash: string): Promise<boolean> {
    return await compare(plainPassword, passwordHash);
  }

}
