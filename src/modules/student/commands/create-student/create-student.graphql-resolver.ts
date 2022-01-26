import { IdResponse } from '@libs/ddd/interface-adapters/dtos/id.response.dto'
import { CreateStudentCommand } from '@modules/student/commands/create-student/create-student.command'
import { CreateStudentRequest } from '@modules/student/commands/create-student/create-student.request.dto'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

@Resolver()
export class CreateStudentGraphqlResolver {
  /**
   * constructor
   * @param {CommandBus} commandBus
   */
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => IdResponse)
  /**
   *
   */
  async create(
    @Args('input') input: CreateStudentRequest,
  ): Promise<IdResponse> {
    const command = new CreateStudentCommand(input)

    const id = await this.commandBus.execute(command)

    return new IdResponse(id.unwrap().value)
  }
}
