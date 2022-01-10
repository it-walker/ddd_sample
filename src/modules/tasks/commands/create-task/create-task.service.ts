import { Result } from "@badrap/result";
import { UnitOfWork } from "@src/infrastructure/database/unit-of-work/unit-of-work";
import { CommandHandlerBase } from "@src/libs/ddd/domain/base-classes/command-handler.base";
import { Command } from "@src/libs/ddd/domain/base-classes/command.base";

/**
 * CreateTaskService class
 */
export class CreateTaskService extends CommandHandlerBase {
  /**
   * constructor
   * @param {UnitOfWork} unitOfWork 
   */
  constructor(protected readonly unitOfWork: UnitOfWork){
    super(unitOfWork)
  }

  /**
   * 
   * @param {Command} command 
   * @return {Promise<Result<ID, TaskAlreadyExistsError>>}
   */
  async handle(command: Command): Promise<Result<ID, TaskAlreadyExistsError>> {
      const taskRepo: TaskRepositoryPort = this.unitOfWork.getTaskRepository(command.correlationId),
  }
  if (await taskRepo.exists(command.name)) {
    return Result.err(new TaskAlreadyExistsError())
  }

  const task = TaskEntity.create({
    name: new TaskName(command.name),
    dueDate: new TaskDueDate()
  })

  task.someBusinessLogic()

  const created = await taskRepo.save(task)
  return Result.ok(created.id)
}