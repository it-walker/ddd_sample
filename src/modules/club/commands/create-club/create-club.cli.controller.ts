import { Inject } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Command, Console } from 'nestjs-console'

import { Logger } from '@libs/ddd/domain/ports/logger.port'

import { createClubCliLoggerSymbol } from '@modules/club/club.providers'
import { CreateClubCommand } from '@modules/club/commands/create-club/create-club.command'

@Console({
  command: 'new',
  description: 'A command to create a club',
})
export class CreateClubCliController {
  /**
   *
   * @param {CommandBus} commandBus
   * @param {Logger} logger
   */
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(createClubCliLoggerSymbol)
    private readonly logger: Logger,
  ) { }

  @Command({
    command: 'club <name> <status>',
    description: 'Create a club',
  })
  /**
   *
   * @param {string} name
   */
  async createClub(
    name: string,
    isApproval: boolean,
  ): Promise<void> {
    const command = new CreateClubCommand({
      name,
    })

    const id = await this.commandBus.execute(command)

    this.logger.log('Club created:', id.unwrap().value)
  }
}
