import { IdResponse } from '@libs/ddd/interface-adapters/dtos/id.response.dto'
import { CreateClubCommand } from '@modules/club/commands/create-club/create-club.command'
import { CreateClubMessageRequest } from '@modules/club/commands/create-club/create-club.request.dto'
import { Controller } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { MessagePattern } from '@nestjs/microservices'

@Controller()
export class CreateClubMessageController {
  /**
   * constructor
   * @param {CommandBus} commandBus
   */
  constructor(private readonly commandBus: CommandBus) { }

  @MessagePattern('club.create')
  /**
   *
   * @param {CreateClubMessageRequest} message
   * @return {Promise<IdResponse>}
   */
  async create(message: CreateClubMessageRequest): Promise<IdResponse> {
    const command = new CreateClubCommand(message)

    const id = await this.commandBus.execute(command)

    return new IdResponse(id.unwrap().value)
  }
}
