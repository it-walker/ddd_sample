import { Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ID } from '@src/libs/ddd/domain/value-objects/id.value-object';
import { IdResponse } from '@src/libs/ddd/interface-adapters/dtos/id.response.dto';
import { CreateTaskCommand } from './create-task.command';

/**
 * CreateTaskHttpController class
 */
export class CreateTaskHttpController {
  /**
   * constructor
   * @param {CommandBus} commandBus
   */
  constructor(private readonly commandBus: CommandBus) {}

  /**
   *
   * @param {CreateTaskHttpRequest} body
   * @return {Promise<IdResponse>}
   */
  async create(@Body() body: CreateTaskHttpRequest): Promise<IdResponse> {
    const command = new CreateTaskCommand(body);

    const result: Result<ID, TaskAlreadyExistsError> =
      await this.commandBus.execute(command);
  }
}
