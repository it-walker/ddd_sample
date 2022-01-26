import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import { IdResponse } from '@libs/ddd/interface-adapters/dtos/id.response.dto'

import { CreateUserCommand } from '@modules/user/commands/create-user/create-user.command'
import { CreateUserHttpRequest } from '@modules/user/commands/create-user/create-user.request.dto'
import { UserAlreadyExistsError } from '@modules/user/errors/user.errors'

import { routesV1 } from '@configs/app.routes'

import { Result } from '@libs/ddd/domain/utils/result.util'
import { ID } from '@libs/ddd/domain/value-objects/id.value-object'
import { ConflictException } from '@libs/exceptions'

@Controller(routesV1.version)
/**
 * CreateUserHttpController class
 */
export class CreateUserHttpController {
  /**
   * constructor
   * @param {CommandBus} commandBus
   */
  constructor(private readonly commandBus: CommandBus) { }

  @Post(routesV1.user.root)
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: UserAlreadyExistsError.message,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  /**
   * @param {CreateUserHttpRequest} Body
   * @return {Promise<IdResponse>}
   */
  async create(@Body() body: CreateUserHttpRequest): Promise<IdResponse> {
    const command = new CreateUserCommand(body)

    const result: Result<ID, UserAlreadyExistsError> =
      await this.commandBus.execute(command)

    return result.unwrap(
      (id) => new IdResponse(id.value), // if ok return an id
      (error) => {
        // if error decide what to do with it
        if (error instanceof UserAlreadyExistsError) {
          throw new ConflictException(error.message)
        }
        throw error
      },
    )
  }
}
