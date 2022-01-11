import { AggregateRoot } from '@src/libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@src/libs/ddd/domain/value-objects/uuid.value-object';

import { TaskCreatedDomainEvent } from '../events/task-created.domain-event';
import { TaskDueDate } from '../value-objects/task.due.date.value-object';
import { TaskName } from '../value-objects/task.name.value-object';
import { TaskPostponeCount } from '../value-objects/task.postpone.count.value-object';
import { TaskStatus } from './task.type';

export interface CreateTaskProps {
  name: TaskName;
  dueDate: TaskDueDate;
}

export interface TaskProps extends CreateTaskProps {
  postponeCount: TaskPostponeCount;
  status: TaskStatus;
}

/**
 * TaskEntity class
 */
export class TaskEntity extends AggregateRoot<TaskProps> {
  protected readonly _id: UUID;

  /**
   *
   * @param {CreateTaskProps} create
   * @return {TaskEntity}
   */
  static create(create: CreateTaskProps): TaskEntity {
    const id = UUID.generate();
    const props: TaskProps = {
      ...create,
      postponeCount: new TaskPostponeCount(0),
      status: TaskStatus.Incomplete,
    };
    const task = new TaskEntity({ id, props });
    task.addEvent(
      new TaskCreatedDomainEvent({
        aggregateId: id.value,
        name: props.name.getRawProps(),
        dueDate: props.dueDate.getRawProps(),
        postponeCount: props.postponeCount.getRawProps(),
      }),
    );
    return task;
  }

  /**
   *
   */
  get status(): TaskStatus {
    return this.props.status;
  }

  /**
   *
   */
  complete(): void {
    this.props.status = TaskStatus.Completed;
  }

  /**
   *
   */
  someBusinessLogic(): void {}

  /**
   *
   */
  validate(): void {}
}
