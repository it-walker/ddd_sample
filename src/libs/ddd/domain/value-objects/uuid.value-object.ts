import { v4 as uuidV4, validate } from 'uuid'

import { DomainPrimitive } from '@libs/ddd/domain/base-classes/value-object.base'
import { ID } from '@libs/ddd/domain/value-objects/id.value-object'
import { ArgumentInvalidException } from '@libs/exceptions/argument-invalid.exception'

export class UUID extends ID {
  /**
   *Returns new ID instance with randomly generated ID value
   * @static
   * @return {*}  {ID}
   * @memberof ID
   */
  static generate(): UUID {
    return new UUID(uuidV4())
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!validate(value)) {
      throw new ArgumentInvalidException('Incorrect UUID format')
    }
  }
}
