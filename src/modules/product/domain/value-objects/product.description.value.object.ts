import {
  DomainPrimitive,
  ValueObject,
} from '@src/libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@src/libs/ddd/domain/guard';
import { ArgumentOutOfRangeException } from '@src/libs/exceptions';

/**
 * ProductDescription
 */
export class ProductDescription extends ValueObject<string> {
  /**
   * constructor
   * @param {string} value
   */
  constructor(value: string) {
    super({ value });
    this.props.value = ProductDescription.format(value);
  }

  /**
   *
   */
  get value(): string {
    return this.props.value;
  }

  /**
   *
   * @param {DomainPrimitive<string>} param0
   */
  protected validate({ value }: DomainPrimitive<string>): void {
    if (!Guard.lengthIsBetween(value, 0, 200)) {
      throw new ArgumentOutOfRangeException('description is out of range');
    }
  }

  /**
   *
   * @param {string} value
   * @return {string}
   */
  static format(value: string): string {
    return value.trim().toLowerCase();
  }
}
