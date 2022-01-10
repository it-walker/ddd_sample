import { CommandBus } from '@nestjs/cqrs';
import { IdResponse } from '@src/libs/ddd/interface-adapters/dtos/id.response.dto';
import { CreateTaskCommand } from './create-task.command';

/**
 * CreateTaskMessageController class
 */
export class CreateTaskMessageController {
  /**
   * constructor
   * @param {CommandBus} commandBus
   */
  constructor(private readonly commandBus: CommandBus) {}

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
