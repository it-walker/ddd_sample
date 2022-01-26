import { IdResponse } from '@libs/ddd/interface-adapters/dtos/id.response.dto'
import { CreateClubCommand } from '@modules/club/commands/create-club/create-club.command'
import { CreateClubRequest } from '@modules/club/commands/create-club/create-club.request.dto'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

@Resolver()
export class CreateClubGraphqlResolver {
  /**
   * constructor
   * @param {CommandBus} commandBus
   */
  constructor(private readonly commandBus: CommandBus) { }

  @Mutation(() => IdResponse)
  /**
   *
   */
  async create(@Args('input') input: CreateClubRequest): Promise<IdResponse> {
    const command = new CreateClubCommand(input)

    const id = await this.commandBus.execute(command)

    return new IdResponse(id.unwrap().value)
  }
}
