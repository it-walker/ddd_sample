import { ExceptionBase } from '@libs/exceptions'

export class StudentAlreadyExistsError extends ExceptionBase {
  static readonly message: 'Student already exists';

  public readonly code = 'STUDENT.ALREADY_EXISTS';

  /**
   * constructor
   * @param {unknown} metadata
   */
  constructor(metadata?: unknown) {
    super(StudentAlreadyExistsError.message, metadata)
  }
}
