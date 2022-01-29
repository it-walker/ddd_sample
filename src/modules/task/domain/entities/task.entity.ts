import { TaskStatus, TaskStatusType } from '@modules/task/domain/entities/task.type'
import { TaskCreatedDomainEvent } from '@modules/task/domain/events/task-created.domain-event'
import { TaskDueDate } from '@modules/task/domain/value-objects/task.due.date.value-object'
import { TaskName } from '@modules/task/domain/value-objects/task.name.value-object'
import { TaskPostponeCount } from '@modules/task/domain/value-objects/task.postpone.count.value-object'

import { AggregateRoot } from '@src/libs/ddd/domain/base-classes/aggregate-root.base'
import { UUID } from '@src/libs/ddd/domain/value-objects/uuid.value-object'

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
    const id = UUID.generate()
    const props: TaskProps = {
      ...create,
      postponeCount: new TaskPostponeCount(0),
      status: TaskStatusType.Incomplete,
    }
    const task = new TaskEntity({ id, props })
    task.addEvent(
      new TaskCreatedDomainEvent({
        aggregateId: id.value,
        name: props.name.getRawProps(),
        dueDate: props.dueDate.getRawProps(),
        postponeCount: props.postponeCount.getRawProps(),
      }),
    )
    return task
  }

  /**
   *
   */
  get status(): TaskStatus {
    return this.props.status
  }

  /**
   *
   */
  complete(): void {
    this.props.status = TaskStatusType.Completed
  }

  /**
   *
   */
  someBusinessLogic(): void { }

  /**
   *
   */
  validate(): void { }
}
