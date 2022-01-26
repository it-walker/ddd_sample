import {
  DomainPrimitive,
  ValueObject,
} from '@libs/ddd/domain/base-classes/value-object.base'
import { Guard } from '@libs/ddd/domain/guard'
import {
  ArgumentOutOfRangeException,
} from '@libs/exceptions'

export class ClubName extends ValueObject<string> {
  /**
   * constructor
   * @param {string} value
   */
  constructor(value: string) {
    super({ value })
    this.props.value = ClubName.format(value)
  }

  get value(): string {
    return this.props.value
  }

  /**
   *
   * @param {DomainPrimitive<string>} param0
   */
  protected validate({ value }: DomainPrimitive<string>): void {
    if (!Guard.lengthIsBetween(value, 5, 320)) {
      throw new ArgumentOutOfRangeException('ClubName')
    }
  }

  /**
   *
   * @param {string} name
   * @return {string}
   */
  static format(name: string): string {
    return name.trim().toLowerCase()
  }
}
