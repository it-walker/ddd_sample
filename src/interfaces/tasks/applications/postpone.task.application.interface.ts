import {TaskDomain} from '@src/domain/task.domain';

export interface IPostponeTaskApplication {
  postpone(id: string): Promise<TaskDomain>;
}
