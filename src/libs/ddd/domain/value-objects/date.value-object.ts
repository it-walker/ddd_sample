import {
  DomainPrimitive,
  ValueObject,
} from '@libs/ddd/domain/base-classes/value-object.base'
import { ArgumentInvalidException } from '@libs/exceptions'

/**
 * 日付値オブジェクトクラス
 */
export class DateVO extends ValueObject<Date> {
  /**
   * コンストラクタ
   * @param value - 日付
   */
  constructor(value: Date | string | number) {
    const date = new Date(value)
    super({ value: date })
  }

  public get value(): Date {
    return this.props.value
  }

  public static now(): DateVO {
    return new DateVO(Date.now())
  }

  protected validate({ value }: DomainPrimitive<Date>): void {
    if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
      throw new ArgumentInvalidException('Incorrect date')
    }
  }
}
