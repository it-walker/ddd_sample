import { ExceptionBase } from '@libs/exceptions/exception.base'
import { ExceptionCodes } from '@libs/exceptions/exception.codes'

/**
 * not found exception
 */
export class NotFoundException extends ExceptionBase {
  /**
   * コンストラクタ
   * @param {void} message - メッセージ
   */
  constructor(message = 'Not found') {
    super(message)
  }

  readonly code = ExceptionCodes.notFound;
}
