import { ExceptionBase } from '@src/libs/exceptions'

/**
 * UserAlreadyExistsError class
 */
export class UserAlreadyExistsError extends ExceptionBase {
  static readonly message: 'User already exists';

  public readonly code = 'USER.ALREADY_EXISTS';

  /**
   * constructor
   * @param {unknown} metadata
   */
  constructor(metadata?: unknown) {
    super(UserAlreadyExistsError.message, metadata)
  }
}
