import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { QueryParams } from '@libs/ddd/domain/ports/repository.ports'
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@libs/ddd/infrastructure/database/base-classes/typeorm.repository.base'
import { NotFoundException } from '@libs/exceptions'

import { UserOrmEntity } from '@modules/user/database/user.orm-entity'
import { UserOrmMapper } from '@modules/user/database/user.orm-mapper'
import { UserRepositoryPort } from '@modules/user/database/user.repository.port'
import {
  UserEntity,
  UserProps,
} from '@modules/user/domain/entities/user.entity'
import { FindUsersQuery } from '@modules/user/queries/find-users/find-users.query'

import { removeUndefinedProps } from '@src/libs/utils/remove-undefined-props.util'

@Injectable()
/**
 * UserRepository class
 */
export class UserRepository
  extends TypeormRepositoryBase<UserEntity, UserProps, UserOrmEntity>
  implements UserRepositoryPort {
  protected relations: string[] = [];

  /**
   * constructor
   * @param {UserOrmEntity} userRepository
   */
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
  ) {
    super(
      userRepository,
      new UserOrmMapper(UserEntity, UserOrmEntity),
      new Logger('UserRepository'),
    )
  }

  /**
   *
   * @param {string} id
   * @return {Promise<UserOrmEntity | undefined>}
   */
  private async findOneById(id: string): Promise<UserOrmEntity | undefined> {
    const user = await this.userRepository.findOne({
      where: { id },
    })

    return user
  }

  /**
   *
   * @param {string} id
   * @return {Promise<UserEntity>}
   */
  async findOneByIdOrThrow(id: string): Promise<UserEntity> {
    const user = await this.findOneById(id)
    if (!user) {
      throw new NotFoundException(`User with id '${id}' not found`)
    }
    return this.mapper.toDomainEntity(user)
  }

  /**
   *
   * @param {string} email
   * @return {Promise<UserOrmEntity | undefined>}
   */
  private async findOneByEmail(
    email: string,
  ): Promise<UserOrmEntity | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
    })

    return user
  }

  /**
   *
   * @param {string} email
   * @return {Promise<UserEntity>}
   */
  async findOneByEmailOrThrow(email: string): Promise<UserEntity> {
    const user = await this.findOneByEmail(email)
    if (!user) {
      throw new NotFoundException(`User with email '${email}' not found`)
    }
    return this.mapper.toDomainEntity(user)
  }

  /**
   *
   * @param {string} email
   * @return {Promise<boolean>}
   */
  async exists(email: string): Promise<boolean> {
    const found = await this.findOneByEmail(email)
    if (found) {
      return true
    }
    return false
  }

  /**
   *
   * @param {FindUsersQuery} query
   * @return {Promise<UserEntity[]>}
   */
  async findUsers(query: FindUsersQuery): Promise<UserEntity[]> {
    const where: QueryParams<UserOrmEntity> = removeUndefinedProps(query)
    const users = await this.repository.find({ where })
    return users.map((user) => this.mapper.toDomainEntity(user))
  }

  /**
   *
   * @param {QueryParams<UserProps>} params
   * @return {WhereCondition<UserOrmEntity>}
   */
  protected prepareQuery(
    params: QueryParams<UserProps>,
  ): WhereCondition<UserOrmEntity> {
    const where: QueryParams<UserOrmEntity> = {}
    if (params.id) {
      where.id = params.id.value
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value
    }
    if (params.address?.country) {
      where.country = params.address.country
    }
    if (params.address?.street) {
      where.street = params.address.street
    }
    if (params.address?.postalCode) {
      where.postalCode = params.address.postalCode
    }
    return where
  }
}
