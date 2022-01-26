import { ModelBase } from '@libs/ddd/interface-adapters/interfaces/model.base.interface'

import { TaskStatus } from '@modules/task/domain/entities/task.type'

export interface Task extends ModelBase {
  name: string;
  dueDate: Date;
  postponeCount: number;
  status: TaskStatus;
}
