import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import { Result } from '@libs/ddd/domain/utils/result.util'
import { ID } from '@libs/ddd/domain/value-objects/id.value-object'
import { IdResponse } from '@libs/ddd/interface-adapters/dtos/id.response.dto'
import { ConflictException } from '@libs/exceptions'

import { CreateStudentCommand } from '@modules/student/commands/create-student/create-student.command'
import { CreateStudentHttpRequest } from '@modules/student/commands/create-student/create-student.request.dto'
import { StudentAlreadyExistsError } from '@modules/student/errors/student.errors'

import { routesV1 } from '@configs/app.routes'

@Controller(routesV1.version)
export class CreateStudentHttpController {
  /**
   * constructor
   * @param {CommandBus} commandBus
   */
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.student.root)
  @ApiOperation({ summary: 'Create a student' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: StudentAlreadyExistsError.message,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  /**
   * @param {CreateStudentHttpRequest} Body
   * @return {Promise<IdResponse>}
   */
  async create(@Body() body: CreateStudentHttpRequest): Promise<IdResponse> {
    const command = new CreateStudentCommand(body)

    const result: Result<
      ID,
      StudentAlreadyExistsError
    > = await this.commandBus.execute(command)

    return result.unwrap(
      (id) => new IdResponse(id.value), // if ok return an id
      (error) => {
        // if error decide what to do with it
        if (error instanceof StudentAlreadyExistsError) {
          throw new ConflictException(error.message)
        }
        throw error
      },
    )
  }
}
