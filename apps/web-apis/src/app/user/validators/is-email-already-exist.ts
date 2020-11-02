import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from '../user.service';


@ValidatorConstraint({
  async: true
})
@Injectable()
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {

  constructor(
    private _moduleRef: ModuleRef
  ) { }

  async validate(email: string): Promise<boolean> {
    const userService: UserService = this._moduleRef.get('UserService');
    const userByEmail = await userService.findByEmail(email);
    return !userByEmail;
  }

  defaultMessage(): string {
    return "Email $value already exists. Choose another.";
  }

}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint,
    });
  }
}