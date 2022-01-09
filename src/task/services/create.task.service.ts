import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { TaskDomain } from '@src/domain/task.domain';
import { Task } from '@src/entities/task.entity';
import { ICreateTaskUseCase } from '@src/interfaces/tasks/usecases/create.task.service.usecase';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class CreateTaskService implements ICreateTaskUseCase {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectConnection() private connection: Connection,
  ) {}

  /**
   * タスクを作成します
   * @param task - タスクエンティティ
   * @return 登録したタスク
   */
  async create(name: string, dueDate: Date): Promise<TaskDomain> {
    const task = TaskDomain.create(name, dueDate);
    return this.connection.transaction(async (manager) => {
      const taskRepository = manager.getRepository(Task);
      return await taskRepository.save(task);
    });
  }
}
