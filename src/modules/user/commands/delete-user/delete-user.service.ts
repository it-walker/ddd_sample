import { UserRepositoryPort } from '@modules/user/database/user.repository.port';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../database/user.repository';
import { DeleteUserCommand } from './delete-user.command';

@CommandHandler(DeleteUserCommand)
/**
 * DeleteUserService class
 */
export class DeleteUserService {
  /**
   * constructor
   * @param {UserRepository} userRepo
   */
  constructor(
    @Inject(UserRepository)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  /**
   *
   * @param {DeleteUserCommand} command
   */
  async execute(command: DeleteUserCommand): Promise<void> {
    const found = await this.userRepo.findOneByIdOrThrow(command.userId);
    await this.userRepo.delete(found);
  }
}
