import {
  DomainPrimitive,
  ValueObject,
} from '@src/libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@src/libs/ddd/domain/guard';
import { ArgumentOutOfRangeException } from '@src/libs/exceptions';

/**
 * ProductName class
 */
export class ProductName extends ValueObject<string> {
  /**
   * constructor
   * @param {string} value
   */
  constructor(value: string) {
    super({ value });
    this.props.value = ProductName.format(value);
  }

  /**
   *
   */
  get value(): string {
    return this.props.value;
  }

  /**
   *
   */
  protected validate({ value }: DomainPrimitive<string>): void {
    if (!Guard.lengthIsBetween(value, 5, 200)) {
      throw new ArgumentOutOfRangeException('name is out of range');
    }
  }

  /**
   *
   * @param {string} name
   * @return {string}
   */
  static format(name: string): string {
    return name.trim().toLowerCase();
  }
}
