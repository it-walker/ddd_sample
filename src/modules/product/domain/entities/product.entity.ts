import { AggregateRoot } from '@src/libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@src/libs/ddd/domain/value-objects/uuid.value-object';
import { ProductCreatedDomainEvent } from '../events/product.created.domain.event';
import { ProductName } from '../value-objects/product.name.value.object';

export interface CreateProductProps {
  name: ProductName;
}

export interface ProductProps extends CreateProductProps {}

export class ProductEntity extends AggregateRoot<ProductProps> {
  protected readonly _id: UUID;

  static create(create: CreateProductProps): ProductEntity {
    const id = UUID.generate();
    const props: ProductProps = { ...create };
    const product = new ProductEntity({ id, props });

    product.addEvent(
      new ProductCreatedDomainEvent({
        aggregateId: id.value,
        name: props.name.value,
      }),
    );
    return product;
  }

  someBusinessLogic(): void {
    // TODO: add example business logic
  }

  validate(): void {
    // TODO: example
    // entity business rules validation to protect it's invariant
  }
}
