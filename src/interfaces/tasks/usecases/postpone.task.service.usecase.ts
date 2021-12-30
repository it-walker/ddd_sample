import { TaskDomain } from '@/domain/task.domain';

export interface IPostponeTaskUseCase {
  postpone(id: string): Promise<TaskDomain>;
}
