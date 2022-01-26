import { Logger } from '@libs/ddd/domain/ports/logger.port'
import { CreateUserCommand } from '@modules/user/commands/create-user/create-user.command'
import { createUserCliLoggerSymbol } from '@modules/user/user.providers'
import { Inject } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Command, Console } from 'nestjs-console'

// Allows creating a user using CLI (Command Line Interface)
@Console({
  command: 'new',
  description: 'A command to create a user',
})
/**
 * CreateUserCliController class
 */
export class CreateUserCliController {
  /**
   *
   * @param {CommandBus} commandBus
   * @param {Logger} logger
   */
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(createUserCliLoggerSymbol)
    private readonly logger: Logger,
  ) { }

  @Command({
    command: 'user <email> <country> <postalCode> <street>',
    description: 'Create a user',
  })
  /**
   *
   * @param {string} email
   * @param {string} country
   * @param {string} postalCode
   * @param {string} street
   */
  async createUser(
    email: string,
    country: string,
    postalCode: string,
    street: string,
  ): Promise<void> {
    const command = new CreateUserCommand({
      email,
      country,
      postalCode,
      street,
    })

    const id = await this.commandBus.execute(command)

    this.logger.log('User created:', id.unwrap().value)
  }
}
