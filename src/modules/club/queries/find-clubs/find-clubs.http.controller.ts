import { routesV1 } from '@configs/app.routes'
import { Result } from '@libs/ddd/domain/utils/result.util'
import { ClubEntity } from '@modules/club/domain/entities/club.entity'
import { ClubHttpResponse } from '@modules/club/dtos/club.response.dto'
import { FindClubsQuery } from '@modules/club/queries/find-clubs/find-clubs.query'
import { FindClubsHttpRequest } from '@modules/club/queries/find-clubs/find-clubs.request.dto'
import { Body, Controller, Get, HttpStatus } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller(routesV1.version)
export class FindClubsHttpController {
  /**
   * constructor
   * @param {QueryBus} queryBys
   */
  constructor(private readonly queryBys: QueryBus) { }

  @Get(routesV1.club.root)
  @ApiOperation({ summary: 'Find Clubs' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ClubHttpResponse,
  })
  /**
   *
   */
  async findClubs(
    @Body() request: FindClubsHttpRequest,
  ): Promise<ClubHttpResponse[]> {
    const query = new FindClubsQuery(request)
    const result: Result<ClubEntity[]> = await this.queryBys.execute(query)

    /* Returning Response classes which are responsible
       for whitelisting data that is sent to the club */
    return result.unwrap().map((club) => {
      return new ClubHttpResponse(club)
    })
  }
}
