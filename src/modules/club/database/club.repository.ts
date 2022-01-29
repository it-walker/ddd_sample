import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { QueryParams } from '@libs/ddd/domain/ports/repository.ports'
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@libs/ddd/infrastructure/database/base-classes/typeorm.repository.base'
import { NotFoundException } from '@libs/exceptions'

import { ClubOrmEntity } from '@modules/club/database/club.orm-entity'
import { ClubOrmMapper } from '@modules/club/database/club.orm-mapper'
import { ClubRepositoryPort } from '@modules/club/database/club.repository.port'
import {
  ClubEntity,
  ClubProps,
} from '@modules/club/domain/entities/club.entity'
import { FindClubsQuery } from '@modules/club/queries/find-clubs/find-clubs.query'

import { removeUndefinedProps } from '@src/libs/utils/remove-undefined-props.util'

@Injectable()
export class ClubRepository
  extends TypeormRepositoryBase<ClubEntity, ClubProps, ClubOrmEntity>
  implements ClubRepositoryPort {
  protected relations: string[] = [];

  /**
   * constructor
   * @param {ClubOrmEntity} clubRepository
   */
  constructor(
    @InjectRepository(ClubOrmEntity)
    private readonly clubRepository: Repository<ClubOrmEntity>,
  ) {
    super(
      clubRepository,
      new ClubOrmMapper(ClubEntity, ClubOrmEntity),
      new Logger('ClubRepository'),
    )
  }

  /**
   *
   * @param {string} id
   * @return {Promise<ClubOrmEntity | undefined>}
   */
  private async findOneById(id: string): Promise<ClubOrmEntity | undefined> {
    const club = await this.clubRepository.findOne({
      where: { id },
    })

    return club
  }

  /**
   *
   * @param {string} id
   * @return {Promise<ClubEntity>}
   */
  async findOneByIdOrThrow(id: string): Promise<ClubEntity> {
    const club = await this.findOneById(id)
    if (!club) {
      throw new NotFoundException(`Club with id '${id}' not found`)
    }
    return this.mapper.toDomainEntity(club)
  }

  /**
   *
   * @param {string} name
   * @return {Promise<ClubOrmEntity | undefined>}
   */
  private async findOneByName(
    name: string,
  ): Promise<ClubOrmEntity | undefined> {
    const club = await this.clubRepository.findOne({
      where: { name },
    })

    return club
  }

  /**
   *
   * @param {string} name
   * @return {Promise<ClubEntity>}
   */
  async findOneByNameOrThrow(name: string): Promise<ClubEntity> {
    const club = await this.findOneByName(name)
    if (!club) {
      throw new NotFoundException(`Club name '${name}' not found`)
    }
    return this.mapper.toDomainEntity(club)
  }

  /**
   *
   * @param {string} name
   * @return {Promise<boolean>}
   */
  async exists(name: string): Promise<boolean> {
    const found = await this.findOneByName(name)
    if (found) {
      return true
    }
    return false
  }

  /**
   *
   * @param {FindClubsQuery} query
   * @return {Promise<ClubEntity[]>}
   */
  async findClubs(query: FindClubsQuery): Promise<ClubEntity[]> {
    const where: QueryParams<ClubOrmEntity> = removeUndefinedProps(query)
    const clubs = await this.repository.find({ where })
    return clubs.map((club) => this.mapper.toDomainEntity(club))
  }

  /**
   *
   * @param {QueryParams<ClubProps>} params
   * @return {WhereCondition<ClubOrmEntity>}
   */
  protected prepareQuery(
    params: QueryParams<ClubProps>,
  ): WhereCondition<ClubOrmEntity> {
    const where: QueryParams<ClubOrmEntity> = {}
    if (params.id) {
      where.id = params.id.value
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value
    }
    if (params.name) {
      where.name = params.name.value
    }
    if (params.isApproval) {
      where.isApproval = params.isApproval
    }
    return where
  }
}
