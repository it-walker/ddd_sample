import {
  DomainPrimitive,
  ValueObject,
} from '@src/libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@src/libs/ddd/domain/guard';
import { ArgumentOutOfRangeException } from '@src/libs/exceptions';

export class ProductDescription extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.props.value = ProductDescription.format(value);
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!Guard.lengthIsBetween(value, 0, 200)) {
      throw new ArgumentOutOfRangeException('description is out of range');
    }
  }

  static format(value: string): string {
    return value.trim().toLowerCase();
  }
}
