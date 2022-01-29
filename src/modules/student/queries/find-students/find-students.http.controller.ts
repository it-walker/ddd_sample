import { Body, Controller, Get, HttpStatus } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import { Result } from '@libs/ddd/domain/utils/result.util'

import { StudentEntity } from '@modules/student/domain/entities/student.entity'
import { StudentHttpResponse } from '@modules/student/dtos/student.response.dto'
import { FindStudentsQuery } from '@modules/student/queries/find-students/find-students.query'
import { FindStudentsHttpRequest } from '@modules/student/queries/find-students/find-students.request.dto'

import { routesV1 } from '@configs/app.routes'

@Controller(routesV1.version)
export class FindStudentsHttpController {
  /**
   * constructor
   * @param {QueryBus} queryBys
   */
  constructor(private readonly queryBys: QueryBus) {}

  @Get(routesV1.student.root)
  @ApiOperation({ summary: 'Find students' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: StudentHttpResponse,
  })
  /**
   *
   */
  async findStudents(
    @Body() request: FindStudentsHttpRequest,
  ): Promise<StudentHttpResponse[]> {
    const query = new FindStudentsQuery(request)
    const result: Result<StudentEntity[]> = await this.queryBys.execute(query)

    return result.unwrap().map((student) => {
      return new StudentHttpResponse(student)
    })
  }
}
