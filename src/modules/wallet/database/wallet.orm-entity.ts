import { TypeormEntityBase } from '@src/libs/ddd/infrastructure/database/base-classes/typeorm.entity.base'
import { Column, Entity } from 'typeorm'

@Entity('wallet')
/**
 * WalletOrmEntity class
 */
export class WalletOrmEntity extends TypeormEntityBase {
  /**
   * constructor
   * @param {WalletOrmEntity} props
   */
  constructor(props?: WalletOrmEntity) {
    super(props)
  }

  @Column({ default: 0 })
  balance: number;

  @Column({ unique: true })
  userId: string;
}
