import { Body, Controller, Get, HttpStatus } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import { Result } from '@libs/ddd/domain/utils/result.util'

import { TaskEntity } from '@modules/task/domain/entities/task.entity'
import { TaskHttpResponse } from '@modules/task/dtos/task.response.dto'
import { FindTasksQuery } from '@modules/task/queries/find-tasks/find-tasks.query'
import { FindTasksHttpRequest } from '@modules/task/queries/find-tasks/find-tasks.request.dto'

import { routesV1 } from '@configs/app.routes'

@Controller(routesV1.version)
export class FindTasksHttpController {
  /**
   * constructor
   * @param {QueryBus} queryBys
   */
  constructor(private readonly queryBys: QueryBus) { }

  @Get(routesV1.task.root)
  @ApiOperation({ summary: 'Find tasks' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TaskHttpResponse,
  })
  /**
   *
   */
  async findTasks(
    @Body() request: FindTasksHttpRequest,
  ): Promise<TaskHttpResponse[]> {
    const query = new FindTasksQuery(request)
    const result: Result<TaskEntity[]> = await this.queryBys.execute(query)

    /* Returning Response classes which are responsible
       for whitelisting data that is sent to the user */
    return result.unwrap().map((task) => {
      return new TaskHttpResponse(task)
    })
  }
}
