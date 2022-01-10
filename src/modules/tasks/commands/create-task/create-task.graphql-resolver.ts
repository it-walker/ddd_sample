import { CommandBus } from '@nestjs/cqrs';
import { Args } from '@nestjs/graphql';
import { IdResponse } from '@src/libs/ddd/interface-adapters/dtos/id.response.dto';
import { CreateTaskCommand } from './create-task.command';

/**
 * CreateTaskGraphqlResolver class
 */
export class CreateTaskGraphqlResolver {
  /**
   * constructor
   * @param {CommandBus} commandBus
   */
  constructor(private readonly commandBus: CommandBus) {}

  /**
   *
   * @param {CreateTaskRequest} input
   * @return {Promise<IdResponse>}
   */
  async create(@Args('input') input: CreateTaskRequest): Promise<IdResponse> {
    const command = new CreateTaskCommand(input);

    const id = await this.commandBus.execute(command);

    return new IdResponse(id.unwrap().value);
  }
}
