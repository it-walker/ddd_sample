import { Args, Query, Resolver } from '@nestjs/graphql'

import { ClubRepository } from '@modules/club/database/club.repository'
import { ClubResponse } from '@modules/club/dtos/club.response.dto'
import { FindClubsQuery } from '@modules/club/queries/find-clubs/find-clubs.query'
import { FindClubsRequest } from '@modules/club/queries/find-clubs/find-clubs.request.dto'

@Resolver()
export class FindClubsGraphqlResolver {
  /**
   * constructor
   * @param {ClubRepository} clubRepository
   */
  constructor(private readonly clubRepository: ClubRepository) { }

  @Query(() => [ClubResponse])
  async findClubs(
    @Args('input') input: FindClubsRequest,
  ): Promise<ClubResponse[]> {
    const query = new FindClubsQuery(input)
    const clubs = await this.clubRepository.findClubs(query)

    return clubs.map((club) => new ClubResponse(club))
  }
}
