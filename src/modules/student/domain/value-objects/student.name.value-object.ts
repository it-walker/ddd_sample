import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base'
import { Guard } from '@libs/ddd/domain/guard'
import { ArgumentOutOfRangeException } from '@libs/exceptions'

export interface StudentNameProps {
  value: string;
}

export class StudentName extends ValueObject<StudentNameProps> {
  /**
   *
   */
  get value(): string {
    return this.props.value
  }

  constructor(value: string) {
    super({ value })
    this.props.value = StudentName.format(value)
  }

  /**
   * Note: This is a very simplified example of validation,
   * real world projects will have stricter rules
   * @param {StudentNameProps} props
   */
  protected validate(props: StudentNameProps): void {
    if (!Guard.lengthIsBetween(props.value, 2, 50)) {
      throw new ArgumentOutOfRangeException('name is out of range')
    }
  }

  static format(name: string): string {
    return name.trim()
  }
}
