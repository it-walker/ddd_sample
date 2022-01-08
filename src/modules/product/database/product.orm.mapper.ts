import { UUID } from '@src/libs/ddd/domain/value-objects/uuid.value-object';
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@src/libs/ddd/infrastructure/database/base-classes/orm-mapper.base';
import { ProductEntity } from '@src/modules/product/domain/entities/product.entity';
import {
  ProductName,
  ProductProps,
} from '../domain/value-objects/product.name.value.object';
import { ProductOrmEntity } from './product.orm-entity';

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
    };
    return ormProps;
  }

  protected toDomainProps(
    ormEntity: ProductOrmEntity,
  ): EntityProps<ProductProps> {
    const id = new UUID(ormEntity.id);
    const props: ProductProps = {
      name: new ProductName({
        name: ormEntity.name,
      }).value,
    };
    return { id, props };
  }
}
