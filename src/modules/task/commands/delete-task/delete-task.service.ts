import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from '@src/modules/task/database/task.repository';
import { TaskRepositoryPort } from '@src/modules/task/database/task.repository.port';

import { DeleteTaskCommand } from './delete-task.command';

@CommandHandler(DeleteTaskCommand)
/**
 * DeleteTaskService class
 */
export class DeleteTaskService {
  /**
   * constructor
   * @param {TaskRepository} taskRepo
   */
  constructor(
    @Inject(TaskRepository) private readonly taskRepo: TaskRepositoryPort,
  ) {}

  /**
   *
   * @param {DeleteTaskCommand} command
   */
  async execute(command: DeleteTaskCommand): Promise<void> {
    const found = await this.taskRepo.findOneByIdOrThrow(command.taskId);
    await this.taskRepo.delete(found);
  }
}
