import { Result } from '@badrap/result'
import { CommandHandler } from '@nestjs/cqrs'

import { ID } from '@libs/ddd/domain/value-objects/id.value-object'

import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work'
import { CommandHandlerBase } from '@src/libs/ddd/domain/base-classes/command-handler.base'
import { CreateTaskCommand } from '@src/modules/task/commands/create-task/create-task.command'
import { TaskRepositoryPort } from '@src/modules/task/database/task.repository.port'
import { TaskEntity } from '@src/modules/task/domain/entities/task.entity'
import { TaskDueDate } from '@src/modules/task/domain/value-objects/task.due.date.value-object'
import { TaskName } from '@src/modules/task/domain/value-objects/task.name.value-object'
import { TaskAlreadyExistsError } from '@src/modules/task/errors/task.errors'

@CommandHandler(CreateTaskCommand)
/**
 * CreateTaskService class
 */
export class CreateTaskService extends CommandHandlerBase {
  /**
   * constructor
   * @param {UnitOfWork} unitOfWork
   */
  constructor(protected readonly unitOfWork: UnitOfWork) {
    super(unitOfWork)
  }

  /**
   *
   * @param {CreateTaskCommand} command
   * @return {Promise<Result<ID, TaskAlreadyExistsError>>}
   */
  async handle(
    command: CreateTaskCommand,
  ): Promise<Result<ID, TaskAlreadyExistsError>> {
    const taskRepo: TaskRepositoryPort = this.unitOfWork.getTaskRepository(
      command.correlationId,
    )

    if (await taskRepo.exists(command.name)) {
      return Result.err(new TaskAlreadyExistsError())
    }

    const task = TaskEntity.create({
      name: new TaskName(command.name),
      dueDate: new TaskDueDate(command.dueDate),
    })

    task.someBusinessLogic()

    const created = await taskRepo.save(task)
    return Result.ok(created.id)
  }
}
