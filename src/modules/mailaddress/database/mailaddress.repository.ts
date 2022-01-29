import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { MailaddressOrmEntity } from '@modules/mailaddress/database/mailaddress.orm-entity'
import { MailaddressOrmMapper } from '@modules/mailaddress/database/mailaddress.orm-mapper'
import { MailaddressRepositoryPort } from '@modules/mailaddress/database/mailaddress.repository.port'
import {
  MailaddressEntity,
  MailaddressProps,
} from '@modules/mailaddress/domain/entities/mailaddress.entity'

import { QueryParams } from '@src/libs/ddd/domain/ports/repository.ports'
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@src/libs/ddd/infrastructure/database/base-classes/typeorm.repository.base'

@Injectable()
/**
 * mailaddress repository
 */
export class MailaddressRepository
  extends TypeormRepositoryBase<
  MailaddressEntity,
  MailaddressProps,
  MailaddressOrmEntity
  >
  implements MailaddressRepositoryPort {
  protected relations: string[] = [];

  /**
   * constructor
   * @param {MailaddressOrmEntity} mailaddressRepository
   */
  constructor(
    @InjectRepository(MailaddressOrmEntity)
    private readonly mailaddressRepository: Repository<MailaddressOrmEntity>,
  ) {
    super(
      mailaddressRepository,
      new MailaddressOrmMapper(MailaddressEntity, MailaddressOrmEntity),
      new Logger('MailaddressRepository'),
    )
  }

  /**
   *
   * @param {QueryParams<MailaddressProps>} params
   * @return {WhereCondition<MailaddressOrmEntity>}
   */
  protected prepareQuery(
    params: QueryParams<MailaddressProps>,
  ): WhereCondition<MailaddressOrmEntity> {
    const where: QueryParams<MailaddressOrmEntity> = {}
    if (params.id) {
      where.id = params.id.value
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value
    }
    return where
  }
}
