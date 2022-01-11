import { UserOrmEntity } from '@modules/user/database/user.orm-entity';
import { UserRepository } from '@modules/user/database/user.repository';
import { WalletOrmEntity } from '@modules/wallet/database/wallet.orm-entity';
import { WalletRepository } from '@modules/wallet/database/wallet.repository';
import { Injectable } from '@nestjs/common';
import { TypeormUnitOfWork } from '@src/libs/ddd/infrastructure/database/base-classes/typeorm-unit-of-work';
import { MailaddressOrmEntity } from '@src/modules/mailaddress/database/mailaddress.orm-entity';
import { MailaddressRepository } from '@src/modules/mailaddress/database/mailaddress.repository';
import { ProductOrmEntity } from '@src/modules/product/database/product.orm-entity';
import { ProductRepository } from '@src/modules/product/database/product.repository';
import { TaskOrmEntity } from '@src/modules/task/database/task.orm-entity';
import { TaskRepository } from '@src/modules/task/database/task.repository';

@Injectable()
/**
 * UnitOfWork class
 */
export class UnitOfWork extends TypeormUnitOfWork {
  /**
   * get UserRepository
   * @param {string} correlationId
   * @return {UserRepository}
   */
  getUserRepository(correlationId: string): UserRepository {
    return new UserRepository(
      this.getOrmRepository(UserOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }

  /**
   * get WalletRepository
   * @param {string} correlationId
   * @return {WalletRepository}
   */
  getWalletRepository(correlationId: string): WalletRepository {
    return new WalletRepository(
      this.getOrmRepository(WalletOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }

  /**
   * get MailaddressRepository
   * @param {string} correlationId
   * @return {MailaddressRepository}
   */
  getMailaddressRepository(correlationId: string): MailaddressRepository {
    return new MailaddressRepository(
      this.getOrmRepository(MailaddressOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }

  /**
   * get ProductRepository
   * @param {string} correlationId
   * @return {ProductRepository}
   */
  getProductRepository(correlationId: string): ProductRepository {
    return new ProductRepository(
      this.getOrmRepository(ProductOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }

  /**
   * get TaskRepository
   * @param {string} correlationId
   * @return {TaskRepository}
   */
  getTaskRepository(correlationId: string): TaskRepository {
    return new TaskRepository(
      this.getOrmRepository(TaskOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }
}
