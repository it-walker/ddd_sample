import { routesV1 } from '@config/app.routes';
import { IdResponse } from '@libs/ddd/interface-adapters/dtos/id.response.dto';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Result } from '@src/libs/ddd/domain/utils/result.util';
import { ID } from '@src/libs/ddd/domain/value-objects/id.value-object';
import { ConflictException } from '@src/libs/exceptions';

import { UserAlreadyExistsError } from '../../errors/user.errors';
import { CreateUserCommand } from './create-user.command';
import { CreateUserHttpRequest } from './create-user.request.dto';

@Controller(routesV1.version)
/**
 * CreateUserHttpController class
 */
export class CreateUserHttpController {
  /**
   * constructor
   * @param {CommandBus} commandBus
   */
  constructor(private readonly commandBus: CommandBus) {}

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
    const command = new CreateUserCommand(body);

    const result: Result<ID, UserAlreadyExistsError> =
      await this.commandBus.execute(command);

    return result.unwrap(
      (id) => new IdResponse(id.value), // if ok return an id
      (error) => {
        // if error decide what to do with it
        if (error instanceof UserAlreadyExistsError) {
          throw new ConflictException(error.message);
        }
        throw error;
      },
    );
  }
}
