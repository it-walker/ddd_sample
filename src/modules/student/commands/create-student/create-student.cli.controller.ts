import { Logger } from '@libs/ddd/domain/ports/logger.port'
import { CreateStudentCommand } from '@modules/student/commands/create-student/create-student.command'
import { createStudentCliLoggerSymbol } from '@modules/student/student.providers'
import { Inject } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Command, Console } from 'nestjs-console'

@Console({
  command: 'new',
  description: 'A command to create a student',
})
export class CreateStudentCliController {
  /**
   *
   * @param {CommandBus} commandBus
   * @param {Logger} logger
   */
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(createStudentCliLoggerSymbol)
    private readonly logger: Logger,
  ) {}

  @Command({
    command: 'student <name>',
    description: 'Create a student',
  })
  /**
   *
   * @param {string} name
   */
  async createStudent(name: string): Promise<void> {
    const command = new CreateStudentCommand({
      name,
    })

    const id = await this.commandBus.execute(command)

    this.logger.log('Student created:', id.unwrap().value)
  }
}
