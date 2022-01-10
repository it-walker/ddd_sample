import { Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Logger } from '@src/libs/ddd/domain/ports/logger.port';

/**
 * CreateTaskCliController class
 */
export class CreateTaskCliController {
  /**
   * constructor
   * @param {CommandBus} commandBus
   * @param {Logger} logger
   */
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(createTaskCliLoggerSymbol)
    private readonly logger: Logger,
  ) {}

  async createTask(
    name: string,
    dueDate: Date,
    postponeCount: number,
    status: TaskStatusType,
  ): Promise<void> {
    const command = new CreateTaskCommand({
      name,
      dueDate,
      postponeCount,
      status,
    });

    const id = await this.commandBus.execute(command);
    this.logger.log('Task created:', id.unwrap().value);
  }
}
