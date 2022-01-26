import { CommandHandlerBase } from '@libs/ddd/domain/base-classes/command-handler.base'
import { Result } from '@libs/ddd/domain/utils/result.util'
import { ID } from '@libs/ddd/domain/value-objects/id.value-object'
import { CreateClubCommand } from '@modules/club/commands/create-club/create-club.command'
import { ClubRepositoryPort } from '@modules/club/database/club.repository.port'
import { ClubEntity } from '@modules/club/domain/entities/club.entity'
import { ClubName } from '@modules/club/domain/value-objects/club.name.value-object'
import { ClubAlreadyExistsError } from '@modules/club/errors/club.errors'
import { CommandHandler } from '@nestjs/cqrs'
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work'

@CommandHandler(CreateClubCommand)
export class CreateClubService extends CommandHandlerBase {
  /**
   * constructor
   * @param {UnitOfWorkModule} unitOfWork
   */
  constructor(protected readonly unitOfWork: UnitOfWork) {
    super(unitOfWork)
  }

  /**
   *
   * @param {CreateClubCommand} command
   * @return {Promise<Result<ID, ClubAlreadyExistsError>>}
   */
  async handle(
    command: CreateClubCommand,
  ): Promise<Result<ID, ClubAlreadyExistsError>> {
    const clubRepository: ClubRepositoryPort = this.unitOfWork.getClubRepository(
      command.correlationId,
    )
    if (await clubRepository.exists(command.name)) {
      return Result.err(new ClubAlreadyExistsError())
    }

    const user = ClubEntity.create({
      name: new ClubName(command.name),
    })

    user.someBusinessLogic()

    const created = await clubRepository.save(user)
    return Result.ok(created.id)
  }
}
