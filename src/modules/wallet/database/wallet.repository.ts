import {QueryParams} from '@libs/ddd/domain/ports/repository.ports';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@libs/ddd/infrastructure/database/base-classes/typeorm.repository.base';
import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {WalletEntity, WalletProps} from '../domain/entities/wallet.entity';
import {WalletOrmEntity} from './wallet.orm-entity';
import {WalletOrmMapper} from './wallet.orm-mapper';
import {WalletRepositoryPort} from './wallet.repository.port';

@Injectable()
export class WalletRepository
  extends TypeormRepositoryBase<WalletEntity, WalletProps, WalletOrmEntity>
  implements WalletRepositoryPort {
  protected relations: string[] = [];

  constructor(
    @InjectRepository(WalletOrmEntity)
    private readonly walletRepository: Repository<WalletOrmEntity>,
  ) {
    super(
        walletRepository,
        new WalletOrmMapper(WalletEntity, WalletOrmEntity),
        new Logger('WalletRepository'),
    );
  }

  // Used to construct a query
  protected prepareQuery(
      params: QueryParams<WalletProps>,
  ): WhereCondition<WalletOrmEntity> {
    const where: QueryParams<WalletOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value;
    }
    return where;
  }
}
