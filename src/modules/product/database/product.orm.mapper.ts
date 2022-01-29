import { ProductOrmEntity } from '@modules/product/database/product.orm-entity'
import { ProductDescription } from '@modules/product/domain/value-objects/product.description.value.object'
import { ProductName } from '@modules/product/domain/value-objects/product.name.value.object'
import { ProductPrice } from '@modules/product/domain/value-objects/product.price.value.object'

import { UUID } from '@src/libs/ddd/domain/value-objects/uuid.value-object'
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@src/libs/ddd/infrastructure/database/base-classes/orm-mapper.base'
import { ProductEntity , ProductProps } from '@src/modules/product/domain/entities/product.entity'

/**
 * ProductOrmMapper class
 */
export class ProductOrmMapper extends OrmMapper<
  ProductEntity,
  ProductOrmEntity
> {
  /**
   *
   * @param {ProductEntity} entity
   * @return {OrmEntityProps<ProductOrmEntity>}
   */
  protected toOrmProps(
    entity: ProductEntity,
  ): OrmEntityProps<ProductOrmEntity> {
    const props = entity.getPropsCopy()

    const ormProps: OrmEntityProps<ProductOrmEntity> = {
      name: props.name.value,
      description: props.description.value,
      price: props.price.value,
    }
    return ormProps
  }

  /**
   *
   * @param {ProductOrmEntity} ormEntity
   * @return {EntityProps<ProductProps>}
   */
  protected toDomainProps(
    ormEntity: ProductOrmEntity,
  ): EntityProps<ProductProps> {
    const id = new UUID(ormEntity.id)
    const props: ProductProps = {
      name: new ProductName(ormEntity.name),
      description: new ProductDescription(ormEntity.description),
      price: new ProductPrice(ormEntity.price),
    }
    return { id, props }
  }
}
