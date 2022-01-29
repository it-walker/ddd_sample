import { Controller } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { MessagePattern } from '@nestjs/microservices'

import { IdResponse } from '@libs/ddd/interface-adapters/dtos/id.response.dto'

import { CreateStudentCommand } from '@modules/student/commands/create-student/create-student.command'
import { CreateStudentMessageRequest } from '@modules/student/commands/create-student/create-student.request.dto'

@Controller()
export class CreateStudentMessageController {
  /**
   * constructor
   * @param {CommandBus} commandBus
   */
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern('student.create') // <- Subscribe to a microservice message
  /**
   *
   * @param {CreateStudentMessageRequest} message
   * @return {Promise<IdResponse>}
   */
  async create(message: CreateStudentMessageRequest): Promise<IdResponse> {
    const command = new CreateStudentCommand(message)

    const id = await this.commandBus.execute(command)

    return new IdResponse(id.unwrap().value)
  }
}
