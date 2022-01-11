import {
  DomainEvent,
  DomainEventProps,
} from '@src/libs/ddd/domain/domain-events';

/**
 * TaskCreatedDomainEvent
 */
export class TaskCreatedDomainEvent extends DomainEvent {
  /**
   * constructor
   * @param {DomainEventProps<TaskCreatedDomainEvent>} props
   */
  constructor(props: DomainEventProps<TaskCreatedDomainEvent>) {
    super(props);
    this.name = props.name;
    this.dueDate = props.dueDate;
    this.postponeCount = props.postponeCount;
  }

  readonly name: string;
  readonly dueDate: Date;
  readonly postponeCount: number;
}
