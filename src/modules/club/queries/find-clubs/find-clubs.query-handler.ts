import { QueryHandlerBase } from '@libs/ddd/domain/base-classes/query-handler.base'
import { Result } from '@libs/ddd/domain/utils/result.util'
import { ClubRepository } from '@modules/club/database/club.repository'
import { ClubEntity } from '@modules/club/domain/entities/club.entity'
import { FindClubsQuery } from '@modules/club/queries/find-clubs/find-clubs.query'
import { QueryHandler } from '@nestjs/cqrs'

@QueryHandler(FindClubsQuery)
export class FindClubsQueryHandler extends QueryHandlerBase {
  /**
   * constructor
   * @param {ClubRepository} clubRepository
   */
  constructor(private readonly clubRepository: ClubRepository) {
    super()
  }

  /**
   * @param {FindClubsQuery} query
   * @return {Promise<Result<clubEntity[]>>}
   */
  async handle(query: FindClubsQuery): Promise<Result<ClubEntity[]>> {
    const clubs = await this.clubRepository.findClubs(query)
    return Result.ok(clubs)
  }
}
