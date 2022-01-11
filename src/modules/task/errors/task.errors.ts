import { ExceptionBase } from '@src/libs/exceptions';

/**
 * TaskAlreadyExistsError class
 */
export class TaskAlreadyExistsError extends ExceptionBase {
  static readonly message: 'Task already exists';

  public readonly code = 'TASK.ALREADY_EXISTS';

  /**
   * constructor
   * @param {unknown} metadata
   */
  constructor(metadata?: unknown) {
    super(TaskAlreadyExistsError.message, metadata);
  }
}
