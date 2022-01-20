import { TaskStatus } from '@src/modules/task/domain/entities/task.type'

export interface FindTasks {
  readonly name: string;
  readonly dueDate: Date;
  readonly status: TaskStatus;
  readonly postponeCount: number;
}
