import { CreateTaskCommand } from '@modules/task/commands/create-task/create-task.command'
import { CreateTaskRequest } from '@modules/task/commands/create-task/create-task.request.dto'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { IdResponse } from '@src/libs/ddd/interface-adapters/dtos/id.response.dto'

@Resolver()
/**
 * CreateTaskGraphqlResolver class
 */
export class CreateTaskGraphqlResolver {
  /**
   * constructor
   * @param {CommandBus} commandBus
   */
  constructor(private readonly commandBus: CommandBus) { }

  @Mutation(() => IdResponse)
  /**
   *
   * @param {CreateTaskRequest} input
   * @return {Promise<IdResponse>}
   */
  async create(@Args('input') input: CreateTaskRequest): Promise<IdResponse> {
    const command = new CreateTaskCommand(input)

    const id = await this.commandBus.execute(command)

    return new IdResponse(id.unwrap().value)
  }
}
