import {
  DomainEvent,
  DomainEventProps,
} from '@src/libs/ddd/domain/domain-events'

/**
 * ProductCreatedDomainEvent class
 */
export class ProductCreatedDomainEvent extends DomainEvent {
  /**
   * constructor
   * @param {DomainEventProps<ProductCreatedDomainEvent>} props
   */
  constructor(props: DomainEventProps<ProductCreatedDomainEvent>) {
    super(props)
    this.name = props.name
    this.description = props.description
    this.price = props.price
  }

  readonly name: string;
  readonly description: string;
  readonly price: number;
}
