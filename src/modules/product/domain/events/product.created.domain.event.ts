import {
  DomainEvent,
  DomainEventProps,
} from '@src/libs/ddd/domain/domain-events';

export class ProductCreatedDomainEvent extends DomainEvent {
  constructor(props: DomainEventProps<ProductCreatedDomainEvent>) {
    super(props);
    this.name = props.name;
  }

  readonly name: string;
}
