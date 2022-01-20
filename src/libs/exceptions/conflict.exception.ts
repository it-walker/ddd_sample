import { ExceptionBase } from '@libs/exceptions/exception.base'
import { ExceptionCodes } from '@libs/exceptions/exception.codes'

/**
 * Conflict Exception
 */
export class ConflictException extends ExceptionBase {
  readonly code = ExceptionCodes.conflict;
}
