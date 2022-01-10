import { ModelBase } from '@src/libs/ddd/interface-adapters/interfaces/model.base.interface';
import { TaskStatus } from '@src/modules/tasks/domain/entities/task.type';

export interface Task extends ModelBase {
  name: string;
  dueDate: Date;
  postponeCount: number;
  status: TaskStatus;
}
