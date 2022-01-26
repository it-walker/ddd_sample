import { ExceptionBase } from '@libs/exceptions'

export class ClubAlreadyExistsError extends ExceptionBase {
  static readonly message: 'Club already exists';

  public readonly code = 'Club.ALREADY_EXISTS';

  /**
   * constructor
   * @param {unknown} metadata
   */
  constructor(metadata?: unknown) {
    super(ClubAlreadyExistsError.message, metadata)
  }
}
