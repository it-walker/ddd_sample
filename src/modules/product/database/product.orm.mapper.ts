import { UUID } from '@src/libs/ddd/domain/value-objects/uuid.value-object';
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@src/libs/ddd/infrastructure/database/base-classes/orm-mapper.base';
import { ProductEntity } from '@src/modules/product/domain/entities/product.entity';
import { ProductName } from '../domain/value-objects/product.name.value.object';
import { ProductProps } from '@src/modules/product/domain/entities/product.entity';
import { ProductOrmEntity } from './product.orm-entity';
import { description } from 'joi';
import { ProductPrice } from '../domain/value-objects/product.price.value.object';
import { ProductDescription } from '../domain/value-objects/product.description.value.object';

export class ProductOrmMapper extends OrmMapper<
  ProductEntity,
  ProductOrmEntity
> {
  protected toOrmProps(
    entity: ProductEntity,
  ): OrmEntityProps<ProductOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<ProductOrmEntity> = {
      name: props.name.value,
      description: props.description.value,
      price: props.price.value,
    };
    return ormProps;
  }

  protected toDomainProps(
    ormEntity: ProductOrmEntity,
  ): EntityProps<ProductProps> {
    const id = new UUID(ormEntity.id);
    const props: ProductProps = {
      name: new ProductName(ormEntity.name),
      description: new ProductDescription(ormEntity.description),
      price: new ProductPrice(ormEntity.price),
    };
    return { id, props };
  }
}
