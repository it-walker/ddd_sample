import { TaskStatus } from '@src/modules/tasks/domain/entities/task.type';

export interface FindTasks {
  readonly name: string;
  readonly dueDate: Date;
  readonly status: TaskStatus;
  readonly postponeCount: number;
}
