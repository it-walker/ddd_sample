import { Controller } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { MessagePattern } from '@nestjs/microservices'

import { IdResponse } from '@libs/ddd/interface-adapters/dtos/id.response.dto'

import { CreateUserCommand } from '@modules/user/commands/create-user/create-user.command'
import { CreateUserMessageRequest } from '@modules/user/commands/create-user/create-user.request.dto'

@Controller()
/**
 * CreateUserMessageController
 */
export class CreateUserMessageController {
  /**
   * constructor
   * @param {CommandBus} commandBus
   */
  constructor(private readonly commandBus: CommandBus) { }

  @MessagePattern('user.create') // <- Subscribe to a microservice message
  /**
   *
   * @param {CreateUserMessageRequest} message
   * @return {Promise<IdResponse>}
   */
  async create(message: CreateUserMessageRequest): Promise<IdResponse> {
    const command = new CreateUserCommand(message)

    const id = await this.commandBus.execute(command)

    return new IdResponse(id.unwrap().value)
  }
}
