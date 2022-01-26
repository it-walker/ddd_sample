import { DomainEvent, DomainEventProps } from '@libs/ddd/domain/domain-events'

export class ClubCreatedDomainEvent extends DomainEvent {
  /**
   * constructor
   * @param {DomainEventProps<ClubCreatedDomainEvent>} props
   */
  constructor(props: DomainEventProps<ClubCreatedDomainEvent>) {
    super(props)
    this.name = props.name
    this.isApproval = props.isApproval
  }

  readonly name: string;
  readonly isApproval: boolean
}
