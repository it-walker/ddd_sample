import { QueryHandlerBase } from '@libs/ddd/domain/base-classes/query-handler.base'
import { Result } from '@libs/ddd/domain/utils/result.util'
import { UserRepository } from '@modules/user/database/user.repository'
import { UserEntity } from '@modules/user/domain/entities/user.entity'
import { FindUsersQuery } from '@modules/user/queries/find-users/find-users.query'
import { QueryHandler } from '@nestjs/cqrs'

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
    super()
  }

  /**
   * Since this is a simple query with no additional business
   * logic involved, it bypasses application's core completely
   * and retrieves users directly from a repository.
   * @param {FindUsersQuery} query
   * @return {Promise<Result<UserEntity[]>>}
   */
  async handle(query: FindUsersQuery): Promise<Result<UserEntity[]>> {
    const users = await this.userRepo.findUsers(query)
    return Result.ok(users)
  }
}
