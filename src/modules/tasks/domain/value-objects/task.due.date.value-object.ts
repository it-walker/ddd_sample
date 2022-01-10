import {
  DomainPrimitive,
  ValueObject,
} from '@src/libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@src/libs/ddd/domain/guard';
import { ArgumentOutOfRangeException } from '@src/libs/exceptions';

/**
 * TaskDueDate class
 */
export class TaskDueDate extends ValueObject<Date> {
  /**
   * constructor
   * @param {Date} value
   */
  constructor(value: Date) {
    super({ value });
    this.props.value = value;
  }

  /**
   *
   */
  get value(): Date {
    return this.props.value;
  }

  /**
   *
   */
  protected validate({ value }: DomainPrimitive<Date>): void {}

  /**
   *
   * @param {string} name
   * @return {string}
   */
  static format(name: string): string {
    return name.trim().toLowerCase();
  }
}
