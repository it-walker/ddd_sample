import {
  DomainPrimitive,
  ValueObject,
} from '@src/libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@src/libs/ddd/domain/guard';
import { ArgumentOutOfRangeException } from '@src/libs/exceptions';

/**
 * TaskPostponeCount class
 */
export class TaskPostponeCount extends ValueObject<number> {
  /**
   * constructor
   * @param {number} value
   */
  constructor(value: number) {
    super({ value });
    this.props.value = value;
  }

  /**
   *
   */
  get value(): number {
    return this.props.value;
  }

  /**
   *
   */
  protected validate({ value }: DomainPrimitive<number>): void {
    if (!Guard.lengthIsBetween(value, 1, 1)) {
      throw new ArgumentOutOfRangeException('postponeCount is out of range');
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
