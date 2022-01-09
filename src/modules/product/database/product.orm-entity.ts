import { TypeormEntityBase } from '@src/libs/ddd/infrastructure/database/base-classes/typeorm.entity.base';
import { Column, Entity } from 'typeorm';

@Entity('product')
/**
 * ProductOrmEntity class
 */
export class ProductOrmEntity extends TypeormEntityBase {
  /**
   * constructor
   * @param {ProductOrmEntity} props
   */
  constructor(props?: ProductOrmEntity) {
    super(props);
  }

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;
}
