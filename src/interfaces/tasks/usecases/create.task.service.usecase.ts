import { TaskDomain } from '@src/domain/task.domain';

export interface ICreateTaskUseCase {
  create(name: string, dueDate: Date): Promise<TaskDomain>;
}
