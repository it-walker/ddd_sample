import { Args, Query, Resolver } from '@nestjs/graphql'

import { UserRepository } from '@modules/user/database/user.repository'
import { UserResponse } from '@modules/user/dtos/user.response.dto'
import { FindUsersQuery } from '@modules/user/queries/find-users/find-users.query'
import { FindUsersRequest } from '@modules/user/queries/find-users/find-users.request.dto'

@Resolver()
/**
 * FindUsersGraphqlResolver class
 */
export class FindUsersGraphqlResolver {
  /**
   * constructor
   * @param {UserRepository} userRepo
   */
  constructor(private readonly userRepo: UserRepository) { }

  @Query(() => [UserResponse])
  /**
   *
   */
  async findUsers(
    @Args('input') input: FindUsersRequest,
  ): Promise<UserResponse[]> {
    const query = new FindUsersQuery(input)
    const users = await this.userRepo.findUsers(query)

    return users.map((user) => new UserResponse(user))
  }
}
