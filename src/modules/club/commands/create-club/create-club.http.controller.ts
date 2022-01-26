import { routesV1 } from '@configs/app.routes'
import { Result } from '@libs/ddd/domain/utils/result.util'
import { ID } from '@libs/ddd/domain/value-objects/id.value-object'
import { IdResponse } from '@libs/ddd/interface-adapters/dtos/id.response.dto'
import { ConflictException } from '@libs/exceptions'
import { CreateClubCommand } from '@modules/club/commands/create-club/create-club.command'
import { CreateClubHttpRequest } from '@modules/club/commands/create-club/create-club.request.dto'
import { ClubAlreadyExistsError } from '@modules/club/errors/club.errors'
import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller(routesV1.version)
export class CreateClubHttpController {
  /**
   * constructor
   * @param {CommandBus} commandBus
   */
  constructor(private readonly commandBus: CommandBus) { }

  @Post(routesV1.club.root)
  @ApiOperation({ summary: 'Create a club' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ClubAlreadyExistsError.message,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  /**
   * @param {CreateClubHttpRequest} Body
   * @return {Promise<IdResponse>}
   */
  async create(@Body() body: CreateClubHttpRequest): Promise<IdResponse> {
    const command = new CreateClubCommand(body)

    const result: Result<ID, ClubAlreadyExistsError> =
      await this.commandBus.execute(command)

    return result.unwrap(
      (id) => new IdResponse(id.value), // if ok return an id
      (error) => {
        if (error instanceof ClubAlreadyExistsError) {
          throw new ConflictException(error.message)
        }
        throw error
      },
    )
  }
}
