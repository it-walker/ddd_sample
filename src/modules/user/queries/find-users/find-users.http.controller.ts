import { Body, Controller, Get, HttpStatus } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import { UserEntity } from '@modules/user/domain/entities/user.entity'
import { UserHttpResponse } from '@modules/user/dtos/user.response.dto'
import { FindUsersQuery } from '@modules/user/queries/find-users/find-users.query'
import { FindUsersHttpRequest } from '@modules/user/queries/find-users/find-users.request.dto'

import { routesV1 } from '@configs/app.routes'

import { Result } from '@libs/ddd/domain/utils/result.util'

@Controller(routesV1.version)
/**
 * FindUsersHttpController class
 */
export class FindUsersHttpController {
  /**
   * constructor
   * @param {QueryBus} queryBys
   */
  constructor(private readonly queryBys: QueryBus) { }

  @Get(routesV1.user.root)
  @ApiOperation({ summary: 'Find users' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserHttpResponse,
  })
  /**
   *
   */
  async findUsers(
    @Body() request: FindUsersHttpRequest,
  ): Promise<UserHttpResponse[]> {
    const query = new FindUsersQuery(request)
    const result: Result<UserEntity[]> = await this.queryBys.execute(query)

    /* Returning Response classes which are responsible
       for whitelisting data that is sent to the user */
    return result.unwrap().map((user) => {
      return new UserHttpResponse(user)
    })
  }
}
