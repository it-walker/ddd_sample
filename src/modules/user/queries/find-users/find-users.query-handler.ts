import { Result } from '@libs/ddd/domain/utils/result.util';
import { UserRepository } from '@modules/user/database/user.repository';
import { QueryHandler } from '@nestjs/cqrs';
import { QueryHandlerBase } from '@src/libs/ddd/domain/base-classes/query-handler.base';

import { UserEntity } from '../../domain/entities/user.entity';
import { FindUsersQuery } from './find-users.query';

@QueryHandler(FindUsersQuery)
/**
 * FindUsersQueryHandler class
 */
export class FindUsersQueryHandler extends QueryHandlerBase {
  /**
   * constructor
   * @param {UserRepository} userRepo
   */
  constructor(private readonly userRepo: UserRepository) {
    super();
  }

  /**
   * Since this is a simple query with no additional business
   * logic involved, it bypasses application's core completely
   * and retrieves users directly from a repository.
   * @param {FindUsersQuery} query
   * @return {Promise<Result<UserEntity[]>>}
   */
  async handle(query: FindUsersQuery): Promise<Result<UserEntity[]>> {
    const users = await this.userRepo.findUsers(query);
    return Result.ok(users);
  }
}
