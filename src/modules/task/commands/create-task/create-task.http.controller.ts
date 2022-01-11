import { Result } from '@badrap/result';
import { IdResponse } from '@libs/ddd/interface-adapters/dtos/id.response.dto';
import {
  Body,
  ConflictException,
  Controller,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { routesV1 } from '@src/infrastructure/configs/app.routes';
import { ID } from '@src/libs/ddd/domain/value-objects/id.value-object';
import { TaskAlreadyExistsError } from '@src/modules/task/errors/task.errors';

import { CreateTaskCommand } from './create-task.command';
import { CreateTaskHttpRequest } from './create-task.request.dto';

@Controller(routesV1.version)
/**
 * CreateTaskHttpController class
 */
export class CreateTaskHttpController {
  /**
   * constructor
   * @param {CommandBus} commandBus
   */
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.task.root)
  @ApiOperation({ summary: 'Create a task' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: TaskAlreadyExistsError.message,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  /**
   *
   * @param {CreateTaskHttpRequest} body
   * @return {Promise<IdResponse>}
   */
  async create(@Body() body: CreateTaskHttpRequest): Promise<IdResponse> {
    const command = new CreateTaskCommand(body);

    const result: Result<ID, TaskAlreadyExistsError> =
      await this.commandBus.execute(command);

    return result.unwrap(
      (id) => new IdResponse(id.value),
      (error) => {
        if (error instanceof TaskAlreadyExistsError) {
          throw new ConflictException(error.message);
        }
        throw error;
      },
    );
  }
}
