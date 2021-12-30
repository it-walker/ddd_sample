import { TaskDomain } from '@/domain/task.domain';

export interface IPostponeTaskApplication {
  postpone(id: string): Promise<TaskDomain>;
}
