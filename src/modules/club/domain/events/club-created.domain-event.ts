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
    this.memberIds = props.memberIds
    // this.studentId = props.studentId;
    // this.clubId = props.clubId;
  }

  readonly name: string;
  readonly isApproval: boolean;
  readonly memberIds: string[];
  // readonly studentId: string;
  // readonly clubId: string;
}
