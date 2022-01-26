import { TaskRepository } from '@modules/task/database/task.repository'
import { TaskResponse } from '@modules/task/dtos/task.response.dto'
import { FindTasksQuery } from '@modules/task/queries/find-tasks/find-tasks.query'
import { FindTasksRequest } from '@modules/task/queries/find-tasks/find-tasks.request.dto'
import { Args, Query, Resolver } from '@nestjs/graphql'

@Resolver()
/**
 * FindTasksGraphqlResolver class
 */
export class FindTasksGraphqlResolver {
  /**
   * constructor
   * @param {TaskRepository} taskRepo
   */
  constructor(private readonly taskRepo: TaskRepository) { }

  @Query(() => [TaskResponse])
  /**
   *
   */
  async findTasks(
    @Args('input') input: FindTasksRequest,
  ): Promise<TaskResponse[]> {
    const query = new FindTasksQuery(input)
    const users = await this.taskRepo.findTasks(query)

    return users.map((task) => new TaskResponse(task))
  }
}
