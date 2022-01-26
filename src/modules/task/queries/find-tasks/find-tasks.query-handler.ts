import { Result } from '@libs/ddd/domain/utils/result.util'
import { QueryHandler } from '@nestjs/cqrs'
import { QueryHandlerBase } from '@src/libs/ddd/domain/base-classes/query-handler.base'
import { TaskRepository } from '@src/modules/task/database/task.repository'
import { TaskEntity } from '@src/modules/task/domain/entities/task.entity'
import { FindTasksQuery } from '@src/modules/task/queries/find-tasks/find-tasks.query'

@QueryHandler(FindTasksQuery)
/**
 * FindTasksQueryHandler class
 */
export class FindTasksQueryHandler extends QueryHandlerBase {
  /**
   * constructor
   * @param {TaskRepository} taskRepo
   */
  constructor(private readonly taskRepo: TaskRepository) {
    super()
  }

  /**
   * Since this is a simple query with no additional business
   * logic involved, it bypasses application's core completely
   * and retrieves users directly from a repository.
   * @param {FindTasksQuery} query
   * @return {Promise<Result<TaskEntity[]>>}
   */
  async handle(query: FindTasksQuery): Promise<Result<TaskEntity[]>> {
    const tasks = await this.taskRepo.findTasks(query)
    return Result.ok(tasks)
  }
}
