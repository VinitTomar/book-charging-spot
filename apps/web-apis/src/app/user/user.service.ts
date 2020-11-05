import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { generateString, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordService } from '../auth/password.service';
import { VerifyEmailMessageTypes } from './config/verify-email-message-types';
import { User } from './models/user.model';
import { AddUser } from './payloads/add-user';
import { UpdateUser } from './payloads/update-user';
import { VerifyEmail } from './payloads/verify-email';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly _userReposity: Repository<User>,
    private readonly _mailerService: MailerService,
    private readonly _passwordService: PasswordService
  ) { }

  async findByEmail(email: string): Promise<User> {
    return await this._userReposity.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    return await this._userReposity.findOne({ id });
  }

  async findAll() {
    return await this._userReposity.find();
  }

  async addUser(addUser: AddUser): Promise<User> {
    addUser = this._userReposity.create(addUser);
    addUser.emailVerificationToken = generateString();
    addUser.password = await this._passwordService.generatePasswordHash(addUser.password);

    const newUser = await this._userReposity.save(addUser);
    this._mailerService.sendMail({
      to: newUser.email,
      from: 'noreply@vin.com',
      subject: 'Activate account',
      text: 'activation token',
      html: `<b>Welcome to dummy app.</b> <br/> 
        Email: ${addUser.email} <br/>
        Token: ${addUser.emailVerificationToken}`,
    });

    return newUser;
  }

  async updateUser(updateUser: UpdateUser): Promise<User> {
    let currentUser = await this.findById(updateUser.id);
    currentUser = Object.assign(currentUser, updateUser);
    const updatedUser = await this._userReposity.save(currentUser);
    return updatedUser;
  }

  async verifyEmail(verifyEmail: VerifyEmail): Promise<VerifyEmailMessageTypes> {
    const user = await this.findByEmail(verifyEmail.email);

    if (user.emailVerificationToken === verifyEmail.token) {
      user.emailVerified = true;
      user.emailVerificationToken = null;
      await this._userReposity.save(user);
      return VerifyEmailMessageTypes.EMAIL_VERIFIED;
    }

    return VerifyEmailMessageTypes.INVALID_DETAILS;
  }

}
