import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParams } from '@src/libs/ddd/domain/ports/repository.ports';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@src/libs/ddd/infrastructure/database/base-classes/typeorm.repository.base';
import { Repository } from 'typeorm';

import {
  MailaddressEntity,
  MailaddressProps,
} from '../domain/entities/mailaddress.entity';
import { MailaddressOrmEntity } from './mailaddress.orm-entity';
import { MailaddressOrmMapper } from './mailaddress.orm-mapper';
import { MailaddressRepositoryPort } from './mailaddress.repository.port';

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
  implements MailaddressRepositoryPort
{
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
    );
  }

  /**
   *
   * @param {QueryParams<MailaddressProps>} params
   * @return {WhereCondition<MailaddressOrmEntity>}
   */
  protected prepareQuery(
    params: QueryParams<MailaddressProps>,
  ): WhereCondition<MailaddressOrmEntity> {
    const where: QueryParams<MailaddressOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value;
    }
    return where;
  }
}
