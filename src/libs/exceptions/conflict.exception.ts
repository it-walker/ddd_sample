import { ExceptionBase } from './exception.base';
import { ExceptionCodes } from './exception.codes';

/**
 * Conflict Exception
 */
export class ConflictException extends ExceptionBase {
  readonly code = ExceptionCodes.conflict;
}
