import { Command } from '@libs/ddd/domain/base-classes/command.base'
import { UnitOfWorkPort } from '@libs/ddd/domain/ports/unit-of-work.port'
import { Result } from '@libs/ddd/domain/utils/result.util'

export abstract class CommandHandlerBase<
  CommandHandlerReturnType = unknown,
  CommandHandlerError extends Error = Error
  > {
  constructor(protected readonly unitOfWork: UnitOfWorkPort) { }

  // Forces all command handlers to implement a handle method
  abstract handle(
    command: Command,
  ): Promise<Result<CommandHandlerReturnType, CommandHandlerError>>;

  /**
   * Execute a command as a UnitOfWork to include
   * everything in a single atomic database transaction
   */
  execute(
    command: Command,
  ): Promise<Result<CommandHandlerReturnType, CommandHandlerError>> {
    return this.unitOfWork.execute(command.correlationId, async () =>
      this.handle(command),
    )
  }
}
