import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PciService } from '../pci.service';


@ValidatorConstraint({
  async: true
})
@Injectable()
export class IsPciNameAlreadyExistConstraint implements ValidatorConstraintInterface {

  constructor(
    private _moduleRef: ModuleRef
  ) { }

  async validate(pciName: string): Promise<boolean> {
    const pciRepository: PciService = this._moduleRef.get('PciService');
    const pci = await pciRepository.findByName(pciName);
    return !pci;
  }

  defaultMessage?(): string {
    return "Pci name $value already exists. Choose another.";
  }

}

export function IsPciNameAlreadyExist(validationOptions?: ValidationOptions) {

  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPciNameAlreadyExistConstraint,
    });
  }

}