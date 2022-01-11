import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { IdResponse } from '@src/libs/ddd/interface-adapters/dtos/id.response.dto';

import { CreateTaskCommand } from './create-task.command';
import { CreateTaskMessageRequest } from './create-task.request.dto';

@Controller()
/**
 * CreateTaskMessageController class
 */
export class CreateTaskMessageController {
  /**
   * constructor
   * @param {CommandBus} commandBus
   */
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern('task.create')
  /**
   *
   * @param {CreateTaskMessageRequest} message
   * @return {Promise<IdResponse>}
   */
  async create(message: CreateTaskMessageRequest): Promise<IdResponse> {
    const command = new CreateTaskCommand(message);

    const id = await this.commandBus.execute(command);

    return new IdResponse(id.unwrap().value);
  }
}
