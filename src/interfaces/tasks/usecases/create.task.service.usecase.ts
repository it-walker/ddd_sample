import { TaskDomain } from '@/domain/task.domain';

export interface ICreateTaskUseCase {
  create(name: string, dueDate: Date): Promise<TaskDomain>;
}
