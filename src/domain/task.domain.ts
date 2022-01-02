import { IsDate, IsInt, IsString } from 'class-validator';

import { TASK_POSTPONE_MAX_COUNT } from '@/common/constants';
import { TaskStatus } from '@/common/taskStatus';
import { Task } from '@/entities/task.entity';

export class TaskDomain {
  @IsString()
  name: string;

  @IsString()
  status: TaskStatus;

  @IsDate()
  dueDate: Date;

  @IsInt()
  postponeCount: number;

  static create(name: string, dueDate: Date): TaskDomain {
    return new TaskDomain(name, dueDate);
  }

  static reconstruct(task: Task): TaskDomain {
    return new TaskDomain(
      task.name,
      task.dueDate,
      task.postponeCount,
      task.status,
    );
  }

  private constructor(
    name: string,
    dueDate: Date,
    postponeCount = 0,
    status: TaskStatus = TaskStatus.Incomplete,
  ) {
    if (name === null) {
      throw new Error('必須項目が設定されていません');
    }
    this.status = status;
    this.name = name;
    this.dueDate = dueDate;
    this.postponeCount = postponeCount;
  }

  setStatus(taskStatus: TaskStatus) {
    this.status = taskStatus;
  }

  postpone() {
    if (TASK_POSTPONE_MAX_COUNT <= this.postponeCount) {
      throw new Error('最大延期回数を超過しています');
    }
    this.dueDate.setDate(this.dueDate.getDate() + 1);
    this.postponeCount++;
  }
}
