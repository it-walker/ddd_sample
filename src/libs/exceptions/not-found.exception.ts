import { ExceptionBase } from './exception.base';
import { ExceptionCodes } from './exception.codes';

/**
 * not found exception
 */
export class NotFoundException extends ExceptionBase {
  /**
   * コンストラクタ
   * @param {void} message - メッセージ
   */
  constructor(message = 'Not found') {
    super(message);
  }

  readonly code = ExceptionCodes.notFound;
}
