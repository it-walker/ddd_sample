import { Inject } from '@nestjs/common'
import { CommandHandler } from '@nestjs/cqrs'

import { DeleteClubCommand } from '@modules/club/commands/delete-club/delete-club.command'
import { ClubRepository } from '@modules/club/database/club.repository'
import { ClubRepositoryPort } from '@modules/club/database/club.repository.port'

@CommandHandler(DeleteClubCommand)
export class DeleteClubService {
  /**
   * constructor
   * @param {ClubRepository} clubRepository
   */
  constructor(
    @Inject(ClubRepository)
    private readonly clubRepository: ClubRepositoryPort,
  ) { }

  /**
   *
   * @param {DeleteClubCommand} command
   */
  async execute(command: DeleteClubCommand): Promise<void> {
    const found = await this.clubRepository.findOneByIdOrThrow(command.clubId)
    await this.clubRepository.delete(found)
  }
}
