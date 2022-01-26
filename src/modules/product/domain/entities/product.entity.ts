import { ProductCreatedDomainEvent } from '@modules/product/domain/events/product.created.domain.event'
import { ProductDescription } from '@modules/product/domain/value-objects/product.description.value.object'
import { ProductName } from '@modules/product/domain/value-objects/product.name.value.object'
import { ProductPrice } from '@modules/product/domain/value-objects/product.price.value.object'
import { AggregateRoot } from '@src/libs/ddd/domain/base-classes/aggregate-root.base'
import { UUID } from '@src/libs/ddd/domain/value-objects/uuid.value-object'

export interface CreateProductProps {
  name: ProductName;
  description: ProductDescription;
  price: ProductPrice;
}

export type ProductProps = CreateProductProps

/**
 * ProductEntity class
 */
export class ProductEntity extends AggregateRoot<ProductProps> {
  protected readonly _id: UUID;

  /**
   *
   * @param {CreateProductProps} create
   * @return {ProductEntity}
   */
  static create(create: CreateProductProps): ProductEntity {
    const id = UUID.generate()
    const props: ProductProps = { ...create }
    const product = new ProductEntity({ id, props })

    product.addEvent(
      new ProductCreatedDomainEvent({
        aggregateId: id.value,
        name: props.name.getRawProps(),
        description: props.description.getRawProps(),
        price: props.price.getRawProps(),
      }),
    )
    return product
  }

  /**
   *
   */
  someBusinessLogic(): void {
    // TODO: add example business logic
  }

  /**
   *
   */
  validate(): void {
    // TODO: example
    // entity business rules validation to protect it's invariant
  }
}
