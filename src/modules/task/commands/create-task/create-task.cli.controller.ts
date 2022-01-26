import { Inject } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Logger } from '@src/libs/ddd/domain/ports/logger.port'
import { CreateTaskCommand } from '@src/modules/task/commands/create-task/create-task.command'
import { createTaskCliLoggerSymbol } from '@src/modules/task/task.providers'
import { Command, Console } from 'nestjs-console'

@Console({
  command: 'new',
  description: 'A command to create a task',
})
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

  @Command({
    command: 'task <name> <dueDate> <postponeCount> <status>',
    description: 'Create a task',
  })
  async createTask(name: string, dueDate: Date): Promise<void> {
    const command = new CreateTaskCommand({
      name,
      dueDate,
    })

    const id = await this.commandBus.execute(command)
    this.logger.log('Task created:', id.unwrap().value)
  }
}
