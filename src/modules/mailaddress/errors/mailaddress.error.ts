import { ExceptionBase } from '@src/libs/exceptions';

/**
 * MailaddressNotEnoughError class
 */
export class MailaddressNotEnoughError extends ExceptionBase {
  static readonly message: 'Mailaddress is not found';

  public readonly code = 'MAILADDRESS.NOT_ENOUGH';

  /**
   * constructor
   * @param {unknown} metadata
   */
  constructor(metadata?: unknown) {
    super(MailaddressNotEnoughError.message, metadata);
  }
}
