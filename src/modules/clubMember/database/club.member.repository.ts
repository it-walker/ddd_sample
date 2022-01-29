import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { QueryParams } from '@libs/ddd/domain/ports/repository.ports'
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@libs/ddd/infrastructure/database/base-classes/typeorm.repository.base'

import { ClubMemberOrmEntity } from '@modules/clubMember/database/club.member.orm-entity'
import { ClubMemberOrmMapper } from '@modules/clubMember/database/club.member.orm-mapper'
import { ClubMemberRepositoryPort } from '@modules/clubMember/database/club.member.repository.port'
import {
  ClubMemberEntity,
  ClubMemberProps,
} from '@modules/clubMember/domain/entities/club.member.entity'

@Injectable()
export class ClubMemberRepository
  extends TypeormRepositoryBase<
    ClubMemberEntity,
    ClubMemberProps,
    ClubMemberOrmEntity
  >
  implements ClubMemberRepositoryPort {
  protected relations: string[] = [];

  /**
   * constructor
   * @param {ClubMemberOrmEntity} clubMemberRepository
   */
  constructor(
    @InjectRepository(ClubMemberOrmEntity)
    private readonly clubMemberRepository: Repository<ClubMemberOrmEntity>,
  ) {
    super(
      clubMemberRepository,
      new ClubMemberOrmMapper(ClubMemberEntity, ClubMemberOrmEntity),
      new Logger('ClubMemberRepository'),
    )
  }

  /**
   *
   * @param {QueryParams<ClubMemberProps>} params
   * @return {WhereCondition<ClubMemberOrmEntity>}
   */
  protected prepareQuery(
    params: QueryParams<ClubMemberProps>,
  ): WhereCondition<ClubMemberOrmEntity> {
    const where: QueryParams<ClubMemberOrmEntity> = {}
    if (params.id) {
      where.id = params.id.value
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value
    }
    return where
  }
}
