import { Result } from '@libs/ddd/domain/utils/result.util'
import { ID } from '@libs/ddd/domain/value-objects/id.value-object'
import { CreateUserCommand } from '@modules/user/commands/create-user/create-user.command'
import { UserRepositoryPort } from '@modules/user/database/user.repository.port'
import { UserEntity } from '@modules/user/domain/entities/user.entity'
import { Address } from '@modules/user/domain/value-objects/address.value-object'
import { Email } from '@modules/user/domain/value-objects/email.value-object'
import { UserAlreadyExistsError } from '@modules/user/errors/user.errors'
import { CommandHandler } from '@nestjs/cqrs'
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work'
import { CommandHandlerBase } from '@src/libs/ddd/domain/base-classes/command-handler.base'

@CommandHandler(CreateUserCommand)
/**
 * CreateUserService class
 */
export class CreateUserService extends CommandHandlerBase {
  /**
   * constructor
   * @param {UnitOfWorkModule} unitOfWork
   */
  constructor(protected readonly unitOfWork: UnitOfWork) {
    super(unitOfWork)
  }

  /**
   *
   * @param {CreateUserCommand} command
   * @return {Promise<Result<ID, UserAlreadyExistsError>>}
   */
  async handle(
    command: CreateUserCommand,
  ): Promise<Result<ID, UserAlreadyExistsError>> {
    /* Use a repository provided by UnitOfWork to include everything
       (including changes caused by Domain Events) into one
       atomic database transaction */
    const userRepo: UserRepositoryPort = this.unitOfWork.getUserRepository(
      command.correlationId,
    )
    // user uniqueness guard
    if (await userRepo.exists(command.email)) {
      /** Returning an Error instead of throwing it
       *  so a controller can handle it explicitly */
      return Result.err(new UserAlreadyExistsError())
    }

    const user = UserEntity.create({
      email: new Email(command.email),
      address: new Address({
        country: command.country,
        postalCode: command.postalCode,
        street: command.street,
      }),
    })

    user.someBusinessLogic()

    const created = await userRepo.save(user)
    return Result.ok(created.id)
  }
}
