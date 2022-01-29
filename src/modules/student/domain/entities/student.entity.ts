import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base'
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object'

import { StudentName } from '@modules/student/domain/value-objects/student.name.value-object'

export interface CreateStudentProps {
  name: StudentName;
}

export interface StudentProps extends CreateStudentProps {}

export class StudentEntity extends AggregateRoot<StudentProps> {
  protected readonly _id: UUID;

  /**
   *
   * @param {CreateStudentProps} create
   * @return {StudentEntity}
   */
  static create(create: CreateStudentProps): StudentEntity {
    const id = UUID.generate()
    const props: StudentProps = { ...create }
    const student = new StudentEntity({ id, props })
    return student
  }

  // /**
  //  *
  //  * @param {UpdateStudentAddressProps} props
  //  */
  // updateStudent(props: UpdateStudentAddressProps): void {
  //   this.props.address = new Address({
  //     ...this.props.address,
  //     ...props,
  //   } as AddressProps)

  //   // Note: AddressUpdatedDomainEvent can be emitted here if needed.
  // }

  /**
   *
   */
  someBusinessLogic(): void {
    // TODO: add example business logic
  }

  /**
   *
   */
  validate(): void {
    // TODO: example
    // entity business rules validation to protect it's invariant
  }
}
