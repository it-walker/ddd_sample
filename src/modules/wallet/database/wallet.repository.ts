import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { QueryParams } from '@libs/ddd/domain/ports/repository.ports'
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@libs/ddd/infrastructure/database/base-classes/typeorm.repository.base'

import { WalletOrmEntity } from '@modules/wallet/database/wallet.orm-entity'
import { WalletOrmMapper } from '@modules/wallet/database/wallet.orm-mapper'
import { WalletRepositoryPort } from '@modules/wallet/database/wallet.repository.port'
import { WalletEntity, WalletProps } from '@modules/wallet/domain/entities/wallet.entity'

@Injectable()
/**
 *
 */
export class WalletRepository
  extends TypeormRepositoryBase<WalletEntity, WalletProps, WalletOrmEntity>
  implements WalletRepositoryPort {
  protected relations: string[] = [];

  /**
   * constructor
   * @param {WalletOrmEntity} walletRepository
   */
  constructor(
    @InjectRepository(WalletOrmEntity)
    private readonly walletRepository: Repository<WalletOrmEntity>,
  ) {
    super(
      walletRepository,
      new WalletOrmMapper(WalletEntity, WalletOrmEntity),
      new Logger('WalletRepository'),
    )
  }

  /**
   *
   * @param {QueryParams<WalletProps>} params
   * @return {WhereCondition<WalletOrmEntity>}
   */
  protected prepareQuery(
    params: QueryParams<WalletProps>,
  ): WhereCondition<WalletOrmEntity> {
    const where: QueryParams<WalletOrmEntity> = {}
    if (params.id) {
      where.id = params.id.value
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value
    }
    return where
  }
}
